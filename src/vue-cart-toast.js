import { createApp } from "vue";
import CartToast from "./CartToast.vue";

const mount = document.getElementById("vue-cart-toast");
if (mount) createApp(CartToast).mount(mount);
