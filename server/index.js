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
      const collection = db.db("VellutoGiorno").collection("test");
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
          console.log(req.params, main.name[0], itemSubCategory[0]);
        });
    });

    app.get("/api/allOrders", (req, res) => {
      const newOrder = req.body;

      const collection = db.db("VellutoGiorno").collection("orders");
      console.log("chce");
      collection
        .find({})
        .toArray()
        .then(response => {
          const orders = { orders: response };
          res.json({
            orders
          });
          console.log(response);
        });
    });

    app.get("/api/allProducts", (req, res) => {
      const collection = db.db("VellutoGiorno").collection("test");
      console.log("chce");

      collection
        .find({})
        .toArray()
        .then(response => {
          const items = { items: response };
          res.json({
            items: items
          });
          console.log(response);
        });
    });

    app.post("/api/newOrder", (req, res) => {
      const newOrder = req.body;

      const collection = db.db("VellutoGiorno").collection("orders");
      console.log("newor", newOrder);
      collection.findOne({}, { sort: { _id: -1 }, limit: 1 }).then(res => {
        collection.insertOne(newOrder);
      });
    });

    // app.post("/api/newProduct", upload.array("images"), (req, res) => {
    //   const formData = req.body;
    //   const images = req.files;
    //   const newProduct = {
    //     id: formData.id,
    //     name: formData.name,
    //     mainCategory: formData.mainCategory,
    //     category: formData.category,
    //     subcategory: formData.subcategory,
    //     prize: formData.prize * 1,
    //     size: formData.size.split(","),
    //     color: formData.color,
    //     description: formData.description,
    //     imgSrc: []
    //   };
    //   ///////////////////DODAWANIE DO BAZY DANYCH

    //   const collection = db.db("VellutoGiorno").collection("test");
    //   collection.findOne({}, { sort: { _id: -1 }, limit: 1 }).then(res => {
    //     const lastID = res.id;
    //     newProduct.id = lastID + 1;

    //     images.forEach((image, index) => {
    //       const imgName = newProduct.id + "_" + index;
    //       const newPath = "uploads/" + imgName + ".jpg";

    //       console.log(imgName, newPath);

    //       newProduct.imgSrc = [...newProduct.imgSrc, newPath];

    //       fs.rename(image.path, newPath, function(err) {
    //         if (err) console.log("ERROR: " + err);
    //       });

    //       console.log(newProduct);
    //       // collection.insertOne(newProduct);
    //     });
    //   });

    //   res.send(`GOOD`);
    // });

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
