import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EventBus from "../utils/EventBus";
import oemService from "../services/oem.service";

export const getoembyid = createAsyncThunk(
  "api/getoembyid",
  async (thunkAPI) => {
    try {
      const data = await oemService.getOEMbyid();
      return { oemdata: data };
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

export const updateoem = createAsyncThunk(
  "api/updateoem",
  async ({oem_id, formData}, thunkAPI) => {
    try {
      const data = await oemService.updateOEM(oem_id, formData);
      return { oemdata: data };
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
    oem: null,
    message:null
}

const oemSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
  [getoembyid.rejected]: (state, action) => {
    state.oem = action.payload.oemdata
    state.message = action.payload.oemdata.message
    return state;
  },
  [getoembyid.fulfilled]: (state, action) => {
    state.oem = action.payload.oemdata.data[0]
    return state;
  },
  [updateoem.fulfilled]: (state, action) => {
    const {
      arg: { oem_id },
    } = action.meta;
    if (oem_id) {
      state.oem = action.payload.oemdata.data
    };
    state.message = action.payload.oemdata.message
  },
  [updateoem.rejected]: (state, action) => {
    state.message = action.payload.oemdata.message
  },
  },
});

const { reducer } = oemSlice;
export default reducer;