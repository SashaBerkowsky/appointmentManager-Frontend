import Vue from 'vue'

Vue.filter('formteoFecha', function(value) {
    console.log(value)
   let result= value.split("-")
   return `${result[2]}/${result[1]}/${result[0]}`
})  
