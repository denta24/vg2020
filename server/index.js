const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
var fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

// const mongoose = require("mongoose");
// const connect = mongoose
//   .connect(config.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log("MongoDB Connected..."))
//   .catch(err => console.log(err));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/users"));
app.use("/uploads", express.static("uploads"));

//////////////////
const MongoClient = require("mongodb").MongoClient;
const uri =
  // "mongodb+srv://local:dawidrw123@cluster0-ehgqo.mongodb.net/test?retryWrites=true&w=majority";
  "mongodb+srv://local:dawidrw123@cluster0-ehgqo.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true";
/////////////////////////////////////

MongoClient.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    console.log("connected to MongoClient");

    app.get("/api/products/wybor", (req, res) => {
      const collection = db.db("VellutoGiorno").collection("WybierzPrzedmioty");

      collection
        .find({})
        .toArray()
        .then(response => {
          res.json({
            response
          });
          console.log(response);
        });
    });

    app.get("/api/product/:id?", (req, res) => {
      const collection = db.db("VellutoGiorno").collection("test");

      collection.findOne({ id: req.params.id * 1 }).then(response => {
        res.json(response);
      });
    });

    app.get("/api/categories/:mainCategory/:category", (req, res) => {
      ///////// READING CATEGORIES

      let rawcatdata = fs.readFileSync("categories.json");
      let { categories } = JSON.parse(rawcatdata);

      let mainCategory = categories.filter(
        category => category.name[1] === req.params.mainCategory
      );
      let category = mainCategory[0].titles.filter(
        item => item[1] === req.params.category
      );
      const [main] = mainCategory;
      const [item] = category;
      const itemSubCategory = item;

      ///////CREATING CATEGORIES PATH OBJEC

      console.log(req.params);

      const path = `/${main.name[1]}/${item[1]}`;
      const linkProps = {
        pathname: path,
        state: {
          pathName: { mainCat: main.name[0], category: item[0] },
          pathLink: { mainCat: `/${main.name[1]}`, category: path }
        }
      };

      ///////// READING DATA
      // let rawdata = fs.readFileSync("test.json");
      // let kobiety = JSON.parse(rawdata);

      // console.log("query:", req.query, "params:", req.params);
      // ////////////////////////////

      console.log("chce1");

      const collection = db.db("VellutoGiorno").collection("test");
      console.log("chce2");

      collection
        .find({
          $and: [
            { mainCategory: main.name[0] },
            { category: itemSubCategory[0] }
          ]
        })
        .toArray()
        .then(response => {
          res.json({
            kobiety: { items: response },
            params: req.params,
            linkProps
          });
          // db.close();
          console.log(req.params, main.name[0], itemSubCategory[0]);
        });

      ///////// FILTERS DATA - PRAMS,QUERY

      // if (Object.keys(req.query).length !== 0) {
      //   filteredWomans = kobiety.items.filter(item => {
      //     return true;
      //     // item.prize < req.query.maxprize * 20 &&
      //     // item.prize > req.query.minprize * 20 &&
      //     // item.size === req.query.sizes
      //   });
      // } else filteredWomans = kobiety.items;

      // // if (Object.keys(req.params).length !== 0) {
      // //   filteredWomans = filteredWomans.filter(item => {
      // //     return item.mainCategory === main.name[0];
      // //   });
      // // } else filteredWomans = kobiety.items;

      // // if (Object.keys(req.params).length !== 0) {
      // //   filteredWomans = filteredWomans.filter(item => {
      // //     // console.log(item.category.toLowerCase(),req.params.category);
      // //     return item.category.toLowerCase() === itemSubCategory[0].toLowerCase();
      // //   });
      // // } else filteredWomans = kobiety.items;

      // ///////// SENDING DATA
    });

    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
      app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "../client", "build", "index.html")
        );
      });
    }

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server Running at ${port}`);
    });
  }
);
