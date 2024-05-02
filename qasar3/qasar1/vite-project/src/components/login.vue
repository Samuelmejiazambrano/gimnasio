<template>
  <div class="q-pa-md" id="login">
    <div
      class="q-gutter-y-md column"
      id="cont"
      style="
        width: 400px;
        padding: 30px;
        border-radius: 10px;
        background-color: #f3f3f3;
        box-shadow: 2px 10px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <h3 style="margin-bottom: 20px; text-align: center">Iniciar sesión</h3>
      <q-input
        class="input"
        v-model="username"
        label="Usuario"
        placeholder="Introduce tu nombre de usuario"
        dense
        outlined
      />
      <q-input
        class="input"
        v-model="password"
        label="Contraseña"
        type="password"
        placeholder="Introduce tu contraseña"
        dense
        outlined
      />
      <q-btn
        style="width: 80%"
        @click="login"
        color="primary"
        label="Iniciar sesión"
        dense
      />
      <p>
        ya tienes cuenta
        <router-link class="link" to="/registro"> registrate
        </router-link>
      </p>
    </div>
  </div>
</template>

<script></script>

<style scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
#login h3 {
  font-size: 2.1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
}
.input {
  width: 100%;
  margin-bottom: 25px;
}

#cont {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 500px;
}
</style>







