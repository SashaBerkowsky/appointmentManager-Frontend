<template>
  <div class="container-fluid p-3">
    <h2>Modificador de estados de vacunacion</h2>
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
          <th scope="col" v-show="getIsLogged"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="getColorFila(solicitud.estado)"
          v-for="(solicitud, index) in getSolicitudes"
          :key="index"
        >
          <td>{{ solicitud.nombre }}</td>
          <td>{{ solicitud.dni }}</td>
          <td>{{ solicitud.edad }}</td>
          <td>{{ solicitud.tipoVacuna }}</td>
          <td>{{ solicitud.lugarVac }}</td>
          <td>{{ solicitud.fecha }}</td>
          <td>{{ solicitud.estado | formateoEstado }}</td>
          
          <td v-show="getIsLogged">
            <button :disabled="esUltEstado(solicitud.estado)" class="btn btn-success" @click="modificarEstado(solicitud)" >
              Modificiar Estado
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
      modificarEstado(solicitud){
        solicitud.estado = this.estadoSiguiente(solicitud.estado)
        this.$store.dispatch('modificarEstado', solicitud)
      },
      esUltEstado(estado){
        return estado === "CONFIRMADO_SEGUNDA_DOSIS"
      },
      estadoSiguiente(estado){
          let result;
          switch (estado) {
            case "CONFIRMACION_PENDIENTE":
              result = "TURNO_CONFIRMADO";
              break;
              case "TURNO_CONFIRMADO":
                result = "CONFIRMADO_PRIMERA_DOSIS";
                break;
            case "CONFIRMADO_PRIMERA_DOSIS":
              result = "CONFIRMADO_SEGUNDA_DOSIS";
              break;
            }
          return result;
      },
      getColorFila(estado){
      let colorFila

      if(estado=="CONFIRMACION_PENDIENTE"){
        colorFila="table-danger"
      } else if (estado=="TURNO_CONFIRMADO") {
        colorFila="table-primary"
      } else if (estado=="CONFIRMADO_PRIMERA_DOSIS"){
        colorFila="table-warning"
      } else if (estado=="CONFIRMADO_SEGUNDA_DOSIS") {
        colorFila="table-success"
      } else {
        colorFila="table-default"
      }
      return colorFila
    },
    },
    computed: {
    }
}
</script>

<style scoped lang="css">
.src-components-listado-solicitudes {
}
</style>
