const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
 
  let username = req.body.username;
  let password = req.body.password;
  if(username && password){
  if(isValid(username)){
      users.push({"username":username,"password":password});
      return res.status(300).json({message: "Registration sucessfull"});
  }
  else{
    return res.status(300).json({message: "User already exists"}); 
  }
}
else{
  return res.status(300).json({message: "Username and Password Cannot be Empty"});
}
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve(JSON.stringify(books,null,7
            ));
      },1000)
  })
  myPromise.then((data)=>{
    return res.send(data);
  })
 
 // return res.status(300).json({message: JSON.stringify(books,undefined,4)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = parseInt(req.params.isbn);
  let myPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(books[isbn]);
    },1000)
})
myPromise.then((data)=>{
    return res.status(300).json({message:data});
})
 
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
 
  let myPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let filteredBook=[];
        let book;
        let i;
        let author = req.params.author;
        for( i=1;i<=10;i++){
            book=books[parseInt(i)];
            if(book["author"]===author){
              filteredBook.push(book);
            }
      
        }
        resolve(filteredBook);
    },1000)
})
myPromise.then((data)=>{
    return res.status(300).json({message:data});
})     
 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  //Write your code here
  let myPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let filteredBook=[];
        let book;
        let i;
        let title = req.params.title;
        for( i=1;i<=10;i++){
            book=books[parseInt(i)];
            if(book["title"]===title){
              filteredBook.push(book);
            }
      
        }
        resolve(filteredBook);
    },1000)
})
myPromise.then((data)=>{
    return res.status(300).json({message:data});
})
 
 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = parseInt(req.params.isbn);
  let book=books[isbn];
  return res.status(300).json({message: book["review"]});
});

module.exports.general = public_users;
