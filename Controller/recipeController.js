const recipe= require('../Models/recipeModel')


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


