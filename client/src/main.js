import { createApp } from "vue";
import "./index.css";
import { Icon } from '@iconify/vue';
import Toast from "vue-toastification";
import "flyonui/flyonui";
import App from "./App.vue";
import Swal from 'sweetalert2'

import router from "./router/router.js";
import "vue-toastification/dist/index.css";



const app = createApp(App);
    app.use(Toast, {
        transition: "Vue-Toastification__bounce",
        maxToasts: 20,
        newestOnTop: true
    });
    app.use(router);
    app.mount("#app");
