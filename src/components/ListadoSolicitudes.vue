<template>
  <div class="container-fluid p-3">
    <h2>Solicitudes de vacunacion</h2>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Dni</th>
          <th scope="col">Edad</th>
          <th scope="col">Tipo de vacuna</th>
          <th scope="col">Lugar de vacunacion</th>
          <th scope="col">Fecha de turno</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(solicitud, index) in solicitudes" :key="index">
          <td>{{ solicitud.nombre }}</td>
          <td>{{ solicitud.dni }}</td>
          <td>{{ solicitud.edad }}</td>
          <td>{{ solicitud.tipoVacuna }}</td>
          <td>{{ solicitud.lugarVac }}</td>
          <td>{{ solicitud.fecha }}</td>
          <td>{{ solicitud.estado }}</td>
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
      await this.getSolicitudes()
      console.log(this.solicitudes)
    },
    data () {
      return {
        urlRecursos:"https://60d3a13361160900173c97f3.mockapi.io/solicitudes/solicitudes",
        solicitudes:[]
      }
    },
    methods: {
      async getSolicitudes(){
        try{
          const respuesta = await this.axios(this.urlRecursos)
          this.solicitudes = respuesta.data
        } catch(err){
          console.error('ERROR en AXIOS: ', err.message)
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
.src-components-listado-solicitudes {
}
</style>
