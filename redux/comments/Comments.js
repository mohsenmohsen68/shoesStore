import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCommentsFromServer = createAsyncThunk(
  "Comments/getCommentsFromServer",
  async (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewComment = createAsyncThunk(
  "Comments/createANewComment",
  async (CommentsBody) => {
    return fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify(CommentsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateComments = createAsyncThunk(
  "Comments/updateComments",
  async (CommentsBody) => {
    return fetch("api/comment", {
      method: "PUT",
      body: JSON.stringify(CommentsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);
export const deleteComments = createAsyncThunk(
  "Comments/deleteComments",
  async (CommentsBody) => {
    return fetch("api/comment", {
      method: "DELETE",
      body: JSON.stringify(CommentsBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "Comments",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCommentsFromServer.fulfilled, (state, action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
    });
    builder.addCase(createANewComment.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateComments.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(deleteComments.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
