<template>
  <div class="container-fluid p-3">
    <h2>Solicitudes de vacunacion</h2>
    <hr />
    <table class="table">
      <thead>
        <tr class="bg-dark text-white">
          <th scope="col">Nombre</th>
          <th scope="col">Dni</th>
          <th scope="col">Edad</th>
          <th scope="col">Tipo de vacuna</th>
          <th scope="col">Lugar de vacunacion</th>
          <th scope="col">Fecha de turno</th>
          <th scope="col">Estado</th>
          <th scope="col" v-show="isLogged"></th>
        </tr>
      </thead>
      <tbody>
        <tr :class= "getColorFila(solicitud.estado)" v-for="(solicitud, index) in solicitudes" :key="index">
          <td>{{ solicitud.nombre }}</td>
          <td>{{ solicitud.dni }}</td>
          <td>{{ solicitud.edad }}</td>
          <td>{{ solicitud.tipoVacuna }}</td>
          <td>{{ solicitud.lugarVac }}</td>
          <td>{{ solicitud.fecha }}</td>
          <td>{{ solicitud.estado }}</td>
          <td v-show="isLogged">
            <button class="btn btn-danger" @click="borrarSolicitud(solicitud)">
              Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="js">

  export default  {
    name: 'src-components-listado-solicitudes',
    props: [],
    async mounted () {
      await this.$store.dispatch('getSolicitudes')
    },
    data () {
      return {

      }
    },
    methods: {
      borrarSolicitud(solicitud){
        this.$store.dispatch('deleteSolicitud', solicitud)
        this.$store.dispatch('getSolicitudes')
      },
      getColorFila(estado){ 
      let colorFila

      if(estado=="CONFIRMACION_PENDIENTE"){
        colorFila="table-danger"
      } else if (estado=="CONFIRMADO") {
        colorFila="table-primary"
      } else if (estado=="CONFIRMADO_PRIMERA_DOSIS"){
        colorFila="table-warning"
      } else if (estado=="CONFIRMADO_SEGUNDA_DOSIS") {
        colorFila="table-info"
      } else if (estado=="COMPLETADO") {
        colorFila="table-success"
      } else {
        colorFila="table-default"
      }
      return colorFila
    },
    },
    computed: {
      solicitudes(){
        return this.$store.state.solicitudes
      },
      isLogged(){
        return this.$store.state.isLogged
      }
    }
}
</script>

<style scoped lang="css">
.src-components-listado-solicitudes {
}
</style>
