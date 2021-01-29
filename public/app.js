// import { http } from './http.js';
const http = new HTTP;
const ui = new UI;

//Get reciped on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add recipe
document.querySelector('.add-recipe').addEventListener('click', submitRecipe);

// Listen for detailed view
document.querySelector('#recipes').addEventListener('click', getRecipe);


let recipeData ='';

let recipeList = '';
// Get recipes
function getPosts() {
    http.get('http://localhost:3001/recipes')
        .then(data => {
            ui.showRecipes(data);
            recipeList = data;
        })
        .catch(err => console.log(err));
}

//Submit recipe
function submitRecipe() {
    ui.showAddRecipe();
}

function getRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('detail-view')) {
        const id = e.target.dataset.id;
        let updatedRecipe = '';
        http.get(`http://localhost:3001/recipes/${id}`)
            .then(data => {
                recipeData = JSON.parse(JSON.stringify(data));
                updatedRecipe = JSON.parse(JSON.stringify(data));
                return http.get('http://localhost:3001/specials/');
            })
            .then( specialData => {
                updatedRecipe.ingredients.forEach(ingredient => {
                    let recipeId =  ingredient.uuid;
                    specialData.forEach(special => {
                        if(recipeId == special.ingredientId) {
                            ingredient.special = special;
                        };
                    })
                });
                ui.showRecipe(updatedRecipe, specialData);
            })
            .catch(err => {
                console.log(err);
            });
    } else if(e.target.classList.contains('edit')) {
        ui.editRecipe(recipeData);
    } else if(e.target.classList.contains('post-submit') && !e.target.dataset.id) {
        console.log('add recipe');
        console.log(recipeData);
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const servings = document.querySelector('#servings').value;
        const prepTime = document.querySelector('#prepTime').value;
        const cookTime = document.querySelector('#prepTime').value;
        console.log(recipeData);
        const data = {
            title,
            description,
            "images": {
                "medium": ''
            },
            servings,
            prepTime,
            cookTime,
            "ingredients": [],
            "directions": []
        }

        //Create Recipe
        http.post('http://localhost:3001/recipes', data)
            .then(data => {
                getPosts();
            })
            .catch(err => {
                console.log(err);
            })
        // getPosts();
        console.log(data);
    } else if(e.target.classList.contains('post-submit') && e.target.dataset.id !== '') {
        //Update recipe
        let id = e.target.dataset.id;
        let title = document.querySelector('#title').value;
        let description = document.querySelector('#description').value;
        let servings = document.querySelector('#servings').value;
        let prepTime = document.querySelector('#prepTime').value;
        let cookTime = document.querySelector('#prepTime').value;
        let ingredients = recipeData.ingredients;
        let postDate = recipeData.postDate;
        let editDate = recipeData.editDate;
        let directions = recipeData.directions;
        let images = recipeData.images;
        let uuid = id;

        const data = {
            uuid,
            title,
            description,
            images,
            servings,
            prepTime,
            cookTime,
            postDate,
            editDate,
            ingredients,
            directions
        }
        console.log(data);
        
        http.put(`http://localhost:3001/recipes/${id}`, data)
            .then(data => {
                console.log('put', data);
                getPosts();
            })
            .catch(err => console.log(err));

        console.log(data);
    }
}
