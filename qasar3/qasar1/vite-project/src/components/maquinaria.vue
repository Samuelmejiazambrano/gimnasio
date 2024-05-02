<template>
  <div id="ttt">
    <h2 class="title">Lista de Maquinaria</h2>
    <div class="q-pa-md q-gutter-sm">
     
    </div>
    <div style="width: 90%">
      <q-table
        title="Maquinaria"
        :rows="rows"
        :columns="columns"
        row-key="codigo"
        class="rounded-borders"
        dense
        style="margin: auto;"
      >
        <!-- Contenido de la tabla -->
        <template v-slot:head-top>
          <q-tr>
            <!-- Iterar sobre las columnas para establecer el color de fondo naranja -->
            <q-th
              v-for="column in columns"
              :key="column.name"
              :props="props"
              style="background-color: orange; color: white; font-weight: bold;"
            >
              {{ column.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="q-pr-xs">
            <!-- Contenido de las celdas de opciones -->
          </q-td>
        </template>
      </q-table>
    </div>
   
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMaquinaStore } from "../stores/maquinaria.js";

let useMaquina = useMaquinaStore();

let rows = ref([]);
let columns = ref([
  { name: "codigo", label: "Código", align: "center", field: "codigo" },
  { name: "valor", label: "Valor", align: "center", field: "valor" },
  { name: "cantidad", label: "Cantidad", align: "center", field: "cantidad" },
  {
    name: "descripcion",
    label: "Descripción",
    align: "center",
    field: "descripcion",
  },
  { name: "createAt", label: "Creado en", align: "center", field: "createAt" },
  { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
]);

let listarMaquinas = async () => {
  let response = await useMaquina.getMaquina();
  rows.value = response.maquinarias;
  console.log(response);
};
onMounted(() => {
  listarMaquinas();
});


let editarMaquina = (maquina) => {
  // Lógica para editar la maquina
};

let eliminarMaquina = (maquina) => {
  // Lógica para eliminar la maquina
};

onMounted(() => {
  listarMaquinas();
});
</script>

<style scoped>
/* Estilos para el título */
.title {
  font-size: 2.1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  border-bottom: 3px solid #344860;
  padding-top: 20px;
}

/* Estilos para la tabla */
.rounded-borders .q-table-container .q-table {
  border-radius: 12px;
  width: 300px; 
  height: 200px; 

}

#ttt{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
 
</style>
