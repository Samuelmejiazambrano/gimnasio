<template>
  <div id="jjj">
    <h2 class="title">Lista de Planes</h2>

    <div class="q-pa-md">
      <q-table class="tabla" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn flat dense round    icon="edit"></q-btn>
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
import { usePlanStore } from "../stores/plan.js";

let usePlan = usePlanStore();

let rows = ref([]);
let columns = ref([
  { name: "_id", label: "_id", align: "center", field: "_id" },
  { name: "valor", label: "Valor", align: "center", field: "valor" },
  { name: " CantDias", label: "CantDias", align: "center", field: "CantDias" },
  {
    name: "descripcion",
    label: "descripcion",
    align: "center",
    field: "descripcion",
  },
  { name: "createAt", label: "createAt", align: "center", field: "createAt" },
  { name: "opciones", label: "Opciones", align: "center", field: "opciones" },
]);

let r = null;

let listarIngesos = async () => {
  r = await usePlan.getPlan();

  rows.value = r.planes;
  console.log(r);
};
onMounted(() => {
  listarIngesos();
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
  height: 80%;
}
#jjj{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
