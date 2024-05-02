import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useUsuarioStore = defineStore("usuario", () => {
    let getUsuario = async () => {
        try {
            let res = await axios.get("http://localhost:4600/api/usuario");
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    let agregarUsuarios = async (usuario) => {
        try {
            const res = await axios.post("http://localhost:4600/api/usuario",usuario);
            console.log("Usuario agregado:", res.data);
           
          } catch (error) {
            console.error("Error al agregar inventario:", error);
            throw error;
          }
    };
    return {

        
        getUsuario,agregarUsuarios
    };
});