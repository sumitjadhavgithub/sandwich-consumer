import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import reducers from "../reducers/index";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["authReducer", "questionReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
};
  

  