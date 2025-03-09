import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createANewFavorite = createAsyncThunk(
  "Favorites/createANewFavorite",
  async (FavoriteBody) => {
    return fetch("/api/favorite", {
      method: "POST",
      body: JSON.stringify(FavoriteBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);


export const deleteFavorite = createAsyncThunk(
  "Favorites/deleteFavorite",
  async (deleteBody) => {
    return fetch("/api/favorite", {
      method: "DELETE",
      body: JSON.stringify(deleteBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);
export const getUserFavorites = createAsyncThunk(
  "Favorites/getUserFavorites",
  async (userID) => {
    return fetch(`/api/favorite?userID=${userID}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "Favorites",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createANewFavorite.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(getUserFavorites.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
