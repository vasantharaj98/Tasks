import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import dealerService from "../services/dealer.service";

import EventBus from "../utils/EventBus";

export const createdealer = createAsyncThunk(
  "api/createdealer",
  async (stateData, thunkAPI) => {
    try {
      const data = await dealerService.createNewdealer(stateData);
      return { dealerdata: data };
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

export const getdealer = createAsyncThunk(
  "api/getdealer",
  async (thunkAPI) => {
    try {
      const data = await dealerService.getDealer();
      return { dealerdata: data };
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

export const getdealerbyid = createAsyncThunk(
  "api/getdealerbyid",
  async (dealer_id, thunkAPI) => {
    try {
      const data = await dealerService.getDealerbyid(dealer_id);
      return { dealerdata: data };
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

export const updatedealer = createAsyncThunk(
  "api/updatedealer",
  async ({dealer_id, formData}, thunkAPI) => {
    try {
      const data = await dealerService.updateDealer(dealer_id, formData);
      return { dealerdata: data };
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

export const deletedealer = createAsyncThunk(
  "api/deletedealer",
  async ({dealer_id}, thunkAPI) => {
    try {
      const data = await dealerService.deleteDealer(dealer_id);
      return { dealerdata: data };
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
    dealers: [],
    dealer: null,
    message: null
}

const dealerSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [createdealer.fulfilled]: (state, action) => {
      state.dealers.push(action.payload.dealerdata.data)
      state.message = "Dealer Created Successfully"
      return state;
    },
    [createdealer.rejected]: (state, action) => {
      state.dealers = action.payload.dealerdata
      return state;
    },
    [getdealer.fulfilled]: (state, action) => {
    state.dealers = action.payload.dealerdata.data
    state.message = null
    return state;
  },
  [getdealer.rejected]: (state, action) => {
    state.dealers = action.payload.dealerdata
    return state;
  },
  [getdealerbyid.fulfilled]: (state, action) => {
    state.dealer = action.payload.dealerdata.data[0]
    return state;
  },
  [getdealerbyid.rejected]: (state, action) => {
    state.dealer = action.payload.dealerdata
    return state;
  },
  [updatedealer.fulfilled]: (state, action) => {
    const {
      arg: { dealer_id },
    } = action.meta;
    if (dealer_id) {
      state.dealers = state.dealers.map((item) =>
        item.dealer_id === dealer_id ? action.payload.dealerdata.data : item
      );
    };
    state.message = "Dealer Updated Successfully"
  },
  [updatedealer.rejected]: (state, action) => {
    state.message = action.payload.dealerdata.message
  },
  [deletedealer.fulfilled]: (state, action) => {
    const {
      arg: { dealer_id },
    } = action.meta;
    if (dealer_id) {
      state.dealers = state.dealers.filter((item) => item.dealer_id !== dealer_id);
    };
    state.message = action.payload.dealerdata.message
  },
  [deletedealer.rejected]: (state, action) => {
    state.message = action.payload.dealerdata.message
  },
  },
});

const { reducer } = dealerSlice;
export default reducer;