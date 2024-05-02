<template>
  <div id="sss">
    <h2 class="title">Lista de Mantenimiento</h2>

    <div class="q-pa-md q-gutter-sm">
      <q-btn @click="abrir()">Anadir</q-btn>
      <q-dialog v-model="alert" persistent>
        <q-card class="" style="width: 700px">
          <q-card-section
            style="background-color: #344860; margin-bottom: 20px"
          >
            <div class="text-h6 text-white">
              {{ accion == 1 ? "Agregar Instructor" : "Editar Instructor" }}
            </div>
          </q-card-section>
          <q-input
            outlined
            v-model="nombre"
            label="Nombre de la Sede"
            class="q-my-md q-mx-md"
            type="text"
          />

          <q-input
            outlined
            v-model="dirrecion"
            label="Dirrecion de la Sede"
            class="q-my-md q-mx-md"
            type="text"
          />
          <q-input
            outlined
            v-model="codigo"
            label="Correo"
            class="q-my-md q-mx-md"
            type="text"
          />

          <q-input
            outlined
            v-model="hora"
            label="Horario"
            class="q-my-md q-mx-md"
            type="text"
          />
          <q-input
            outlined
            v-model="ciudad"
            label="Ciudad de la Sede"
            class="q-my-md q-mx-md"
            type="text"
          />
          <q-input
            outlined
            v-model="telefono"
            type="tel"
            label="Telefono"
            class="q-my-md q-mx-md"
          />
          <q-card-actions align="right">
            <q-btn @click="agregar()" color="red" class="text-white"
              >{{ accion == 1 ? "Agregar" : "Editar" }}
              <template v-slot:loading>
                <q-spinner color="primary" size="1em" />
              </template>
            </q-btn>
            <q-btn label="Cerrar" color="black" outline @click="cerrar()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="q-pa-md">
      <q-table
        title="Mantenimiento"
        title-class=" text-weight-bolder text-h5"
        :rows="rows"
        :columns="columns"
        row-key="codigo"
        class="rounded-borders"
        dense
      >
        <template v-slot:head-top>
          <q-tr>
            <q-th
              v-for="column in columns"
              :key="column.name"
              :props="props"
              style="background-color: orange; color: white; font-weight: bold"
            >
              {{ column.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="q-pr-xs"> </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMantenimientoStore } from "../stores/mantenimiento.js";
let alert = ref(false);
// function cerrardiv() {
//   alert.value = false;
//   limpiar();
// }

function abrir() {
  alert.value = true;
}

function cerrar() {
  alert.value = false;
}

let useMantenimiento = useMantenimientoStore();

let rows = ref([]);
let columns = ref([
  { name: "_id", label: "_id", align: "center", field: "_id" },
  {
    name: "descripcion",
    label: "descripcion",
    align: "center",
    field: "descripcion",
  },
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
  let response = await useMantenimiento.getMantenimiento();
  rows.value = response.mantenimientos;
  console.log(response);
};

let editarMaquina = (maquina) => {};

let eliminarMaquina = (maquina) => {};
onMounted(() => {
  listarMaquinas();
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
#sss {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
