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
 {title: "bike",
image: ["https://dks.scene7.com/is/image/dkscdn/17GTXWLGNPRXXXXXXPRF_Green?wid=425"],
description: "just had new tires put it",
date: "2019-03-28T03:29:19.331+00:00",
viewCount: 0,
price: 1,
category: "Sports",
state: "AZ"},
{title: "vacuum",
image: ["https://bissellmedia.azureedge.net/-/media/site-us/images/product-images/2156a/zing_bagless_2156_bissell_canister_vacuum_cleaner_left_angle.jpg?modified=20171221165113&cdnv=4&mw=500&mh=500"],
description: "works great, has great suction",
date: "2019-03-24T03:29:19.331+00:00",
viewCount: 0,
price: 3,
category: "Household",
state: "AZ"},
{title: "circular saw",
image: ["https://shop.harborfreight.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/3/63634_I.jpg"],
description: "easy to use",
date: "2019-03-30T03:29:19.331+00:00",
viewCount: 0,
price: 2,
category: "Machinary",
state: "AZ"},
{title: "blender",
image: ["https://target.scene7.com/is/image/Target/GUEST_5fb314ab-8c46-4d52-987d-999367a72d27?wid=488&hei=488&fmt=webp"],
description: "got it for christmas, never used it",
date: "2019-03-30T03:29:19.331+00:00",
viewCount: 0,
price: 5,
category: "Appliances",
state: "AZ"},
{title: "table saw",
image: ["https://www.rockler.com/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/4/9/49024-01-1000.jpg"],
description: "easy to use",
date: "2019-03-03T03:29:19.331+00:00",
viewCount: 0,
price: 4,
category: "Machinary",
state: "AZ"},

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
