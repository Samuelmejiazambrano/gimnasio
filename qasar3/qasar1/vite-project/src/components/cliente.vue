
<template>
    <div id="sss">
      <h2 class="title">Lista de cliente</h2>
      
      <div class="q-pa-md">
        <q-table
          title="Sedes"
          :rows="rows"
          :columns="columns"
          row-key="name"
          class="custom-table-header"
        >
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn flat dense round  icon="edit"></q-btn>
              <q-btn
                flat
                dense
                round
                icon="delete"
                @click="eliminarUsuario(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from "vue";
  import { useClienteStore } from "../stores/cliente.js";
  
  let useCliente = useClienteStore();
  
  let rows = ref([]);
  let columns = ref([
    { name: "codigo", label: "_id", align: "center", field: "_id" },
    { name: "nombre", label: "nombre", align: "center", field: "nombre" },
    {
      name: "direccion",
      label: "direccion",
      align: "center",
      field: "direccion",
    },
    { name: "ciudad", label: "ciudad", align: "center", field: "ciudad" },
    { name: "createAt", label: "createAt", align: "center", field: "createAt" },
    { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
  ]);
  
  let r = null;
  
  let listarCliente = async () => {
    r = await useCliente.getCliente();
  
    rows.value = r.cliente;
    console.log(r);
  };
  onMounted(() => {
  listarCliente();
});
  </script>
  
  <style scoped>
  /* Estilos para el título */
  .title {
    font-size: 2.1rem;
    font-family: "Roboto", sans-serif;
    border-bottom: 3px solid #344860;
    padding-top: 20px;
    font-weight: 900;
  }
  
  /* Estilos para la cabecera de la tabla */
  .custom-table-header .q-table-header {
    background-color: #344860;
    color: white; /* Cambia el color del texto si es necesario */
  }
  
  /* Estilos para la tabla */
  .rounded-borders .q-table-container .q-table {
    border-radius: 8px;
  }
  
  /* Estilos para los botones de opciones */
  .q-table-body .q-btn {
    min-width: 32px;
  }
  
  .q-table-body .q-btn .q-icon {
    font-size: 18px;
  }
  
  .tabla {
    margin-bottom: 150px;
    width: 100%;
  }
  #sss{
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
  </style>
  