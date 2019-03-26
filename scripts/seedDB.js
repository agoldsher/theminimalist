const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  // what is the database name?
  "mongodb://localhost/reactreadinglist"
);

// wasn't sure what all the categories were so i put what i remembered
const postSeed = [
  {
    title:"bike",
    image:"https://dks.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green?wid=425",
    price:"3.99"
},
{
  title:"vacuum",
  image:"https://target.scene7.com/is/image/Target/GUEST_a8109913-a31a-4510-a730-2829d8e841c9?wid=488&hei=488&fmt=pjpeg",
  price:"10.55"
}
];

db.Post
  .remove({})
  .then(() => db.Book.collection.insertMany(postSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
