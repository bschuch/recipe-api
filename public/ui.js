class UI {
    constructor() {
        this.recipesDiv = document.querySelector('#recipes');
    }


    showRecipes(recipes) {
        let output = '';

        recipes.forEach(recipe => {
            output += `
            <div class="col-md-6">
             <div class="card mb-3">
             <img class="card-img-top" src="${recipe.images.medium}" alt="${recipe.title}">
                <div class="card-body">
                    <h4 class="card-title">${recipe.title}</h4>
                    <h6 class="card-subtitle text-muted">${recipe.description}</h6>
                    <p class="card-text mt-3">Ingredients</p>
                    <ul class="list-group list-group-flush mt-2">${recipe.ingredients.map(ingredient => {
                        return `<li class="list-group-item pl-0">${ingredient.name}</li>`;
                        }).join('')}
                    </ul>
                    <button class="mt-2 detail-view btn btn-outline-dark btn-block" data-id="${recipe.uuid}">Details</button>
                </div>
            </div>
            </div>  
            `;
        });
        this.recipesDiv.innerHTML = output;
    }



    editRecipe(recipe) {
        this.recipesDiv.innerHTML = '';
        let output = '';
        console.log(recipe.uuid);

        output += `
        <div class="card card-body card-form">
            <h1>Edit Recipe</h1>
            <div class="form-group mb-3">
                <label for="title">Recipe Title</label>
                <input type="text" id="title" class="form-control" placeholder="Recipe Title" value="${recipe.title}">
            </div>
            <div class="form-group mb-3">
                <input type="text" id="description" class="form-control" placeholder="Description" value="${recipe.description}">
            </div>
            <div class="form-group mb-3">
                <input type="number" id="servings" class="form-control" placeholder="Description" value="${recipe.servings}">
            </div>
            <div class="form-group mb-3">
                <input type="number" id="prepTime" class="form-control" placeholder="Description" value="${recipe.prepTime}">
            </div>
            <div class="form-group mb-3">
                <input type="number" id="cookTime" class="form-control" placeholder="Description" value="${recipe.cookTime}">
            </div>
            <ul class="list-group">${recipe.ingredients.map(ingredient => {
                return `<li class"list-group-item">${ingredient.name}</li>
                        ${ingredient.special ? `
                        <ul class="list-group">
                            <li class="list-group-item">${ingredient.special.type}</li>
                            <li class="list-group-item">${ingredient.special.title}</li>
                            <li class="list-group-item">${ingredient.special.text}</li>
                        </ul>
                        `
                        : ''}`
                }).join('')}
            </ul>
            <ul>${recipe.directions.map(direction => {
                return `<li>${direction.instructions}</li>`;
                }).join('')}
            </ul>
            <input type="hidden" id="id" value="">
            <button class="post-submit btn btn-dark" data-id="${recipe.uuid}" btn-block">Update Recipe</button>
            <span class="form-end"></span>
        </div>
        `;

        this.recipesDiv.innerHTML = output;
    }


    showAddRecipe() {
        this.recipesDiv.innerHTML = '';
        let output = '';

        output += `
        <div class="card card-body card-form box-shadow">
            <h1>Add Recipe</h1>
            <div class="form-group mb-3">
                <input type="text" id="title" class="form-control" placeholder="Recipe Title">
            </div>
            <div class="form-group mb-3">
                <input type="text" id="description" class="form-control" placeholder="Description">
            </div>
            <div class="form-group mb-3">
                <input type="number" id="servings" class="form-control" placeholder="Servings">
            </div>
            <div class="form-group mb-3">
                <input type="number" id="prepTime" class="form-control" placeholder="PrepTime">
            </div>
            <div class="form-group mb-3">
                <input type="number" id="cookTime" class="form-control" placeholder="CookTime">
            </div>
            <input type="hidden" id="id" value="">
            <button class="post-submit btn btn-dark btn-block">Add Recipe</button>
            <span class="form-end"></span>
        </div>
        `;

        this.recipesDiv.innerHTML = output;
 
    }

    showRecipe(recipe,special) {
        let output = '';
        console.log("recipe",recipe);
        console.log("special", special);

        this.recipesDiv.innerHTML = '';

        output += `
            <div class="col-md-12">
            <div class="card mb-3 box-shadow">
            <img class="card-img-top" src="${recipe.images.medium}" alt="${recipe.title}">
                <div class="card-body p-5">
                    <h4 class="card-title title">${recipe.title}</h4>
                    <p class="card-text description">${recipe.description}</p>
                    <p class="card-text servings">Servings ${recipe.servings}</p>
                    <p class="card-text preptime">Preptime ${recipe.prepTime}</p>
                    <h4>Ingredients</h4>
                    <ul class="list-group">${recipe.ingredients.map(ingredient => {
                        return `<li class="list-group-item">${ingredient.name}</li>
                                ${ingredient.special ? `
                                <ul class="list-group">
                                    <li class="list-group-item">${ingredient.special.type}</li>
                                    <li class="list-group-item">${ingredient.special.title}</li>
                                    <li class="list-group-item">${ingredient.special.text}</li>
                                </ul>
                                `
                                : ''}`
                        }).join('')}
                    </ul>
                    <h4>Directions</h4>
                    <ul class="list-group">${recipe.directions.map(direction => {
                        return `<li class="list-group-item">${direction.instructions}</li>`;
                        }).join('')}
                    </ul>
                    <button class="mt-2 edit btn btn-outline-dark btn-block" data-id="${recipe.uuid}">Update</button>
                </div>
            </div>    
            </div>
        `;
        this.recipesDiv.innerHTML = output;
    }
}