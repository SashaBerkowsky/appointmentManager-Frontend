export default {
  name: "src-components-paciente-form",
  components: {},
  props: [],
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      nombreLengthMin: 5,
      nombreLengthMax: 15,
      edadMin: 18,
      edadMax: 120,
      urlRecursos:
        "https://60d3a13361160900173c97f3.mockapi.io/solicitudes/solicitudes",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    getInicialData() {
      return {
        nombre: "",
        edad: "",
        email: "",
        dni: "",
        lugarVac: "Pendiente",
        tipoVacuna: "Pendiente",
        fecha: "Pendiente",
        estado: "CONFIRMACION_PENDIENTE",
      };
    },

    async enviar() {
      console.log({ ...this.formData });
      if (this.formState.$valid) {
        try {
          await this.axios.post(this.urlRecursos, this.formData, {
            "content-type": "application/json",
          });
        } catch (err) {
          console.error("ERROR POSTEANDO SOLICITUD", err.message);
        }
        this.formData = this.getInicialData();
        this.formState._reset();
      } else {
        alert("Datos invalidos");
      }
    },
  },
};
