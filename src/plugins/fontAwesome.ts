import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faHouse,
  faMagnifyingGlass,
  faXmark,
  faBars,
  faDownload,
  faPlus,
  faMinus,
  faCircleUser,
  faCircleInfo,
  faMoneyCheckDollar,
  faBell,
  faHeart,
  faList,
  faBoxesStacked,
  faStar,
  faPeopleArrows,
  faGrip,
  faEnvelope,
  faCheck,
  faUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarDays,
  faCircleXmark,
  faImage,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

const initFaLibrary = () => {
  library.add(
    faHouse,
    faMagnifyingGlass,
    faCircleXmark,
    faImage,
    faXmark,
    faBars,
    faDownload,
    faPlus,
    faMinus,
    faPenToSquare,
    faCircleUser,
    faList,
    faCircleInfo,
    faPeopleArrows,
    faMoneyCheckDollar,
    faBell,
    faCalendarDays,
    faBoxesStacked,
    faHeart,
    faStar,
    faEnvelope,
    faCheck,
    faGrip,
    faUser,
    faLocationDot
  );
};

export { initFaLibrary, FontAwesomeIcon };
