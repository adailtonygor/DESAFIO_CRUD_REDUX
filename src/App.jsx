import { Link, Outlet, createBrowserRouter } from "react-router-dom";
import DesafioRedux from "./pages/DesafioRedux";
import DesafioToolkit from "./pages/DesafioToolkit";
import DesafioTrkQuery from "./pages/DesafioTrkQuery";
import { Provider } from "react-redux";
import DesafioUseReducer from "./pages/DesafioUseReducer";
import { storeQuery, storeRedux, storeToolkit } from "./pages/store/store";


const routes = [
  {
    path: "/",
    element: (
     
        <div>
          <ul>
            <li>
              <Link to="desafio-useReducer">DesafioUseReducer</Link>
            </li>
            <li>
              <Link to="desafio-redux">DesafioRedux</Link>
            </li>
            <li>
              <Link to="desafio-toolkit">DesafioToolkit</Link>
            </li>
            <li>
              <Link to="desafio-trkQuery">DesafioTrkQuery</Link>
            </li>
          </ul>
          <Outlet />
        </div>
   
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