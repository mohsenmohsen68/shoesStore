import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsFromServer = createAsyncThunk(
  "Products/getProductsFromServer",
  async () => {
    return fetch("/api/product")
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewProduct = createAsyncThunk(
  "Products/createANewProduct",
  async (ProductsBody) => {
    return fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(ProductsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateProducts = createAsyncThunk(
  "Products/updateProducts",
  async (ProductsBody) => {
    return fetch("/api/product", {
      method: "PUT",
      body: JSON.stringify(ProductsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);
export const deleteProducts = createAsyncThunk(
  "Products/deleteProducts",
  async (ProductsBody) => {
    return fetch("/api/product", {
      method: "DELETE",
      body: JSON.stringify(ProductsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "Products",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProductsFromServer.fulfilled, (state, action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
    });
    builder.addCase(createANewProduct.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateProducts.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
