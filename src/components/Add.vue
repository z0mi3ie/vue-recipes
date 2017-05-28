<template>
  <div class="add container">
  <h1 class="page-header">Add Recipe</h1>
  <form v-on:submit.prevent="addRecipe">
  <div class="well">
    <h4>Recipe Info</h4>
    <div class="form-group">
        <label>Name</label>
        <input type="text" v-on:keydown.enter.prevent="" class="form-control" placeholder="Name" v-model="recipe.name">
        <label>Description</label>
        <input type="text" v-on:keydown.enter.prevent="" class="form-control" placeholder="Description" v-model="recipe.description" id="description">
        <label>Category</label>
        <input type="text" v-on:keydown.enter.prevent="" class="form-control" placeholder="Category" v-model="recipe.category">
    </div>
  </div>
  
  <div class="well">
    <h4>Ingredients</h4>
    <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-on:keydown.enter.prevent="ingredientEnter" v-model="ingredient">
    </div>

	  <ul>
		<li v-for="ingredient in ingredients">
			{{ingredient}} 
			<button type="button" class="btn btn-primary btn-sm" v-on:click="deleteIngredient(ingredient)">X</button>
		</li>
	  </ul>
  </div>
 
  <div class="well">
    <h4>Steps</h4>
    <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Name" v-on:keydown.enter.prevent="stepEnter" v-model="step">
    </div>

	  <ol>
		<li v-for="step in steps">
			{{step}} 
			<button type="button" class="btn btn-primary btn-sm" v-on:click="deleteStep(step)">X</button>
			<button type="button" class="btn btn-primary btn-sm" v-on:click="moveStepUp(step)">Up</button>
			<button type="button" class="btn btn-primary btn-sm" v-on:click="moveStepDown(step)">Down</button>
		</li>
	  </ol>
  </div>

  <button type="submit" class="btn btn-primary">Submit Recipe</button>

  </form>
  </div>
</template>

<script>
export default {
  name: 'add',
  data () {
      return {
          recipe: {},
          
		  ingredients: [],
		  ingredient: "",
		  
		  steps: [],
		  step: "",
      }
  },
  methods: {
      addRecipe: function() {
		  var failed = false
		  if(!this.recipe.name || !this.recipe.description || !this.recipe.category) {
			  console.log("Required fields missing!")
			  failed = true
		  }

		  if(!this.ingredients || this.ingredients.length < 1) {
			  console.log("Ingredients required!")
			  failed = true
		  }
		  
		  if(!this.steps || this.steps.length < 1) {
			  console.log("Steps required!")
			  failed = true
		  }
		  
		  if(!failed) {
          	console.log("[+] Submitting")
			let newRecipe = {
				name: this.recipe.name,
				description: this.recipe.description,
				category: this.recipe.category,
				ingredients: this.ingredients,
				steps: this.steps,
			}
			this.recipe.ingredients = this.ingredients
			this.recipe.steps = this.steps
			console.log("-------- Full recipe --------")
			console.log(this.recipe)
			console.log(newRecipe)
			
			this.$http.post('http://localhost:6080/recipe', newRecipe)
				.then(function(response) {
					this.$router.push({path: '/', query: {alert: "Recipe added!"}});
				});

		  }
      },
	  nextElement: function(event) {
		  let domElement = this.$el;
		  console.log(domElement);
		  event.target.next.focus()
		  console.log(event.target.next.focus())
		  //document.getElementById('description').focus();
	  },
      ingredientEnter: function() {
		  if(this.ingredient.length < 3) {
		    console.log("Ingredient length is to small")
		  } else { 
		    this.ingredients.push(this.ingredient)
		    this.ingredient = ""
		  }
      },
      stepEnter: function() {
		  if(this.step.length < 3) {
			console.log("Step length is to small")
		  } else {
		    this.steps.push(this.step)
		    this.step = ""
		  }
      },
	  deleteIngredient: function(ingredient) {
		  this.ingredients.splice(this.ingredients.indexOf(ingredient), 1)
	  },
	  deleteStep: function(step) {
		  this.steps.splice(this.steps.indexOf(step), 1)
	  },
	  moveStepUp: function(step) {
			let rearranged = this.move(this.steps, this.steps.indexOf(step), (this.steps.indexOf(step) - 1))
			this.steps = rearranged;
	  },
	  moveStepDown: function(step) {
			let rearranged = this.move(this.steps, this.steps.indexOf(step), (this.steps.indexOf(step) + 1))
			this.steps = rearranged;
	  },
		move: function(arr, old_index, new_index) {
			if(new_index < 0) {
				return arr;
			}

			if(new_index > arr.length) {
				return arr;
			}

			arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
		  return arr;
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
