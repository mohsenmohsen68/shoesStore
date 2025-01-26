import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRequestsFromServer = createAsyncThunk(
  "Requests/getRequestsFromServer",
  async (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewRequest = createAsyncThunk(
  "Requests/createANewRequest",
  async (RequestsBody) => {
    return fetch("/api/request", {
      method: "POST",
      body: JSON.stringify(RequestsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);
export const updateTicket = createAsyncThunk(
  "Requests/updateTicket",
  async (RequestsBody) => {
    return fetch("/api/request", {
      method: "PUT",
      body: JSON.stringify(RequestsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);


const slice = createSlice({
  name: "Requests",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getRequestsFromServer.fulfilled, (state, action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
    });
    builder.addCase(createANewRequest.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
