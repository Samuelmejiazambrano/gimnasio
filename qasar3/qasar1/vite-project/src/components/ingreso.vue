<template>
  <div id="aaa">
    <h2 class="title">Lista de Usuario</h2>

    <div class="q-pa-md">
      <div class="q-pa-md q-gutter-sm">
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            height: 25px;
          "
        >
          <q-btn color="green" @click="abrir()">Añadir Usuario</q-btn>
        </div>
        <q-dialog v-model="alert" persistent>
          <q-card class="" style="width: 500px">
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
              label="Nombre"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="sede"
              label="Sede"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="email"
              label="Email"
              class="q-my-md q-mx-md"
              type="email"
            />
            <q-input
              outlined
              v-model="direccion"
              label="Dirección"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="ciudad"
              label="Ciudad"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="telefono"
              label="Teléfono"
              class="q-my-md q-mx-md"
              type="tel"
            />
            <q-input
              outlined
              v-model="rol"
              label="rol"
              class="q-my-md q-mx-md"
              type="tel"
            />
            <q-input
              outlined
              v-model="password"
              label="password"
              class="q-my-md q-mx-md"
              type="tel"
            />
            <q-card-actions align="right">
              <q-btn @click="agregarUsuario()" color="red" class="text-white"
                >Agregar
                <template v-slot:loading>
                  <q-spinner color="primary" size="1em" />
                </template>
              </q-btn>
              <q-btn label="Cerrar" color="black" outline @click="cerrar" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>

      <q-table class="tabla" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn flat dense round icon="edit"></q-btn>
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
import { Notify } from "quasar";
import { useUsuarioStore } from "../stores/usuario.js";

import axios from "axios";

let nombre = ref("");
let sede = ref("");
let email = ref("");
let direccion = ref("");
let telefono = ref("");
let rol = ref("");
let password = ref("");

let useUsuario = useUsuarioStore();

let rows = ref([]);
let columns = ref([
  { name: "_id", label: "_id", align: "center", field: "_id" },
  { name: "sede", label: "Sede", align: "center", field: "sede" },
  { name: "nombre", label: "Nombre", align: "center", field: "nombre" },
  { name: "email", label: "Email", align: "center", field: "email" },
  {
    name: "direccion",
    label: "Dirección",
    align: "center",
    field: "direccion",
  },
  { name: "telefono", label: "Teléfono", align: "center", field: "telefono" },
  { name: "estado", label: "Estado", align: "center", field: "estado" },
  { name: "rol", label: "Rol", align: "center", field: "rol" },
]);

let r = null;

let listarIngesos = async () => {
  r = await useUsuario.getUsuario();

  rows.value = r.usuario;
  console.log(r);
};
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
const agregarUsuario = async () => {
  if (nombre.value == "") {
    Notify.create("por favor ingrese su nombre ");
  } else if (sede.value == "") {
    Notify.create("por favor ingrese la Sede");
  } else if (email.value == "") {
    Notify.create("por favor ingrese el Email");
  } else if (direccion.value == "") {
    Notify.create("por favor ingrese la direccion");
  } else if (telefono.value == "") {
    Notify.create("por favor ingrese el telefono");
  } else if (rol.value == "") {
    Notify.create("por favor ingrese el rol ");
  } else if (password.value == "") {
    Notify.create("por favor ingrese la Contrasena correcta ");
  } else {
    try {
      await useUsuario.agregarUsuarios({
        nombre: nombre.value,
        sede: sede.value,
        email: email.value,
        direccion: direccion.value,
        telefono: telefono.value,
        rol: rol.value,
        password: password.value,
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
}
#aaa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
