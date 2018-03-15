const express = require("express");
const morgan = require("morgan");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

let db;

MongoClient.connect("mongodb://127.0.0.1:27017", function(err, client) {
  if(err){
    return;
  }

  db=client.db("todolist");

  app.listen(3000);
});

const app = express();


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use("/js", express.static(path.resolve(__dirname,"public")));

app.get("/", function (req, res) {
  db.collection("todos").find().toArray(function (err, result){ 
    res.render("index", {todos: result});
  });
});

app.post("/todo", function(req, res) {
  const todo=
    {
      nome:req.body.todo,
      value:'false'
     };
    db.collection("todos").insert(todo);
  res.redirect("/");
});

app.post("/todo-change", function(req, res) {
  db.collection("todos").save(req.body);
  res.redirect("/");


});
