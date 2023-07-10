import { createStore, combineReducers } from 'redux';
import reducer from './redurce';
import tarefasReducer from "./tarefasSlice";

const rootReducer = combineReducers({
  reducer,
  tarefas: tarefasReducer,
});

const store = createStore(rootReducer);


export default store;