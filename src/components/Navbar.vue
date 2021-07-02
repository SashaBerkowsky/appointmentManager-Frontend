<template>
  <section class="src-componentes-navbar">
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: #e3f2fd"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Vacunatorio</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="isLogged">
            <li class="nav-item">
              <a class="nav-link" href="">Asignar turno</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Modificar estado</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/cancelarTurno">Eliminar solicitud</a>
            </li>
          </ul>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
            <li class="nav-item">
              <a class="nav-link" href="/pedirTurno">Pedi tu turno</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/cancelarTurno">Cancela tu turno</a>
            </li>
          </ul>
          <button
            v-if="isLogged"
            class="btn btn-outline-dark"
            @click="logOut()"
          >
            Log out
          </button>
          <button
            v-else
            class="btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#logInModal"
          >
            Admin Login
          </button>
        </div>
      </div>
    </nav>
    <div
      class="modal fade"
      id="logInModal"
      tabindex="-1"
      aria-labelledby="logInModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="logInModalLabel">Admin Login</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import * as firebase from "firebase/app";
import "firebase/auth";

  import LoginForm from './LoginForm/LoginForm'

  export default  {
    name: 'src-componentes-navbar',
    components:{LoginForm},
    props: [],
    beforeCreate () {
      firebase.default.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch('logInChange', true) 
        } else {
         this.$store.dispatch('logInChange', false) 
        }
      }); 
      
    },
    mounted(){
      console.log(this.$router
      )
    },
    data () {
      return {
      }
    },
    methods: {
      async logOut(){
        try{
          const res = firebase.default.auth().signOut()
          console.log(res)
          this.$store.dispatch('logInChange', false)
          this.$router.go() 
        } catch(err){
          alert('Logout Error: '+ err.message)
        }
        
      }
    },
    computed: {
      isLogged(){
        return this.$store.state.isLogged
      }
    }
}


</script>

<style scoped lang="css">
.src-componentes-navbar {
}
</style>
