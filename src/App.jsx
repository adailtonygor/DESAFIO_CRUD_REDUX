
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar,  Link as MuiLink } from "@material-ui/core";
import {  Outlet, createBrowserRouter } from "react-router-dom";
import DesafioRedux from "./pages/DesafioRedux";
import DesafioToolkit from "./pages/DesafioToolkit";
import DesafioTrkQuery from "./pages/DesafioTrkQuery";
import DesafioUseReducer from "./pages/DesafioUseReducer";
import { Provider } from "react-redux";
import { storeQuery, storeRedux, storeToolkit } from "./pages/store/store";
import './App.css';

const routes = [
  {
    path: "/",
    element: (
      <>
        <AppBar position="static" className="navbar">

          <Toolbar>
           
            <MuiLink component={RouterLink} to="/desafio-useReducer" color="inherit">
             <strong>  DesafioUseReducer</strong>
            </MuiLink>
            <MuiLink component={RouterLink} to="/desafio-redux" color="inherit">
            <strong> DesafioRedux</strong>
            </MuiLink>
            <MuiLink component={RouterLink} to="/desafio-toolkit" color="inherit">
            <strong> DesafioToolkit</strong>
            </MuiLink>
            <MuiLink component={RouterLink} to="/desafio-trkQuery" color="inherit">
            <strong> DesafioTrkQuery</strong>
            </MuiLink>
          </Toolbar>
        </AppBar>
        <Outlet />
      </>
    ),
    children: [
      { path: "desafio-useReducer", element: <DesafioUseReducer /> },
      { path: "desafio-redux", element:<Provider store={storeRedux}> <DesafioRedux /> </Provider>},
      { path: "desafio-toolkit", element:<Provider store={storeToolkit}> <DesafioToolkit /> </Provider>},
      { path: "desafio-trkQuery", element: <Provider store={storeQuery}> <DesafioTrkQuery /> </Provider>}
    ]
  }
];

const AppRouter = createBrowserRouter(routes);

export default AppRouter;