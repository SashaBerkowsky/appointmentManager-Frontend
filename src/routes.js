import Vue from "vue";
import VueRouter from "vue-router";
import ListadoSolicitudes from "./components/ListadoSolicitudes.vue";
import PacienteForm from "./components/PacienteForm/PacienteForm.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: ListadoSolicitudes },
    { path: "/pedirTurno", component: PacienteForm },
  ],
});
