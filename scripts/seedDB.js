const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  // what is the database name?
  "mongodb://localhost/theminimalist"
);

// wasn't sure what all the categories were so i put what i remembered
const postSeed = [
 
{user: "mike",
title: "bike",
image: ["https://dks.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green?wid=425"],
description: "just had new tires put it",
price: "5.00",
viewCount:"6",
category: "vehicle"
},
{user: "kevin",
title: "vacuum",
image: ["https://target.scene7.com/is/image/Target/GUEST_a8109913-a31a-4510-a730-v?wid=488&hei=488&fmt=pjpeg"],
description: "works great, has great suction",
price: "3.00",
viewCount:"5",
category: "appliances"
}
];

db.Post
  .remove({})
  .then(() => db.Post.collection.insertMany(postSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
