import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useMaquinaStore = defineStore("Maquinaria", () => {
    let getMaquina = async () => {
        try {
            let res = await axios.get("http://localhost:4600/api/maquinas");
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        getMaquina,
    };
});