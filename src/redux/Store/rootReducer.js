import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import todoReducer from "../Slices/TodoSlice";

const rootPersistConfig = {
  key: "root",
  version: 3,
  storage,
  keyPrefix: "redux-",
  whitelist: ['todo'], // todo: add whatever you need to be persisted between refreshes
};

const rootReducer = combineReducers({
  todo: todoReducer,
});

export { rootPersistConfig, rootReducer };
