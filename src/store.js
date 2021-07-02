import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const urlRecursos =
  "https://60d3a13361160900173c97f3.mockapi.io/solicitudes/solicitudes";

export default new Vuex.Store({
  state: {
    isLogged: false,
    solicitudes: [],
    solicitudBuscada: {},
    encontreSolicitud: false,
  },
  actions: {
    logInChange({ commit }, value) {
      commit("changeLogInStatus", value);
    },
    async getSolicitudes({ commit }) {
      try {
        const respuesta = await axios(urlRecursos);
        const solicitudes = respuesta.data;
        commit("getSolicitudes", solicitudes);
      } catch (err) {
        console.error("ERROR en AXIOS: ", err.message);
      }
    },
    async postSolicitud({ commit }, value) {
      try {
        console.log(value);
        await axios.post(urlRecursos, value, {
          "content-type": "application/json",
        });
        commit("postSolicitud", value);
      } catch (err) {
        console.error("ERROR POSTEANDO SOLICITUD", err.message);
      }
    },
    async getSolicitudDni({ commit }, value) {
      try {
        const res = await axios(`${urlRecursos}/?dni=${value}`);
        const solicitud = {
          data: res.data[0],
          status: res.data[0] !== undefined,
        };
        commit("getSolicitudDni", solicitud);
      } catch (err) {
        console.error("ERROR BUSCANDO SOLICITUD", err.message);
      }
    },
    async deleteSolicitud({ commit }, value) {
      try {
        console.log(value.id);
        await axios.delete(`${urlRecursos}/${value.id}`);
        const idx = this.state.solicitudes.indexOf(value);
        commit("deleteSolicitud", idx);
      } catch (err) {
        console.error("ERROR ELIMINANDO SOLICITUD", err.message);
      }
    },
  },
  mutations: {
    changeLogInStatus(state, value) {
      state.isLogged = value;
    },
    getSolicitudes(state, value) {
      state.solicitudes = value;
    },
    postSolicitud(state, value) {
      state.solicitudes.push(value);
    },
    getSolicitudDni(state, value) {
      state.solicitudBuscada = value.data;
      state.encontreSolicitud = value.status;
    },
    deleteSolicitud(state, idx) {
      state.solicitudBuscada = {};
      state.encontreSolicitud = false;
      state.solicitudes.splice(idx, 1);
    },
  },
});
