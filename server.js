const express = require("express");
const app = express();
const {pool} = require("./dbServer");

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", {user: "Sudipto Karmoker"});
});

app.listen(PORT, () => {
  console.log("server started....");
});
