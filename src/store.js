import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import settingReducer from "./slices/setting";
import dealerReducer from "./slices/dealer";
import productReducer from "./slices/product";
import inventoryReducer from "./slices/inventory";
import challanReducer from "./slices/challan";
import orderReducer from "./slices/orders";
import warrantyReducer from "./slices/warranty";
import oemReducer from "./slices/oem";
import  customerReducer from "./slices/customer";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  setting: settingReducer,
  dealer: dealerReducer,
  product: productReducer,
  inventory: inventoryReducer,
  challan: challanReducer,
  order: orderReducer,
  warranty: warrantyReducer,
  oem: oemReducer,
  customer: customerReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store;