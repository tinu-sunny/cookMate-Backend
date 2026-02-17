const recipe = require('../Models/recipeModel')



exports.addNewRecipe=async(req,res)=>{
 const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body
 console.log('body',req.body);
 

    try{
        
        const existingRecipe = await recipe.findOne({name})
        console.log(existingRecipe);

        if(existingRecipe){
   res.status(400).json({message:"recipe with this name alerady existing"})
        }
        else{

            const newRecipe = new recipe({name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType})
            await newRecipe.save()
            res.status(200).json({message:"saved New recipe",newRecipe})
        }
     
        


    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"err in recipe add",err})
        
    }
}


exports.updateRecipe = async(req,res)=>{

    const {id}=req.params
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body

    try{
        
        const updaterecipe = await recipe.findByIdAndUpdate({_id:id},{$set:{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}},{new:true})
        res.status(200).json({message:"Recipe Updated",updaterecipe})

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"err",err})
        
    }
}


exports.deleterecipe = async(req,res)=>{

    const {id}=req.params

    try{

        const deletedata = await recipe.findByIdAndDelete({_id:id})
        res.status(200).json('recipe Deleted')

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"errr in delete data",err})
        
    }
}