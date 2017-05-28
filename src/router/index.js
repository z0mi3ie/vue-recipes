import Vue from 'vue'
import Router from 'vue-router'

import Recipes from '@/components/Recipes'
import About from '@/components/About'
import RecipeDetails from '@/components/RecipeDetails'
import Add from '@/components/Add'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Recipes',
      component: Recipes
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/about',
      name: 'About',
      component: About 
    },
    {
	  path: '/recipe/:id',
      name: 'Details',
      component: RecipeDetails
    }
  ]
})
