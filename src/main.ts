import "../src/style.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import FontAwesomeIcon from "../fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faClock, faUserClock, faCalendarDays, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'


const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);
app.mount("#app");
library.add(faStar, faClock, faUserClock, faCalendarDays, faCircleQuestion)

app.component('font-awesome-icon', FontAwesomeIcon)