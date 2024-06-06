import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EventBus from "../utils/EventBus";
import customerService from "../services/customer.service";

export const createcustomer = createAsyncThunk(
  "api/createcustomer",
  async (stateData, thunkAPI) => {
    try {
      const data = await customerService.createNewcustomer(stateData);
      return { customerdata: data };
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

export const getcustomer = createAsyncThunk(
  "api/getcustomer",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getCustomer(id);
      return { customerdata: data };
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

export const updatecustomer = createAsyncThunk(
  "api/updatecustomer",
  async ({c_id, formData}, thunkAPI) => {
    try {
      const data = await customerService.updateCustomer(c_id, formData);
      return { customerdata: data };
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

export const deletecustomer = createAsyncThunk(
  "api/deletecustomer",
  async ({c_id}, thunkAPI) => {
    try {
      const data = await customerService.deleteCustomer(c_id);
      return { customerdata: data };
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

export const createinvoice = createAsyncThunk(
  "api/createinvoice",
  async (stateData, thunkAPI) => {
    try {
      const data = await customerService.createNewInvoice(stateData);
      return { customerdata: data };
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

export const getinvoicebydealer = createAsyncThunk(
  "api/getinvoicebydealer",
  async ( thunkAPI) => {
    try {
      const data = await customerService.getInvoicebyDealer();
      return { customerdata: data };
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

export const getinvoicebyoem = createAsyncThunk(
  "api/getinvoicebyoem",
  async ( thunkAPI) => {
    try {
      const data = await customerService.getInvoicebyOem();
      return { customerdata: data };
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

export const getinvoicebycus = createAsyncThunk(
  "api/getinvoicebycus",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const data = await customerService.getInvoicebyCus(id);
      return { customerdata: data };
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

export const getinvoicebyid = createAsyncThunk(
  "api/getinvoicebyid",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getInvoicebyId(id);
      return { customerdata: data };
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

export const updateinvoicebyid = createAsyncThunk(
  "api/updateinvoicebyid",
  async ({inv_id, formData}, thunkAPI) => {
    try {
      const data = await customerService.updateInvoicebyId(inv_id, formData);
      return { customerdata: data };
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

export const createpayment = createAsyncThunk(
  "api/createpayment",
  async (stateData, thunkAPI) => {
    try {
      const data = await customerService.createNewPayment(stateData);
      return { customerdata: data };
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

export const getpaymentbycus = createAsyncThunk(
  "api/getpaymentbycus",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const data = await customerService.getPaymentbyCus(id);
      return { customerdata: data };
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

export const getpaymentbyid = createAsyncThunk(
  "api/getpaymentbyid",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getPaymentbyId(id);
      return { customerdata: data };
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

export const updatepaymentbyid = createAsyncThunk(
  "api/updatepaymentbyid",
  async ({pay_id, formData}, thunkAPI) => {
    try {
      const data = await customerService.updatePaymentbyId(pay_id, formData);
      return { customerdata: data };
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

export const createservice = createAsyncThunk(
  "api/createservice",
  async (stateData, thunkAPI) => {
    try {
      const data = await customerService.createNewService(stateData);
      return { customerdata: data };
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

export const getservicebycus = createAsyncThunk(
  "api/getservicebycus",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getServicebyCus(id);
      return { customerdata: data };
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

export const getservicebyid = createAsyncThunk(
  "api/getservicebyid",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getServicebyId(id);
      return { customerdata: data };
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

export const updateservicebyid = createAsyncThunk(
  "api/updateservicebyid",
  async ({s_id, formData1}, thunkAPI) => {
    try {
      const data = await customerService.updateServicebyId(s_id, formData1);
      return { customerdata: data };
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

export const createwarranty = createAsyncThunk(
  "api/createwarranty",
  async (stateData, thunkAPI) => {
    try {
      const data = await customerService.createNewWarranty(stateData);
      return { customerdata: data };
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

export const getwarrantybydealer = createAsyncThunk(
  "api/getwarrantybydealer",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getWarrantybyDealer(id);
      return { customerdata: data };
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

export const getwarrantybycus = createAsyncThunk(
  "api/getwarrantybycus",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getWarrantybyCus(id);
      return { customerdata: data };
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

export const getwarrantybyid = createAsyncThunk(
  "api/getwarrantybyid",
  async (id, thunkAPI) => {
    try {
      const data = await customerService.getWarrantybyId(id);
      return { customerdata: data };
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

export const updatewarrantybyidcus = createAsyncThunk(
  "api/updatewarrantybyidcus",
  async ({w_id, formData}, thunkAPI) => {
    try {
      const data = await customerService.updateWarrantybyId(w_id, formData);
      return { customerdata: data };
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
    customers: [],
    invoices: [],
    dealerinvoices: [],
    oeminvoices: [],
    payments:[],
    services:[],
    warrantys:[],
    dealerwarrantys:[],
    payment: "",
    invoice: "",
    service:"",
    warranty:"",
    message: null
}

const customerSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [createcustomer.fulfilled]: (state, action) => {
      state.customers.push(action.payload.customerdata.data)
      state.message = "Create Customer Successfully"
      return state;
    },
    [createcustomer.rejected]: (state, action) => {
      state.customers = action.payload.customerdata
      return state;
    },
    [getcustomer.fulfilled]: (state, action) => {
    state.customers = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getcustomer.rejected]: (state, action) => {
    state.customers = action.payload.customerdata
    return state;
  },
  [updatecustomer.fulfilled]: (state, action) => {
    const {
      arg: { c_id },
    } = action.meta;
    if (c_id) {
      state.customers = state.customers.map((item) =>
        item.id === c_id ? action.payload.customerdata.data : item
      );
    };
    state.message = "Update Customer Successfully"
  },
  [updatecustomer.rejected]: (state, action) => {
    state.message = action.payload.customerdata.message
  },
  [deletecustomer.fulfilled]: (state, action) => {
    const {
      arg: { c_id },
    } = action.meta;
    if (c_id) {
      state.customers = state.customers.filter((item) => item.id !== c_id);
    };
    state.message = action.payload.customerdata.message
  },
  [deletecustomer.rejected]: (state, action) => {
    state.message = action.payload.customerdata.message
  },
  [createinvoice.fulfilled]: (state, action) => {
    state.invoices.push(action.payload.customerdata.data)
    state.message = "Invoice Created Successfully"
    return state;
  },
  [createinvoice.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [getinvoicebydealer.fulfilled]: (state, action) => {
    state.dealerinvoices = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getinvoicebyoem.fulfilled]: (state, action) => {
    state.oeminvoices = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getinvoicebycus.fulfilled]: (state, action) => {
    state.invoices = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getinvoicebycus.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
    [getinvoicebyid.fulfilled]: (state, action) => {
    state.invoice = action.payload.customerdata.data
    return state;
  },
  [getinvoicebyid.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [updateinvoicebyid.fulfilled]: (state, action) => {
    const {
      arg: { inv_id },
    } = action.meta;
    if (inv_id) {
      state.invoices = state.invoices.map((item) =>
        item.invoice_id === inv_id ? action.payload.customerdata.data : item
      );
    };
    state.message = "Update Invoice Successfully"
  },
  [updateinvoicebyid.rejected]: (state, action) => {
    state.message = action.payload.customerdata.message
  },
  [createpayment.fulfilled]: (state, action) => {
    state.payments.push(action.payload.customerdata.data)
    state.message = "Payment Created Successfully"
    return state;
  },
  [createpayment.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [getpaymentbycus.fulfilled]: (state, action) => {
    state.payments = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getpaymentbycus.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [getpaymentbyid.fulfilled]: (state, action) => {
    state.payment = action.payload.customerdata.data
    return state;
  },
  [getpaymentbyid.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [updatepaymentbyid.fulfilled]: (state, action) => {
    const {
      arg: { pay_id },
    } = action.meta;
    if (pay_id) {
      state.payments = state.payments.map((item) =>
        item.payment_id === pay_id ? action.payload.customerdata.data : item
      );
    };
    state.message = "Update Payment Successfully"
  },
  [createservice.fulfilled]: (state, action) => {
    state.services.push(action.payload.customerdata.data)
    state.message = "Service Created Successfully"
    return state;
  },
  [createservice.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [getservicebycus.fulfilled]: (state, action) => {
    state.services = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getservicebycus.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [getservicebyid.fulfilled]: (state, action) => {
    state.service = action.payload.customerdata.data
    return state;
  },
  [getservicebyid.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [updateservicebyid.fulfilled]: (state, action) => {
    const {
      arg: { s_id },
    } = action.meta;
    if (s_id) {
      state.services = state.services.map((item) =>
        item.service_id === s_id ? action.payload.customerdata.data : item
      );
      state.service = action.payload.customerdata.data 
    };
  },
  [createwarranty.fulfilled]: (state, action) => {
    state.warrantys.push(action.payload.customerdata.data)
    state.message = "Warranty Created Successfully"
    return state;
  },
  [createwarranty.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [getwarrantybydealer.fulfilled]: (state, action) => {
    state.dealerwarrantys = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getwarrantybycus.fulfilled]: (state, action) => {
    state.warrantys = action.payload.customerdata.data
    state.message = null
    return state;
  },
  [getwarrantybycus.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [getwarrantybyid.fulfilled]: (state, action) => {
    state.warranty = action.payload.customerdata.data[0]
    return state;
  },
  [getwarrantybyid.rejected]: (state, action) => {
    state.message = action.payload.message
    return state;
  },
  [updatewarrantybyidcus.fulfilled]: (state, action) => {
    const {
      arg: { w_id },
    } = action.meta;
    if (w_id) {
      state.warrantys = state.warrantys.map((item) =>
        item.warranty_id === w_id ? action.payload.customerdata.data : item
      );
      state.warranty = action.payload.customerdata.data 
    };
  },
  [updatewarrantybyidcus.rejected]: (state, action) => {
    state.message = action.payload.customerdata.message
  },
  },
});

const { reducer } = customerSlice;
export default reducer;