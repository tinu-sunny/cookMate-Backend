const recipe= require('../Models/recipeModel');
const { param } = require('../router/route');
const savedRecipes=require('../Models/savedRecipeModel')

const  downloadRecipes= require('../Models/downloadModel');
const { response } = require('express');



exports.viewallRecips = async(req,res)=>{

    // console.log(req.headers.authorization);
    // console.log(req.body);
    
    

    try
    {const Allrescipes = await recipe.find().sort({_id:-1})
    res.status(200).json({success:true,message:"All rescipes",Allrescipes})
} catch(err){
    console.log(err);
    res.status(500).json({success:false,message:"err in data geting",err})
    
}
}

exports.getRecips = async(req,res)=>{

    try{
        const {id}= req.params
        console.log(id);
        

        const viewRecip = await recipe.findById({_id:id})
       return res.status(200).json({message:"success",viewRecip})
    }
    catch(err){
        console.log(err);
        
    }
}




exports.relatedRecipe = async(req,res)=>{

    const {cuisine}= req.query
    console.log(req.query);
    

    try{

        const relatedRecipes = await recipe.find({cuisine})
      res.status(200).json({message:"related recipes",relatedRecipes})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"errror",err})
        
    }
}


exports.addSavedRecipe = async(req,res)=>{

    console.log("parama",req.params);

    const{id}=req.params
    const {userId}=req.payload
    console.log("body",req.body);
    const {name,image}=req.body
    try{

        const existingrecipe = await savedRecipes.findOne({ recipeId:id})
        console.log("ttt",existingrecipe);
        
        if(existingrecipe && existingrecipe.userId==userId){
            res.status(200).json(' it is already in ur collection')
        }
        else{

            const newsaverecip = new savedRecipes({recipeId:id,name,image,userId})


            await newsaverecip.save()
     res.status(200).json('saved')
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"error",err})
        
    }
    
}




exports.viewRecipeUser = async(req,res)=>{
    console.log(req.payload);
    const {userId}=req.payload

    try{
        
        const userSavedCollection = await savedRecipes.find({userId}).sort({_id:-1})
        console.log(userSavedCollection);
        res.status(200).json({message:"sved recipe",userSavedCollection})
        

    }
    catch(err){
        console.log("error in view saved recipe ",err);
        res.status(500).json({message:"err in view saved data",err})
        
    }
}


exports.deleteSavedRecipe = async(req,res)=>{

    console.log("payload",req.payload);
    console.log("params",req.params);
    const {id}=req.params

    try{

 const deletedata = await savedRecipes.findByIdAndDelete({_id:id})
 res.status(200).json({message:"item deleted",deletedata})

    }
    catch(err){
        console.log(err);
        res.status(500).json("err in delete saved recipe",err)
        
    }
}

exports.downloadRecipes=async(req,res)=>{

    console.log( 'params',req.params);
    console.log("body",req.body);
    console.log("payload",req.payload);
    const{userId}=req.payload
    const  {id}=req.params
const {name,ingredients,instructions,cuisine,image}= req.body

  const   existingRecipe =  await downloadRecipes.findOne({recipeId:id})

     if(existingRecipe){


        const downlodincrement = await downloadRecipes.findOneAndUpdate(
  { recipeId: id },     
  { $inc: { count: 1 } },   
  { new: true }            
);

        res.status(200).json({message:" downloaded",downlodincrement})
     }
     else{

        const downloadRecipe = new downloadRecipes({recipeId:id,name,ingredients,instructions,cuisine,image,userId,count:1})
        await downloadRecipe.save()
        res.status(200).json({message:"downlodaes",downloadRecipe})
     }
    
    
}