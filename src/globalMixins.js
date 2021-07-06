import Vue from 'vue'

var miMixinGlobal = {
    computed: {
        getIsLogged() {
            return this.$store.state.isLogged
        },
        getSolcitudesPorEstado(){
            return this.$store.state.solicitudesPorEstado
        }
    }
}

Vue.mixin(miMixinGlobal)