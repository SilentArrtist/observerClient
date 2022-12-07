import { legacy_createStore as createStore} from "redux";
import { combineReducers } from "redux";
import { menuIconsReducer } from "./reducers/menuIconsReducer";
import { elementsReducer } from "./reducers/elementsReducer";
import { userReducer } from "./reducers/userReducer";
import { deviceReducer } from "./reducers/deviceReducer";
import { settingsReducer } from "./reducers/settingsReducer";
const rootReducer = combineReducers({
    menuIcons:menuIconsReducer,
    elements:elementsReducer,
    user:userReducer,
    devices:deviceReducer,
    settings:settingsReducer,
})

export const store = createStore(rootReducer)