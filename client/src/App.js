import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import PageRoutes from "./routes";
import { blue, indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', "sans-serif"].join(",")
  }
});

function App() {
  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <PageRoutes />
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
