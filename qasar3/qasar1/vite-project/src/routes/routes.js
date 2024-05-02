import Compras from "../components/compras.vue"
import Ventas from "../components/Inventario.vue"
import Productos from "../components/productos.vue"
import Ingreso from "../components/ingreso.vue"
import Maquinaria from "../components/maquinaria.vue"
import Cliente  from "../components/cliente.vue"
import Mantenimiento from "../components/mantenimiento.vue"
import Login from "../components/login.vue"
import Registro from "../components/registro.vue"
import { createRouter,createWebHashHistory } from "vue-router"


const routes=[

    { path:"/", component:Login},
    { path:"/registro", component:Registro},
    { path:"/compras", component:Compras},
    { path:"/ventas", component:Ventas},
    { path:"/cliente", component:Cliente},
    { path:"/mantenimiento", component:Mantenimiento},
    { path:"/ingreso", component:Ingreso},
    { path:"/maquinaria", component:Maquinaria},
    { path:"/productos", component:Productos}
]
export const router=createRouter({
     history:createWebHashHistory(),
     routes
})