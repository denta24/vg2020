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
