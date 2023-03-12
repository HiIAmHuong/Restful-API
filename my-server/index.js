const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(morgan("combined")); //create default API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Restful API");
});

let database = [
  {
    BookId: "b1",
    BookName: "Kỹ thuật lập trình cơ bản",
    Price: 70,
    Image: "c.png",
    Describe:"Cuốn sách sơ sai học về tư duy lập trình",
    Date:"25/10/2014 12:00:00Z",
    Amount:10,
    MaCD:"7",
    MaNXB:"1"
  },
  {
    BookId: "b2",
    BookName: "Kỹ thuật lập trình nâng cao",
    Price: 100,
    Image: "c++.png",
    Describe:"Học các framework phổ biến và API",
    Date:"20/5/2016 12:00:00Z",
    Amount:22,
    MaCD:"2",
    MaNXB:"3"
  },
  { BookId: "b3", 
    BookName: "Máy học cơ bản", 
    Price: 200, 
    Image: "ML.png" ,
    Describe:"Học về toán, xác xuất và thống kê",
    Date:"05/10/2010 12:00:00Z",
    Amount:120,
    MaCD:"35",
    MaNXB:"7"
},
  {
    BookId: "b4",
    BookName: "Máy học nâng cao",
    Price: 300,
    Image: "ML_ad.png",
    Describe:"Học về các mô hình học sâu, mạng neuron",
    Date:"11/2/2005 12:00:00Z",
    Amount:350,
    MaCD:"50",
    MaNXB:"98"
  },
  {
    BookId: "b5",
    BookName: "Lập trình Robot cơ bản",
    Price: 250,
    Image: "robot.png",
    Describe:"Học cách lập trình một con Robot có thể di chuyển cơ bản",
    Date:"25/10/2014 12:00:00Z",
    Amount:120,
    MaCD:"99",
    MaNXB:"192"
  }
];

app.get("/books", cors(), (req, res) => {
  res.send(database);
});
app.get("/books/:id", cors(), (req, res) => {
  id = req.params["id"];
  let p = database.find((x) => x.BookId == id);
  res.send(p);
});

// app.post("/books",cors(),(req,res)=>{
//     console.log(req.body)
//     res.send("Server received your data, Your data:"+req.body)
// })

app.post("/books", cors(), (req, res) => {
  //put json book into database
  console.log(req.body);
  database.push(req.body);
  //send message to client(send all database to client)
  res.send(database);
});

app.put("/books", cors(), (req, res) => {
  book = database.find((x) => x.BookId == req.body.BookId);
  if (book != null) {
    book.BookName = req.body.BookName;
    book.Price = req.body.Price;
    book.Image = req.body.Image;
    book.Describe = req.body.Describe;
    book.Amount = req.body.Amount;
    book.MaCD = req.body.MaCD;
    book.MaNXB = req.body.MaNXB;
  }
  res.send(database);
});

app.delete("/books/:id", cors(), (req, res) => {
  id = req.params["id"];
  database = database.filter((x) => x.BookId !== id);
  res.send(database);
});

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

// Add this line to serve our index.html page
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.post("/upload", (req, res) => {
  // Get the file that was set to our field named "image"
  const { image } = req.files;
  // If no image submitted, exit
  if (!image) return res.sendStatus(400);
  // Move the uploaded image to our upload folder
  image.mv(__dirname + "/assets/" + image.name);
  // All good
  res.sendStatus(200);
});

app.get("/image/:id",cors(),(req,res) =>
{
    id = req.params["id"]
    console.log('upload/'+id)
    res.sendFile(__dirname+'/assets/'+id)
})
app.listen(port, () => {
    console.log(`My Server listening on port ${port}`);
  });