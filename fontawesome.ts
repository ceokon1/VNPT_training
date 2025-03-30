// src/fontawesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCalendarDays,
  faCircleQuestion,
  faClock,
  faStar,
  faUserClock
} from "@fortawesome/free-solid-svg-icons";

library.add(faCalendarDays, faCircleQuestion, faClock, faStar, faUserClock);

export default FontAwesomeIcon;
