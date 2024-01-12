const express = require('express');
const Recepie = require('./Recepie');
const dotenv = require("dotenv");
const app = express();

dotenv.config();

require('./connexion');
app.use(express.json());

app.listen(process.env.PORT,()=>{
    console.log(`The Server is Running on process.env.PORT ${process.env.PORT}`);
})
app.post('/recepies',async(req, res)=>{
    const {recipeName,ingredients,instructions}= req.body;
    try{
        const newPost= await Recepie.create({recipeName,ingredients,instructions});
        res.json(newPost);
        console.log('recipe is submitted successfully');
    }catch (err){
        console.error('Error creating recipe',err);
    }
})

app.get('/recepies', async(req, res) =>{
    try {
        const posts = await Recepie.find()
        res.json(posts)
    } catch (error) {
        console.error("erreur getting data",error)
    }
})

app.get('/recepies/:id', async(req,res)=>{
    try{
        const recepie = await Recepie.findById(req.params.id)
        res.status(200).json(recepie)
    }catch (err){
        console.error("erreur getting data",err)
    }
})
app.get('/recepies', async(req,res)=>{
    try{
        const recepie = await Recepie.find({recipeName:req.query.recipeName})
        res.status(200).json(recepie)
    }catch (err){
        console.error("erreur getting data",err)
    }
})

app.put('/recepies/:id', async(req,res)=>{
    try{
        const recepie = await Recepie.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json(recepie)
    }catch(err){
        console.error("erreur updating data",err)
    }
})

app.delete('/recepies/:id',async(req,res)=>{
    try{
        const recepie = await Recepie.findByIdAndDelete(req.params.id)
        res.status(200).json(recepie)
    }catch (err){
        console.error("erreur deleting data",err)
    }
})
