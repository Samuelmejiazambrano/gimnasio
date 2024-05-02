import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useSedeStore = defineStore("sede", () => {
    let getSede = async () => {
        try {
            let res = await axios.get("http://localhost:4600/api/sede");
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    let agregarSede = async (sede) => {
        try {
            const res = await axios.post("http://localhost:4600/api/sede",sede);
            console.log("SEDE agregado:", res.data);
           
          } catch (error) {
            console.error("Error al agregar inventario:", error);
            throw error; // Propagar el error para manejarlo en el componente
          }
    };
    
    return {
        getSede,agregarSede
    };
});