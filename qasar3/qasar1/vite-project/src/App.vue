<template>
  <q-layout view="hhh LpR fFf">
    <q-header reveal elevated class="bg-custom-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
       
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      style="background-color: #344860"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <div class="drawer-menu">
        <router-link class="link" to="/compras">
          <q-icon name="shopping_cart" /> Compras
        </router-link>
        <router-link class="link" to="/ventas">
          <q-icon name="monetization_on" /> Inventario
        </router-link>
        <router-link class="link" to="/productos">
          <q-icon name="store" /> Productos
        </router-link>
        <router-link class="link" to="/maquinaria">
          <q-icon name="build" /> Maquinaria
        </router-link>
        <router-link class="link" to="/ingreso">
          <q-icon name="assignment" /> Usuario
        </router-link>
        <router-link class="link" to="/mantenimiento">
          <q-icon name="settings" /> Mantenimiento
        </router-link>
        <router-link class="link" to="/cliente">
          <q-icon name="people" /> Clientes
        </router-link>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped>
.bg-custom-primary {
  background-color: #344860;
}

.drawer-menu {
  padding-top: 50px; /* Alinea el menú con el contenido */
}

.link {
  display: flex;
  align-items: center;
  padding: 10px 20px; /* Aumenta el espacio alrededor del texto */
  color: #fff; /* Cambia el color del texto */
  text-decoration: none;
  font-size: 18px; /* Aumenta el tamaño del texto */
  font-weight: bold; /* Hace que el texto sea más grueso */
}

.link q-icon {
  margin-right: 10px; /* Espacio entre el icono y el texto */
}

.link:hover {
  background-color: #2c3a4e; /* Cambia el color de fondo al pasar el ratón */
}
</style>
