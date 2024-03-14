"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

export default function RTL(props) {

    

  return (
    <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
      <div dir="rtl" >
            {props.children}
      </div>
        </StylesProvider>
    </ThemeProvider>
  );
}
