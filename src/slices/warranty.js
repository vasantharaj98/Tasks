import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EventBus from "../utils/EventBus";
import warrantyService from "../services/warranty.service copy";

export const getwarranty = createAsyncThunk(
  "api/getwarranty",
  async (thunkAPI) => {
    try {
      const data = await warrantyService.getWarranty();
      return { warrantydata: data };
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

export const getwarrantybyidoem = createAsyncThunk(
  "api/getwarrantybyidoem",
  async (id, thunkAPI) => {
    try {
      const data = await warrantyService.getWarrantybyId(id);
      return { warrantydata: data };
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

export const updatewarrantybyid = createAsyncThunk(
  "api/updatewarrantybyid",
  async ({w_id, formData}, thunkAPI) => {
    try {
      const data = await warrantyService.updateWarrantybyId(w_id, formData);
      return { warrantydata: data };
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
    warranty: [],
    detail: null,
    message: ""
}

const warrantySlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [getwarranty.fulfilled]: (state, action) => {
    state.warranty = action.payload.warrantydata.data
    state.message = null
    return state;
  },
  [getwarranty.rejected]: (state, action) => {
    state.warranty = action.payload.warrantydata
    state.message = action.payload.message
    return state;
  },
  [getwarrantybyidoem.fulfilled]: (state, action) => {
    state.detail = action.payload.warrantydata.data[0]
    state.message = null
    return state;
  },
  [getwarrantybyidoem.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [updatewarrantybyid.fulfilled]: (state, action) => {
    const {
      arg: { w_id },
    } = action.meta;
    if (w_id) {
      state.warranty = state.warranty.map((item) =>
        item.warranty_id === w_id ? action.payload.warrantydata.data : item
      );
      state.detail = action.payload.warrantydata.data 
    };
    state.message = action.payload.warrantydata.message
  },
  [updatewarrantybyid.rejected]: (state, action) => {
    state.message = action.payload.warrantydata.message
  },
  },
});

const { reducer } = warrantySlice;
export default reducer;