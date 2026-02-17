const mongoose = require('mongoose')

const downloadSchema = new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    instructions:{
        type:Array,
        required:true
    },
    cuisine:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    }
   
})

module.exports = mongoose.model('downloads',downloadSchema)