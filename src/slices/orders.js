import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EventBus from "../utils/EventBus";
import ordersService from "../services/orders.service";

// export const createpurchase = createAsyncThunk(
//   "api/createpurchase",
//   async (stateData, thunkAPI) => {
//     try {
//       const data = await purchaseService.createPurchase(stateData);
//       return { purchasedata: data };
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

export const getorders = createAsyncThunk(
  "api/getorders",
  async (thunkAPI) => {
    try {
      const data = await ordersService.getOrders();
      return { orderdata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getpurchasebydealerid = createAsyncThunk(
  "api/getpurchasebydealerid",
  async (d_id, thunkAPI) => {
    try {
      const data = await ordersService.getPurchasebyDealerID(d_id);
      return { orderdata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getpurchasebyid = createAsyncThunk(
  "api/getpurchasebyid",
  async (p_id, thunkAPI) => {
    try {
      const data = await ordersService.getPurchasebyID(p_id);
      return { orderdata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatepurchasebyid = createAsyncThunk(
  "api/updatepurchasebyid",
  async ({p_id, formData}, thunkAPI) => {
    try {
      const data = await ordersService.updatePurchasebyID(p_id, formData);
      return { orderdata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatepurchasebysecret = createAsyncThunk(
  "api/updatepurchasebysecret",
  async ({p_id, formData}, thunkAPI) => {
    try {
      const data = await ordersService.updatePurchasebySecret(p_id, formData);
      return { orderdata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState ={
    purchase:[],
    orders: [],
    detail: null,
    message: ""
}

const purchaseSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [getorders.fulfilled]: (state, action) => {
    state.orders = action.payload.orderdata.data
    return state;
  },
  [getpurchasebydealerid.fulfilled]: (state, action) => {
    state.purchase = action.payload.orderdata.data
    return state;
  },
  [getorders.rejected]: (state, action) => {
    state.orders = action.payload.orderdata
    return state;
  },
  [getpurchasebyid.fulfilled]: (state, action) => {
    state.detail = action.payload.orderdata.data[0]
    return state;
  },
  [getpurchasebyid.rejected]: (state, action) => {
    state.detail = action.payload.orderdata
    return state;
  },
  [updatepurchasebyid.fulfilled]: (state, action) => {
    const {
      arg: { p_id },
    } = action.meta;
    if (p_id) {
      state.orders = state.orders.map((item) =>
        item.purchase_id === p_id ? action.payload.orderdata.data : item
      );
      state.detail = action.payload.orderdata.data 
    };
    state.message = action.payload.orderdata.message
  },
  [updatepurchasebyid.rejected]: (state, action) => {
    state.message = action.payload.orderdata.message
  },
  [updatepurchasebysecret.fulfilled]: (state, action) => {
    const {
      arg: { p_id },
    } = action.meta;
    if (p_id) {
      state.orders = state.orders.map((item) =>
        item.purchase_id === p_id ? action.payload.orderdata.data : item
      );
      state.detail = action.payload.orderdata.data 
    };
    state.message = action.payload.orderdata.message
  },
  [updatepurchasebysecret.rejected]: (state, action) => {
    state.message = action.payload.orderdata.message
  },
  },
});

const { reducer } = purchaseSlice;
export default reducer;