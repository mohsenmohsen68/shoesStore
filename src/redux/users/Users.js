import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsersFromServer = createAsyncThunk(
  "users/getUsersFromServer",
  async (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewUser = createAsyncThunk(
  "users/createANewUser",
  async (userBody) => {
    return fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async (userBody) => {
    return fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const logOutUser = createAsyncThunk("users/logOutUser", async () => {
  return fetch("/api/auth/signout")
    .then((res) => res.json())
    .then((data) => data);
});
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userBody) => {
    return fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);
export const me = createAsyncThunk("users/me", async () => {
  return fetch("/api/auth/me")
    .then((res) => res.json())
    .then((data) => data);
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (userBody) => {
    console.log("nnnn : ", userBody);
    return fetch("./../api/auth/signup", {
      method: "PUT",
      body: JSON.stringify(userBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "users",
  initialState: {isUserLogged:false},
  reducers: {
    userLogesIn:(state,action)=>{
      return {isUserLogged:true}
    },
    userLogesOut:(state,action)=>{
      return {isUserLogged:false}
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getUsersFromServer.fulfilled, (state, action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
      // state.concat(...action.payload.data);
    });
    builder.addCase(createANewUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(me.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
export const {userLogesOut, userLogesIn} = slice.actions;
