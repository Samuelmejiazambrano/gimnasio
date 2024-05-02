import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useMantenimientoStore = defineStore("Mantenimiento", () => {
    let getMantenimiento = async () => {
        try {
            let res = await axios.get("http://localhost:4600/api/mantenimiento");
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        getMantenimiento,
    };
});