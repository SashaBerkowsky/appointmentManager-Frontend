<template>
  <section class="src-components-asignar-turno">
   
    <div v-if="getSolcitudesPorEstado.length">
      
   <div class="container-fluid mt-3">
      <h3 align="center" >Solicitudes pendientes</h3>
      <label for="solicitud">solicitudes</label>
      <select
        name="solicitud"
        class="form-select"
        v-model="seleccionado"
        :required="true"
      >
        <option :value="{}" disabled :selected="seleccionado"
          >Seleccione una solicitud</option
        >
        <option
          v-for="(solicitud, index) in getSolcitudesPorEstado"
          :key="index"
          :value="solicitud"
          >{{ solicitud.nombre }}
        </option>
      </select>
      <hr />
      
      <div v-if="estaSeleccionado">
        
          <label for="selectVacuna">Vacuna</label>
          <select
            name="selectVacuna"
            class="form-select"
            v-model="vacunaSeleccionada"
            :required="true"
          >
            <option value="" disabled :selected="vacunaSeleccionada"
              >Seleccione una vacuna</option
            >
            <option
              v-for="(vacuna, index) in vacunas"
              :key="index"
              :value="vacuna"
              >{{ vacuna }}
            </option>
          </select>
          <br />
          <vue-form :state="formState" @submit.prevent="enviar()">
            <validate tag="div" class="pt-2">
              <label for="fecha">Fecha</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                class="form-control"
                placeholder="Ingrese Fecha"
                v-model="seleccionado.fecha"
                required
                autocomplete="off"
                :min="fechaMin"
                :max="fechaMax"
              />
              <field-messages name="fecha" show="$dirty">
                <div slot="min" class="alert alert-danger mt-2">
                  La fecha minima es {{ fechaMin }}
                </div>
              </field-messages>
              <field-messages name="fecha" show="$dirty">
                <div slot="max" class="alert alert-danger mt-2">
                  La fecha minima es {{ fechaMax }}
                </div>
              </field-messages>
              <field-messages name="fecha" show="$dirty">
                <div slot="required" class="alert alert-danger mt-2">
                  Fecha Requerida
                </div>
              </field-messages>
            </validate>
            <br />
            <validate tag="div" class="pt-2">
              <label for="lugar">Lugar de vacunación</label>
              <input
                type="text"
                id="lugar"
                name="lugar"
                class="form-control"
                placeholder="Ingrese el lugar de Vacunación"
                v-model.trim="lugar"
                required
                autocomplete="off"
              />
              <field-messages name="lugar" show="$dirty">
                <div slot="required" class="alert alert-danger mt-2">
                  Lugar de vacunación requerido
                </div>
              </field-messages>
            </validate>
            <br />
            <button class="btn btn-dark mt-3 me-3 mb-3" type="submit">
              Enviar
            </button>
          </vue-form>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning mt-2">
      No hay solicitudes pendientes
    </div>
    <div v-if="ingresado" class="alert alert-warning mt-2">
      {{
        `Solicitud ${datosFilter.nombre} actualizada, fecha: `}}{{ datosFilter.fecha | formteoFecha }}
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-asignar-turno',
    props: [],
  async mounted () {
    await this.$store.dispatch('getSolicitudesPorEstado',"CONFIRMACION_PENDIENTE")
    },
    data () {
      return {
        ingresado:false,
        seleccionado:{},
        lugar:"",
        vacunaSeleccionada:"",
        isSelected:false,
        formState: {},
        vacunas:["sputnik-v", "covishield", "sinopharm"],
        fechaMin:this.obtenerFechaActual(),
        fechaMax:"2025-01-01",
        datosFilter:{}
      }

    },
    methods: {
      alertaIngresado(){
        this.datosFilter=this.seleccionado
        this.ingresado=true
        setTimeout(() => {
           this.ingresado=false
           this.datosFilter={}
        }, 3000);
      },

      formReset(){
        this.seleccionado={}
        this.vacunaSeleccionada=""
        this.lugar=""
      },
      enviar(){
        if (this.formState.$valid && !this.vacunaSeleccionada =="") {
        this.seleccionado.tipoVacuna=this.vacunaSeleccionada
        this.seleccionado.estado ="CONFIRMADO"
        this.seleccionado.lugarVac=this.lugar
        this.$store.dispatch("asignarTurno", this.seleccionado)
        this.alertaIngresado()
        this.formReset()
        }else{
          console.log("campos erroneos"
          )
        }
        },
        obtenerFechaActual(){
          const fecha= new Date()
            const formatoMap = {
             dd: fecha.getDate()<10? `0${fecha.getDate()}`:`${fecha.getDate()}`,
             mm: fecha.getMonth()<10 ? `0${fecha.getMonth() + 1}`:`${fecha.getMonth() + 1}`,
             yyyy: `${fecha.getFullYear()}`
        }
      return  `${formatoMap.yyyy}-${formatoMap.mm}-${formatoMap.dd}`
        }

    },
    computed: {
      estaSeleccionado(){
       return this.seleccionado?.nombre
        },
    }
}
</script>

<style scoped lang="css">
.src-components-asignar-turno {
}
</style>
