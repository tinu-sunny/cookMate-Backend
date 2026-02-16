const express = require('express')
const recipeController = require('../Controller/recipeController')

const userController = require('../Controller/userController')
const jwtMiddleware = require('../middleware/jwtmiddleware')

const router = express.Router()

router.get('/view-all-recipes',jwtMiddleware,recipeController.viewallRecips)
router.get('/view-recipe/:id',jwtMiddleware,recipeController.getRecips)
router.post('/register',userController.regUser)
router.post('/login',userController.loginuser)
router.get('/related-recipes',jwtMiddleware,recipeController.relatedRecipe)
router.post('/save-recipes/:id',jwtMiddleware,recipeController.addSavedRecipe)


module.exports=router   