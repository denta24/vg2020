const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

var fs = require("fs");
const multer = require("multer");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// SERVER STORE IMG
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const MongoClient = require("mongodb").MongoClient;
const uri =
  // "mongodb+srv://local:dawidrw123@cluster0-ehgqo.mongodb.net/test?retryWrites=true&w=majority";
  "mongodb+srv://local:dawidrw123@cluster0-ehgqo.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true";

app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/users"));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

// Serve static assets if in production

const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("uploads"));

// var db = MongoClient.db("VellutoGiorno");

MongoClient.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    console.log("connected to MongoClient");

    app.use(cors());

    //to not get any deprecation warning or error
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({ extended: true }));
    //to get json data
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.get("/api/products/wybor", (req, res) => {
      const collection = db.db("VellutoGiorno").collection("WybierzPrzedmioty");
      console.log("wyyyy");
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

    app.get("/api/allOrders", (req, res) => {
      const newOrder = req.body;
      const rawdata = fs.readFileSync("orders.json");
      const orders = JSON.parse(rawdata);
      console.log(orders);
      // const lastIndex = orders.length - 1;
      // const lastID = orders[lastIndex].id * 1;
      // console.log(newProduct.id);
      // newOrder.id = lastID + 1;

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

    app.post("/api/newOrder", (req, res) => {
      const newOrder = req.body;

      const collection = db.db("VellutoGiorno").collection("orders");
      console.log("newor", newOrder);
      collection.findOne({}, { sort: { _id: -1 }, limit: 1 }).then(res => {
        // const lastID = res.id;
        // newOrder.id = lastID + 1;
        collection.insertOne(newOrder);
      });

      // const rawdata = fs.readFileSync("orders.json");
      // const orders = JSON.parse(rawdata);
      // const lastIndex = orders.length - 1;
      // const lastID = orders[lastIndex].id * 1;
      // console.log(newProduct.id);
      // newOrder.id = lastID + 1;

      // orders.orders.push(newOrder);
      // const data = JSON.stringify(orders);
      // fs.writeFile("orders.json", data, err => {
      //   if (err) throw err;
      //   console.log("The file has been saved!");
      // });
      // res.send(`I received your POST request. This is what you sent me: `);
    });

    app.get("/api/allProducts", (req, res) => {
      const newProduct = req.body;
      const rawdata = fs.readFileSync("test.json");
      const test = JSON.parse(rawdata);

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

      // res.json({
      //   items: test
      // });
    });

    app.post("/api/world", (req, res) => {
      console.log(req.body);
      res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`
      );
    });

    app.post("/api/newProduct", upload.array("images"), (req, res) => {
      const formData = req.body;
      const images = req.files;
      const newProduct = {
        id: formData.id,
        name: formData.name,
        mainCategory: formData.mainCategory,
        category: formData.category,
        subcategory: formData.subcategory,
        prize: formData.prize * 1,
        size: formData.size.split(","),
        color: formData.color,
        description: formData.description,
        imgSrc: []
      };
      ///////////////////DODAWANIE DO BAZY DANYCH

      const collection = db.db("VellutoGiorno").collection("test");
      collection.findOne({}, { sort: { _id: -1 }, limit: 1 }).then(res => {
        const lastID = res.id;
        newProduct.id = lastID + 1;

        images.forEach((image, index) => {
          const imgName = newProduct.id + "_" + index;
          const newPath = "uploads/" + imgName + ".jpg";

          console.log(imgName, newPath);

          newProduct.imgSrc = [
            ...newProduct.imgSrc,
            `http://localhost:5000/${imgName}.jpg`
          ];

          fs.rename(image.path, newPath, function(err) {
            if (err) console.log("ERROR: " + err);
          });

          console.log(newProduct);
          collection.insertOne(newProduct);
          console.log("dodaaaanoo");
        });
      });

      // const imgSrc = req.body.imgSrc;
      // delete newProduct.imgSrc;

      // const rawdataPictures = fs.readFileSync("pictures.json");
      // const pictures = JSON.parse(rawdataPictures);
      // console.log(pictures);

      // test.items.push(newProduct);
      // pictures.pictures.push({ id: newProduct.id, imgSrc });
      // const picturesArray = JSON.stringify(pictures);
      // fs.writeFile("pictures.json", picturesArray, err => {
      //   if (err) throw err;
      //   console.log("The file has been saved!");
      // });

      // const data = JSON.stringify(test);
      // fs.writeFile("test.json", data, err => {
      //   if (err) throw err;
      //   console.log("The file has been saved!");
      // });
      res.send(`GOOD`);
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
      // Serve any static files
      app.use(express.static(path.join(__dirname, "client/build")));

      // Handle React routing, return all requests to React app
      app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
      });
    }

    app.listen(port, () => {
      console.log(`Server Running at ${port}`);
    });
  }
);
