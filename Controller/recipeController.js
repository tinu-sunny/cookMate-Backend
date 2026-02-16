const recipe= require('../Models/recipeModel');
const { param } = require('../router/route');
const savedRecipes=require('../Models/savedRecipeModel')





exports.viewallRecips = async(req,res)=>{

    // console.log(req.headers.authorization);
    // console.log(req.body);
    
    

    try
    {const Allrescipes = await recipe.find()
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

