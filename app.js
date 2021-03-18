const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const path = require('path')

const app = express();

const contents = [];



app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.render("home",{contents:contents});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  let currentTitle = req.body.blogTitle;
  let currentContent = req.body.blogContent;
const content={
   title:req.body.blogTitle,
   content: req.body.blogContent};

  contents.push(content);

  res.render("blog",{blogContent:currentContent, blogTitle:currentTitle});
})

app.get("/blogs/:name",function(req,res){
const postTitle = _.lowerCase(req.params.name);
contents.forEach(function(post){
    const storedTitle=_.lowerCase( post.title);
  if(postTitle===storedTitle){
    res.render("blog",{ blogContent:post.content,blogTitle:post.title});
  }
  else{
    redirect("/");
  }
});
});

app.get("/contact",function(req,res){
  res.render("contact");
})
app.get("/about",function(req,res){
  res.render("about");
});
app.listen(process.env.PORT||3000, function(){
  console.log("Server Listening At Port 3000");
});
