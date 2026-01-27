import { createApp } from 'vue'
import App from './App.vue'
import router from './Router/index'

import VueMaterial3 from '@gladesinger/vue3-material'
import '@gladesinger/vue3-material/dist/style.css';
import '@gladesinger/vue3-material/dist/theme/default.css';
import 'vue-material-design-icons/styles.css';
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


const app = createApp(App);

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VueMaterial3)


app.mount('#app')
