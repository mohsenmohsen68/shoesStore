import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getArticlesFromServer = createAsyncThunk(
  "Articles/getArticlesFromServer",
  async () => {
    return fetch("/api/article")
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const createANewArticle = createAsyncThunk(
  "Articles/createANewArticle",
  async (articlesBody) => {
    return fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify(articlesBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

export const updateArticles = createAsyncThunk(
  "Articles/updateArticles",
  async (articleBody) => {
    return fetch("/api/articles", {
      method: "PUT",
      body: JSON.stringify(articleBody),
      headers: {
        Content_Type: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);
export const deleteArticles = createAsyncThunk(
  "Articles/deleteArticles",
  async (ArticleID) => {
    console.log("article id : ", ArticleID)
    return fetch(`/api/articles?articleID=${ArticleID}`, {
      method: "DELETE",
      // body: JSON.stringify(ArticleID),
      // headers: {
      //   Content_Type: "application/json"
      // }
    })
      .then((res) => res.json())
      .then((data) => data);
  }
);

const slice = createSlice({
  name: "Articles",
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getArticlesFromServer.fulfilled, (state, action) => {
      console.log("action data : ", action.payload.data);
      return action.payload.data;
    });
    builder.addCase(createANewArticle.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(updateArticles.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
    builder.addCase(deleteArticles.fulfilled, (state, action) => {
      console.log("state : ", state);
      console.log("action : ", action);
    });
  }
});

export default slice.reducer;
