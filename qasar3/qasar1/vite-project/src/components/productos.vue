<template>
  <div id="zzz">


    <h2 class="title">Lista de Sedes</h2>

    <div class="q-pa-md q-gutter-sm">

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
            v-model="codigo"
            label="Codigo"
            class="q-my-md q-mx-md"
            type="number"
          />
          <q-input
            outlined
            v-model="nombre"
            label="Nombre de la Sede"
            class="q-my-md q-mx-md"
            type="text"
          />

          <q-input
            outlined
            v-model="direccion"
            label="Dirrecion de la Sede"
            class="q-my-md q-mx-md"
            type="text"
          />
          <q-input
            outlined
            v-model="correo"
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
            <q-btn @click="agregarSede()" color="red" class="text-white"
              >Agregar
              <template v-slot:loading>
                <q-spinner color="primary" size="1em" />
              </template>
            </q-btn>
            <q-btn label="Cerrar" color="black" outline @click="cerrar()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div style="width: 150vh">
      <div
      style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            height:25px
          "
        >
          <q-btn color="green" @click="abrir()">Añadir Sede</q-btn>
        </div>
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
   
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSedeStore } from "../stores/sede.js";
import  {Notify}  from 'quasar'
let alert = ref(false);
let nombre = ref('');
let correo = ref('');
let direccion = ref('');
let codigo = ref('');
let hora = ref('');
let ciudad = ref('');
let telefono = ref('');
let useSede = useSedeStore();

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

let listarIngesos = async () => {
  r = await useSede.getSede();

  rows.value = r.sedes;
  console.log(r);
};

function abrir() {
  alert.value = true;
}

function cerrar() {
  alert.value = false;
}

const agregarSede = async () => {
// let nombre = ref('');
// let correo = ref('');
// let direccion = ref('');
// let codigo = ref('');
// let hora = ref('');
// let ciudad = ref('');
// let telefono = ref('');
if (codigo.value=="") {
  Notify.create('por favor ingrese su codigo ')
  
}else if (correo.value==""){
  Notify.create('por favor ingrese el correo')
  
}else if (nombre.value==""){
  Notify.create('por favor ingrese el nombre ')
  
}else if (direccion.value==""){
  Notify.create('por favor ingrese la direccion')
  
}else if (telefono.value==""){
  Notify.create('por favor ingrese el telefono')
  
} else if (hora.value==""){
  Notify.create('por favor ingrese el hora ')
  
}  else if (ciudad.value==""){
  Notify.create('por favor ingrese la ciudad')
  
}else{

  try {
    await useSede.agregarSede({
      nombre: nombre.value,
      direccion: direccion.value,
      codigo: codigo.value,
      hora: hora.value,
      ciudad: ciudad.value,
      telefono: telefono.value,
      correo: correo.value
    });
    cerrar();
    listarIngesos();
  } catch (error) {
    console.error("Error al agregar inventario:", error);
  }
}
};

onMounted(() => {
  listarIngesos();
})
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
#zzz{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
