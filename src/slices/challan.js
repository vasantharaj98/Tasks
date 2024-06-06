import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import dealerService from "../services/dealer.service";

import EventBus from "../utils/EventBus";
import challanService from "../services/challan.service";

export const createchallan = createAsyncThunk(
  "api/createchallan",
  async (stateData, thunkAPI) => {
    try {
      const data = await challanService.createNewChallan(stateData);
      return { challandata: data };
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

export const getchallan = createAsyncThunk(
  "api/getchallan",
  async (thunkAPI) => {
    try {
      const data = await challanService.getChallan();
      return { challandata: data };
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

export const updatechallan = createAsyncThunk(
  "api/updatechallan",
  async ({c_id, formData}, thunkAPI) => {
    try {
      const data = await challanService.updateChallan(c_id, formData);
      return { challandata: data };
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

export const deletechallan = createAsyncThunk(
  "api/deletechallan",
  async ({c_id}, thunkAPI) => {
    try {
      const data = await challanService.deleteChallan(c_id);
      return { challandata: data };
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

export const getchallanbyid = createAsyncThunk(
  "api/getchallanbyid",
  async (c_id, thunkAPI) => {
    try {
      const data = await challanService.getChallanbyId(c_id);
      return { challandata: data };
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
    challan: [],
    getChallan: "",
}

const challanSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [createchallan.fulfilled]: (state, action) => {
      console.log("vasanth", action.payload)
      state.challan.push(action.payload.challandata.data)
      return state;
    },
    [createchallan.rejected]: (state, action) => {
      state.challan = action.payload.challandata
      return state;
    },
    [getchallan.fulfilled]: (state, action) => {
    state.challan = action.payload.challandata.data !== null ? action.payload.challandata.data : []
    return state;
  },
  [getchallan.rejected]: (state, action) => {
    state.dealers = action.payload.challandata
    return state;
  },
  [updatechallan.fulfilled]: (state, action) => {
    const {
      arg: { c_id },
    } = action.meta;
    if (c_id) {
      state.challan = state.challan.map((item) =>
        item.delivery_challan === c_id ? action.payload.challandata.data : item
      );
    };
  },
  [deletechallan.fulfilled]: (state, action) => {
    const {
      arg: { c_id },
    } = action.meta;
    if (c_id) {
      state.challan = state.challan.filter((item) => item.delivery_challan !== c_id);
    };
  },
  [getchallanbyid.fulfilled]: (state, action) => {
    state.getChallan = action.payload.challandata.data
    return state;
  },
  },
});

const { reducer } = challanSlice;
export default reducer;