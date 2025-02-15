const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
      let user = users.filter((val)=> {return val.username===username});
      if(user.length>0){
          return false;
      }
      else{
          return true;
      }

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
        let user = users.filter((val)=>{
           return val.username===username && val.password==password;
        });
       if(user.length>0){
    return true;
    }
    else{
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  book=books[parseInt(req.params.isbn)];
  let review = req.query.review;
  let username = req.session.authorization["username"];
  let r = book["review"];
  if(r.UserName===username){
      r.Review=review;
      return res.status(300).json({message: "Review updated"});
  }
  else{
     r.push({"UserName":username,"Review":review});
      return res.status(300).json({message: "First review added"});
  }
 
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
