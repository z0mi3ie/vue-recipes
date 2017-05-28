<template>
  <div class="recipes container">
		<Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Recipes</h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
					<th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in recipes">
          <td>{{recipe.name}}</td>
          <td>{{recipe.description}}</td>
          <td>{{recipe.category}}</td>
					<td><router-link class="btn btn-default" v-bind:to="'/recipe/'+ recipe.name.split(' ').join('_')">View</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
	import Alert from './Alert';
export default {
  name: 'recipes',
  data () {
    return {
      recipes: [],
			alert: ''
    }
  }, 
  methods: {
    fetchRecipes(){
      this.$http.get('http://localhost:6080/recipe')
        .then(function(response){
          console.log(response.body)
          this.recipes = JSON.parse(JSON.stringify(response.body))
        });
    }
  },
  created: function(){
		if(this.$route.query.alert){
			this.alert = this.$route.query.alert;
		}
    this.fetchRecipes();
  },
	components: {
		Alert
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
