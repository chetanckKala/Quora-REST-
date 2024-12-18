const express = require('express');
const app = express();
const port = 8080;
const path = require("path")
const data = require("./data.json")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")

// basic setup
app.listen(port, ()=>
{
    console.log("port activated on", port)
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))

// setup check
app.get("/posts", (req, res)=>
{
    // console.log(data)
    res.render("home.ejs", {data})
})

app.get("/posts/new", (req, res)=>
{
    res.render("post.ejs")
})

app.post("/posts", (req, res)=>
{
    let d1 = req.body
    d1.id = uuidv4()
    data.push(d1)
    // console.log(data)
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res)=>
{
    let {id} = req.params
    let editpost = data.find(p => p.id === id)
    res.render("edit.ejs", {editpost})
})

app.get("/posts/:id", (req, res)=>
{
    let {id} = req.params
    let viewpost = data.find(p => p.id === id)
    res.render("show.ejs", {viewpost})
})



app.patch("/posts/:id", (req, res)=>
{
    let {content} = req.body
    let {id} = req.params
    let target = data.find(p => p.id === id)
    // console.log(content)
    target.content = content
    res.redirect("/posts")
})