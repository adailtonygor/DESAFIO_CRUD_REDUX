import { Outlet, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Sidebar from "./pages/sideBar";
import DesafioRedux from "./pages/DesafioRedux";
import DesafioToolkit from "./pages/DesafioToolkit";
import DesafioTrkQuery from "./pages/DesafioTrkQuery";
import DesafioUseReducer from "./pages/DesafioUseReducer";
import { storeQuery, storeRedux, storeToolkit } from "./pages/store/store";
import PaginaInicial from "./pages/PaginaInicial";
import "./index.css";
import "./App.css";


const routes = [
  {
    path: "/",
    element: (
      
      
      <div className="app__container">
        <Sidebar />
        <div className="content">
          <div className="container__tela"> <Outlet /></div>
         
        </div>
      </div>
    ),
    children: [
      { path: "/", element: <PaginaInicial /> },
      { path: "desafio-useReducer", element: <DesafioUseReducer /> },
      { path: "desafio-redux", element: <Provider store={storeRedux}><DesafioRedux /></Provider> },
      { path: "desafio-toolkit", element: <Provider store={storeToolkit}><DesafioToolkit /></Provider> },
      { path: "desafio-trkQuery", element: <Provider store={storeQuery}><DesafioTrkQuery /></Provider> }
    ]
  }
];

const AppRouter = createBrowserRouter(routes);

export default AppRouter;