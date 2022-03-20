const express = require("express");
const mongoose = require("mongoose");
const MovieModel = require("./schema/movie.schema")
let PORT = 8002;

let app = express();
app.use(express.json());

let DB_URL = "mongodb://127.0.0.1:27017/test";

    mongoose.connect(DB_URL);
    var db = mongoose.connection
    
    app.get("/movies", async(req,res) => {
        let users = await MovieModel.find({});
        console.log("movies", users);
        res.status(200).json(users)
    })
   
   app.post('/movies',async (req, res) => {
       console.log(req.body);
       let movie = await MovieModel.create(req.body)
        res.status(200).json(movie)
   })

   app.get("/movies/:id", async(req, res) => {
        let movie = await MovieModel.findById(req.params.id);
        res.status(200).json(movie)
   })

   app.patch("/movies/:id", async(req, res) => {
      let movie = await MovieModel.findByIdAndUpdate(
           req.params.id,
           req.body,
           {new:true}
       );
       res.status(200).json(movie)
   })

   app.delete("/movies/:id", async(req, res) => {
       let movie =  await MovieModel.findByIdAndDelete(req.params.id)
       res.status(200).json(movie)

   })
app.listen(PORT, () => {
    console.log("starting server at", PORT);
})