const express = require('express')
const recipeController = require('../Controller/recipeController')

const userController = require('../Controller/userController')
const jwtMiddleware = require('../middleware/jwtmiddleware')
const { addNewRecipe, updateRecipe, deleterecipe } = require('../Controller/AdminController')

const router = express.Router()

router.get('/view-all-recipes',jwtMiddleware,recipeController.viewallRecips)
router.get('/view-recipe/:id',jwtMiddleware,recipeController.getRecips)
router.post('/register',userController.regUser)
router.post('/login',userController.loginuser)
router.get('/related-recipes',jwtMiddleware,recipeController.relatedRecipe)
router.post('/save-recipes/:id',jwtMiddleware,recipeController.addSavedRecipe)
router.get('/View-Saved-Collection',jwtMiddleware,recipeController.viewRecipeUser)
router.delete('/delete-saved-recipe/:id',jwtMiddleware,recipeController.deleteSavedRecipe)
router.post('/download-recipe/:id',jwtMiddleware,recipeController.downloadRecipes)
router.post('/manage-recipe/add',addNewRecipe)
router.patch('/manage-recipe/update/:id',updateRecipe)
router.delete('/delete-recipe/:id',deleterecipe)



module.exports=router   