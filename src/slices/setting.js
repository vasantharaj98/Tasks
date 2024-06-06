import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import settingService from "../services/setting.service";

import EventBus from "../utils/EventBus";

export const getstate = createAsyncThunk(
  "api/getstate",
  async (thunkAPI) => {
    try {
      const data = await settingService.getOperatingstate();
      return { statedata: data };
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

export const createstate = createAsyncThunk(
  "api/createstate",
  async (stateData, thunkAPI) => {
    try {
      const data = await settingService.createOperatingstate(stateData);
      return { statedata: data };
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

export const createregion = createAsyncThunk(
  "api/createregion",
  async (stateData, thunkAPI) => {
    try {
      const data = await settingService.createRegion(stateData);
      return { statedata: data };
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


export const getregion = createAsyncThunk(
  "api/getregion",
  async (thunkAPI) => {
    try {
      const data = await settingService.getRegion();
      return { statedata: data };
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

export const createuser = createAsyncThunk(
  "api/createuser",
  async (stateData, thunkAPI) => {
    try {
      const data = await settingService.createUser(stateData);
      return { statedata: data };
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


export const getuser = createAsyncThunk(
  "api/getuser",
  async (thunkAPI) => {
    try {
      const data = await settingService.getUser();
      return { statedata: data };
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

export const updateuser = createAsyncThunk(
  "api/updateuser",
  async ({c_id, formData}, thunkAPI) => {
    try {
      const data = await settingService.updateUser(c_id, formData);
      return { statedata: data };
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

export const deleteuser = createAsyncThunk(
  "api/deleteuser",
  async ({c_id}, thunkAPI) => {
    try {
      const data = await settingService.deleteUser(c_id);
      return { statedata: data };
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
    state: [],
    region: [],
    user:[],
    message: null
}

const settingSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [getstate.fulfilled]: (state, action) => {
    state.state = action.payload.statedata.data && JSON.parse(action.payload.statedata.data?.states)
    state.message = null
    return state;
  },
  [getstate.rejected]: (state, action) => {
    state.state = action.payload.statedata
    return state;
  },
    [createstate.fulfilled]: (state, action) => {
      state.state = JSON.parse(action.payload.statedata.data?.states)
      state.message = 'Operating state created successfully'
      return state;
    },
    [createstate.rejected]: (state, action) => {
      state.state = action.payload.statedata
      return state;
    },
    [createregion.fulfilled]: (state, action) => {
      state.region.push(action.payload.statedata.data)
      state.message = 'Region and Zone created successfully'
    return state;
    },
    [createregion.rejected]: (state, action) => {
      state.region = action.payload.statedata
      return state;
    },
    [getregion.fulfilled]: (state, action) => {
      state.region = action.payload.statedata.data
      state.message = null
      return state;
    },
    [getregion.rejected]: (state, action) => {
      state.error = action.payload.statedata
      return state;
    },
    [createuser.fulfilled]: (state, action) => {
      state.user.push(action.payload.statedata.data)
      state.message = 'User created successfully'
    return state;
    },
    [createuser.rejected]: (state, action) => {
      state.user = action.payload.statedata
      return state;
    },
    [getuser.fulfilled]: (state, action) => {
      state.user = action.payload.statedata.data
      state.message = null
      return state;
    },
    [getuser.rejected]: (state, action) => {
      state.user = action.payload.statedata
      return state;
    },
    [updateuser.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.user = state.user.map((item) =>
          item.user_id === c_id ? action.payload.statedata.data : item
        );
      };
      state.message = "Update User Successfully"
    },
    [deleteuser.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.user = state.user.filter((item) => item.user_id !== c_id);
      };
      state.message = action.payload.statedata.message
    },
  },
});

const { reducer } = settingSlice;
export default reducer;