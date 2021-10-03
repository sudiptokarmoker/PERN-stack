const express = require("express");
const app = express();
//const { pool } = require("./dbServer");
const pool = require("./db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: "false",
    saveUninitialized: false,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", { user: "Sudipto Karmoker" });
});

app.post("/register", async (req, res) => {
  let { name, email, password, confirm_password } = req.body;
  //console.log(name, email, password, confirm_password);

  let errors = [];

  if (!name || !email || !password || !confirm_password) {
    errors.push({
      message: "please enter all fields",
    });
  }

  if (password.length < 6) {
    errors.push({
      message: "password should be at least 6 charcters",
    });
  }

  if (password !== confirm_password) {
    errors.push({
      message: "password and confirm password should match",
    });
  }
  /**
   * if error occured
   */
  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    // form validation passed here
    let hashPassword = await bcrypt.hash(password, 10);
    //console.log(hashPassword);

    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (error, results) => {
        if (error) {
          throw new Error("error occured");
        }
        console.log(results.rows.length);
        if (results.rows.length > 0) {
          errors.push({
            message: "email already exists",
          });
          res.render("register", { errors });
        } else {
            pool.query(
              `INSERT INTO users (name, email, password)
              VALUES ($1, $2, $3)
              RETURNING id, password`,
              [name, email, hashPassword],
              (err, results) => {
                if(err){
                  throw new Error(err);
                } 
                req.flash("success_msg", "You are now registerred. Please log in");
                res.redirect('/login');
              }
            )
        }
      }
    );

    /*
    pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [email],
      (err, results) => {
        if (err) {
          //throw err;
          console.log("error called");
          console.log(err);
        }
        console.log("reaches here");
        console.log(results.rows);
      });
    */
  }
});

app.listen(PORT, () => {
  console.log("server started....");
});
