import { combineReducers} from "redux";
import { configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./AuthState";


//Union of all the reducers
const reducers = combineReducers({AuthState : authReducer});
//retention and externalization all the reducers in store variable.
export const store = configureStore({reducer : reducers});

//export const store = createStore(vacationReducer);