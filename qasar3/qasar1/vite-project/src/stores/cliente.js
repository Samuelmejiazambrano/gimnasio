import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useClienteStore = defineStore("Cliente", () => {
    let getCliente = async () => {
        try {
            let res = await axios.get("http://localhost:4600/api/clientes");
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        getCliente,
    };
});