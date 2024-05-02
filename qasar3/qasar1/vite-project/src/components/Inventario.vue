<template>
  <div id="rrr">
    <h2 class="title">Hola Mundo</h2>
    <div class="q-pa-md">
      <div class="q-pa-md q-gutter-sm">
        <div style="width: 120vh">
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
            "
          >
            <q-btn color="green" @click="abrirAgregarModal()"
              >Añadir Producto</q-btn
            >
          </div>
        </div>
        <!-- Modal para agregar -->
        <q-dialog v-model="agregarModal" persistent>
          <q-card class="" style="width: 500px; max-height: 1000px">
            <q-card-section
              style="background-color: #344860; margin-bottom: 20px"
            >
              <div class="text-h6 text-white">Agregar Inventario</div>
            </q-card-section>
            <q-input
              outlined
              v-model="descripcion"
              label="Descripción"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="codigo"
              label="Código"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="valor"
              label="Valor"
              class="q-my-md q-mx-md"
              type="number"
            />
            <q-input
              outlined
              v-model="cantidad"
              label="Cantidad"
              class="q-my-md q-mx-md"
              type="number"
            />

            <q-card-actions align="right">
              <q-btn
                @click="agregarInventario()"
                color="green"
                class="text-white"
              >
                Agregar
                <template v-slot:loading>
                  <q-spinner color="primary" size="1em" />
                </template>
              </q-btn>
              <q-btn
                label="Cerrar"
                color="red"
                outline
                @click="cerrarAgregarModal()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Modal para editar -->
        <q-dialog v-model="editarModal" persistent>
          <q-card class="" style="width: 500px; max-height: 1000px">
            <q-card-section
              style="background-color: #344860; margin-bottom: 20px"
            >
              <div class="text-h6 text-white">Editar Inventario</div>
            </q-card-section>
            <q-input
              outlined
              v-model="descripcion"
              label="Descripción"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="codigo"
              label="Código"
              class="q-my-md q-mx-md"
              type="text"
            />
            <q-input
              outlined
              v-model="valor"
              label="Valor"
              class="q-my-md q-mx-md"
              type="number"
            />
            <q-input
              outlined
              v-model="cantidad"
              label="Cantidad"
              class="q-my-md q-mx-md"
              type="number"
            />

            <q-card-actions align="right">
              <q-btn @click="editar()" color="green" class="text-white">
                Guardar
                <template v-slot:loading>
                  <q-spinner color="primary" size="1em" />
                </template>
              </q-btn>
              <q-btn
                label="Cerrar"
                color="red"
                outline
                @click="cerrarEditarModal()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Botón para abrir el modal de agregar -->

        <!-- Tabla de inventario -->
        <q-table
          style=""
          title="Inventario"
          title-class="text-weight-bolder text-h5"
          :rows="rows"
          :columns="columns"
          row-key="codigo"
        >
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn
                color="green"
                flat
                dense
                round
                @click="abrirEditarModal(props.row)"
                icon="edit"
              />
              <q-btn
                color="red"
                flat
                dense
                round
                icon="delete"
                @click="eliminarInventario(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Notify } from "quasar";
import { useInventarioStore } from "../stores/inventario.js";

let useInventario = useInventarioStore();

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

let agregarModal = ref(false);
let editarModal = ref(false);
let descripcion = ref("");
let codigo = ref("");
let valor = ref("");
let cantidad = ref("");

const listarInventario = async () => {
  const response = await useInventario.getInventario();
  rows.value = response.inventarios;
};

const agregarInventario = async () => {
  if (descripcion.value == "") {
    Notify.create("Por Favor Ingrese la Descripcion");
  } else if (codigo.value == "") {
    Notify.create("por favor ingrese el codigo");
  } else if (valor.value == "") {
    Notify.create("por favor ingrese el valor");
  } else if (cantidad.value == "") {
    Notify.create("por favor ingrese la cantidad");
  } else {
    try {
      await useInventario.agregarInvntario({
        descripcion: descripcion.value,
        codigo: codigo.value,
        valor: valor.value,
        cantidad: cantidad.value,
      });
      cerrarAgregarModal();
      listarInventario();
    } catch (error) {
      console.error("Error al agregar inventario:", error);
    }
  }
};

async function editar() {
  try {
    await useInventario.actualizarInvntario(codigo.value, {
      descripcion: descripcion.value,
      valor: valor.value,
      cantidad: cantidad.value,
    });
    cerrarEditarModal();
    listarInventario();
  } catch (error) {
    console.error("Error al editar inventario:", error);
  }
}

const eliminarInventario = async (row) => {
  try {
    await useInventario.EliminarInventario(row._id);
    listarInventario();
  } catch (error) {
    console.error("Error al eliminar inventario:", error);
  }
};

function abrirAgregarModal() {
  agregarModal.value = true;
}

function cerrarAgregarModal() {
  agregarModal.value = false;
}

function abrirEditarModal() {
  editarModal.value = true;
}

function cerrarEditarModal() {
  editarModal.value = false;
}

onMounted(() => {
  listarInventario();
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
  margin-bottom: 150px;
  width: 100%;
}

#rrr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
