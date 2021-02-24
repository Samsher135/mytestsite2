const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000 ;



mongoose.connect("mongodb+srv://All_users_25:test@cluster0.mjn0g.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
  .then(() => console.log("connection success...."))
  .catch((err) => console.log(err));

const app = express();


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(cookieParser());

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));

const testingSchema = new mongoose.Schema({
  name: String,
  branch: String,
  Roll_no: Number,
  versionkey: false
})

const Mydata = new mongoose.model('Mydata', testingSchema);

// const createDocument = async () => {
//   try {
//     const testingvalue1 = new Testing({
//       name: "Samsher",
//       branch: "Elex",
//       Roll_no: 25
//     })

//     const testingvalue2 = new Testing({
//       name: "Subham",
//       branch: "Elex",
//       Roll_no: 28
//     })

//     //const result = await Testing.insertMany([testingvalue1, testingvalue2])
//     console.log(result);

//   } catch (err) {
//     console.log(err);
//   }
// }

//createDocument();
// const getDocument = async () => {
//   const result = await Testing.find();
//   console.log(result);
// }


//getDocument();
app.get("/Book", async (req, res) =>  {
  try{
    const result = await Mydata.find().sort({ $natural: -1 }).limit(1);
    res.send(result);
  }catch(err){
    res.send(err);
  }
})
// const getDocument = async () => {
//   const result = await Mydata.find({ _id: "60265c07bfbec70d381ca246" })
//   .select({_id : 0, name : 1, Roll_no : 1});
//   console.log(result);
// }
// getDocument();


// app.post('/passenger', (req, res, next) => {
//   var _id = req.body._id;
//   var name = req.body.name;
//   var roll = req.body.roll;

//   const updateDocument = async () => {
//     try {
//       const result = await Testing.findByIdAndUpdate({ _id: _id }, {
//         $set: {
//           name: name,
//           Roll_no: roll
//         }
//       }, {
//         new: true,
//         useFindAndModify: false
//       });
//       console.log(result);
//     } catch (err) {
//       console.log(err);
//     }

//   }
//   updateDocument();
//   res.render('/passenger');
// });

// const updateDocument = async () => {
//   try {
//     const result = await Testing.findByIdAndUpdate({ _id: "60265c07bfbec70d381ca246" }, {
//       $set: {
//         name: "Mihir",
//         Roll_no: 27
//       }
//     }, {
//       new: true,
//       useFindAndModify: false
//     });
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }

// }

app.listen(port, () => {
  console.log(`listening to ${port}`);
})

//updateDocument("60265c07bfbec70d381ca246");