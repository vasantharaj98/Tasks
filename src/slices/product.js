import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EventBus from "../utils/EventBus";
import productService from "../services/product.service";

export const createproduct = createAsyncThunk(
  "api/createproduct",
  async (stateData, thunkAPI) => {
    try {
      const data = await productService.createProduct(stateData);
      return { productdata: data };
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

export const createvariant = createAsyncThunk(
  "api/createvariant",
  async (stateData, thunkAPI) => {
    try {
      const data = await productService.createVariant(stateData);
      return { productdata: data };
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

export const createspare = createAsyncThunk(
  "api/createspare",
  async (stateData, thunkAPI) => {
    try {
      const data = await productService.createSpare(stateData);
      return { productdata: data };
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

export const createaccessory = createAsyncThunk(
  "api/createaccessory",
  async (stateData, thunkAPI) => {
    try {
      const data = await productService.createAccessory(stateData);
      return { productdata: data };
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

export const getproduct = createAsyncThunk(
  "api/getproduct",
  async (thunkAPI) => {
    try {
      const data = await productService.getProduct();
      return { productdata: data };
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

export const getspare = createAsyncThunk(
  "api/getspare",
  async (thunkAPI) => {
    try {
      const data = await productService.getSpares();
      return { productdata: data };
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

export const updateproduct = createAsyncThunk(
  "api/updateproduct",
  async ({vehicle_id, formData}, thunkAPI) => {
    try {
      const data = await productService.UpdateProductbyid(vehicle_id, formData);
      return { productdata: data };
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

export const updatevarint = createAsyncThunk(
  "api/updatevariant",
  async ({variant_id, formData}, thunkAPI) => {
    try {
      const data = await productService.UpdateVariantbyid(variant_id, formData);
      return { productdata: data };
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

export const deletevehicle = createAsyncThunk(
  "api/deletevhicle",
  async ({vehicle_id, formData}, thunkAPI) => {
    try {
      const data = await productService.DeleteVehicle(vehicle_id, formData);
      return { productdata: data };
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

export const deletevarintbyve = createAsyncThunk(
  "api/deletevariantbtve",
  async ({vehicle_id, formData}, thunkAPI) => {
    try {
      const data = await productService.DeleteVariant(vehicle_id, formData);
      return { productdata: data };
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

export const deletevarint = createAsyncThunk(
  "api/deletevariant",
  async ({variant_id, formData}, thunkAPI) => {
    try {
      const data = await productService.DeleteVariantbyid(variant_id, formData);
      return { productdata: data };
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

export const updatespare = createAsyncThunk(
  "api/updatespare",
  async ({spare_id, formData}, thunkAPI) => {
    try {
      const data = await productService.UpdateSparesbyid(spare_id, formData);
      return { productdata: data };
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

export const getaccessory = createAsyncThunk(
  "api/getaccessory",
  async (thunkAPI) => {
    try {
      const data = await productService.getAccessories();
      return { productdata: data };
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

export const updateaccess = createAsyncThunk(
  "api/updateaccess",
  async ({access_id, formData}, thunkAPI) => {
    try {
      const data = await productService.UpdateAccessbyid(access_id, formData);
      return { productdata: data };
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

const productSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [createproduct.fulfilled]: (state, action) => {
      state.vehicles.push(action.payload.productdata.data)
      state.message = "Vehicle Created Succcessfully"
      return state;
    },
    [createproduct.rejected]: (state, action) => {
      state.vehicles = action.payload.productdata
      return state;
    },
    [createvariant.fulfilled]: (state, action) => {
      console.log("vasanth", action.payload.productdata.data)
    return state;
  },
[createvariant.rejected]: (state, action) => {
  return state;
},
[createspare.fulfilled]: (state, action) => {
state.spares.push(action.payload.productdata.data)
state.message = "Spare Created Succcessfully"
return state;
},
[createaccessory.rejected]: (state, action) => {
state.accessories = action.payload.productdata
return state;
},
[createaccessory.fulfilled]: (state, action) => {
state.accessories.push(action.payload.productdata.data)
state.message = "Accessory Created Succcessfully"
return state;
},
[createspare.rejected]: (state, action) => {
state.spares = action.payload.productdata
return state;
},
    [getproduct.fulfilled]: (state, action) => {
    state.vehicles = action.payload.productdata.data
    state.message = null
    return state;
  },
  [getspare.fulfilled]: (state, action) => {
    state.spares = action.payload.productdata.data
    state.message = null
    return state;
  },
  [getspare.rejected]: (state, action) => {
    state.spares = action.payload.productdata
    state.message = null
    return state;
  },
  [updateproduct.fulfilled]: (state, action) => {
    const {
      arg: { product_id },
    } = action.meta;
    if (product_id) {
      state.vehicles = state.vehicles.map((item) =>
        item.id === product_id ? action.payload.productdata.data : item
      );
    };
    state.message = "Product Updated Succcessfully"
  },
  [updatespare.fulfilled]: (state, action) => {
    const {
      arg: { spare_id },
    } = action.meta;
    if (spare_id) {
      state.spares = state.spares.map((item) =>
        item.id === spare_id ? action.payload.productdata.data : item
      );
    };
    state.message = "Spare Updated Succcessfully"
  },
  [updatespare.rejected]: (state, action) => {
    state.message = action.payload.productdata.message
  },
  [getaccessory.fulfilled]: (state, action) => {
    state.accessories = action.payload.productdata.data
    state.message = null
    return state;
  },
  [getaccessory.rejected]: (state, action) => {
    state.accessories = action.payload.productdata
    return state;
  },
  [updateaccess.fulfilled]: (state, action) => {
    const {
      arg: { access_id },
    } = action.meta;
    if (access_id) {
      state.accessories = state.accessories.map((item) =>
        item.id === access_id ? action.payload.productdata.data : item
      );
    };
    state.message = "Accessory Updated Succcessfully"
  },
  [updateaccess.rejected]: (state, action) => {
    state.message = action.payload.productdata.message
  },
  },
});

const { reducer } = productSlice;
export default reducer;