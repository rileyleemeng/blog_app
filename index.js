import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];

//post constructure
function Post(title, content){
    this.title = title;
    this.content = content;
    this.date = new Date().toLocaleString();
}

//add post
function createPost(title, content){
    var post = new Post(title, content);
    posts.push(post);
}

//delete post
function deletePost(index){
    posts.splice(index, 1);
}

//edit post
function editPost(index, title, content){
    posts[index] = new Post(title, content);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//all paths
//home
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});


//view post
app.get("/view/:id", (req, res) => {
    var index = req.params.id;
    var post = posts[index];
    res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

//delete post
app.post("/delete", (req, res) => {
    var index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});

//edit post page
app.get("/edit/:id", (req, res) => {
    var index = req.params.id;
    var post = posts[index];
    res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

//update
app.post("/update", (req, res) => {
    var title = req.body["title"];
    var content = req.body["content"];
    var index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

//create post page
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

//save post
app.post("/save", (req, res) => {
    var title = req.body["title"];
    var content = req.body["content"];
    createPost(title, content);
    res.redirect("/");
});



app.listen(port, () => {
    createPost("Project Description.", "The goal of this project is to create a Blog web application using Node.js, Express.js, and EJS. The application will allow users to create and view blog posts. Posts will not persist between sessions as no database will be used in this version of the application. Styling will be an important aspect of this project to ensure a good user experience.");
    createPost("Technical Requirements.", "Node.js & Express.js: The application will be a web server built using Node.js and Express.js. Express.js will handle routing and middleware.");
    console.log(`Successful on port ${port}.`);
});
