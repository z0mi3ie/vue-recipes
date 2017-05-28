<template>
  <div class="details container">
		<span class="pull-right"><button class="btn btn-danger" v-on:click="deleteRecipe(recipe.name.split(' ').join('_'))">Delete</button></span>
		<h1 class="page-header">{{recipe.name}}</h1>
		<h2>{{recipe.description}}</h2>
		<h3>{{recipe.category}}</h3>

		<h4>Ingredients</h4>
		<ul>
			<li v-for="ingredient in recipe.ingredients">
				{{ingredient}}
			</li>
		</ul>
		
		<h4>Steps</h4>
		<ul>
			<li v-for="step in recipe.steps">
				{{step}}
			</li>
		</ul>

  </div>
</template>

<script>
export default {
  name: 'recipedetails',
  data () {
    return {
			recipe: '',
    }
  },
	methods: {
		fetchRecipe(name) {
      this.$http.get('http://localhost:6080/recipe/'+name)
        .then(function(response){
          console.log(response.body)
          this.recipe = JSON.parse(JSON.stringify(response.body));
        });
		},
		deleteRecipe(id) {
      this.$http.delete('http://localhost:6080/recipe/'+id)
        .then(function(response){
					this.$router.push({path: '/', query: {alert: 'Recipe deleted!'}});
        });
		}
	},
	created: function() {
		this.fetchRecipe(this.$route.params.id);
	}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
