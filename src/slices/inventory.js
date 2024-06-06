import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EventBus from "../utils/EventBus";
import inventoryService from "../services/inventory.service";

export const createproductstock = createAsyncThunk(
  "api/createproductstock",
  async (stateData, thunkAPI) => {
    try {
      const data = await inventoryService.createProductStock(stateData);
      return { inventorydata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createsparestock = createAsyncThunk(
  "api/createsparestock",
  async (stateData, thunkAPI) => {
    try {
      const data = await inventoryService.createSpareStock(stateData);
      return { inventorydata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createaccessorystock = createAsyncThunk(
  "api/createaccessorystock",
  async (stateData, thunkAPI) => {
    try {
      const data = await inventoryService.createAccessoryStock(stateData);
      return { inventorydata: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getproductstock = createAsyncThunk(
  "api/getproductstock",
  async (thunkAPI) => {
    try {
      const data = await inventoryService.getProductStock();
      return { inventorydata: data };
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

export const getsparestock = createAsyncThunk(
  "api/getsparestock",
  async (thunkAPI) => {
    try {
      const data = await inventoryService.getSpareStock();
      return { inventorydata: data };
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

export const getaccessorystock = createAsyncThunk(
  "api/getaccessorystock",
  async (thunkAPI) => {
    try {
      const data = await inventoryService.getAccessoriesStock();
      return { inventorydata: data };
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
    vehicles: [],
    spares:[],
    accessories:[],
    message: null
}

const inventorySlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [createproductstock.fulfilled]: (state, action) => {
      state.vehicles.push(action.payload.inventorydata.data)
      state.message = "Vehicle Stock Added Successfully"
      return state;
    },
    [createproductstock.rejected]: (state, action) => {
      state.vehicles = action.payload.inventorydata
      return state;
    },
    [createsparestock.fulfilled]: (state, action) => {
      state.spares.push(action.payload.inventorydata.data)
      state.message = "Spare Stock Added Successfully"
      return state;
    },
    [createsparestock.rejected]: (state, action) => {
      state.spares = action.payload.inventorydata
      return state;
    },
    [createaccessorystock.fulfilled]: (state, action) => {
      state.accessories.push(action.payload.inventorydata.data)
      state.message = "Accessory Stock Added Successfully"
      return state;
    },
    [createaccessorystock.rejected]: (state, action) => {
      state.accessories = action.payload.inventorydata
      return state;
    },
    [getproductstock.fulfilled]: (state, action) => {
      state.vehicles = action.payload.inventorydata.data
      state.message = null
      return state;
    },
    [getproductstock.rejected]: (state, action) => {
      state.vehicles = action.payload.inventorydata
      return state;
    },
    [getsparestock.fulfilled]: (state, action) => {
      state.spares = action.payload.inventorydata.data
      state.message = null
      return state;
    },
    [getsparestock.rejected]: (state, action) => {
      state.spares = action.payload.inventorydata
      return state;
    },
    [getaccessorystock.fulfilled]: (state, action) => {
      state.accessories = action.payload.inventorydata.data
      state.message = null
      return state;
    },
    [getaccessorystock.rejected]: (state, action) => {
      state.accessories = action.payload.inventorydata
      return state;
    }
  },
});

const { reducer } = inventorySlice;
export default reducer;