import { Link, Outlet, createBrowserRouter } from "react-router-dom";
import DesafioUm from "./pages/DesafioUm";
import DesafioRedux from "./pages/DesafioRedux";
import DesafioToolkit from "./pages/DesafioToolkit";
import store from "./pages/store/store";
import { Provider } from "react-redux";

const routes = [
  {
    path: "/",
    element: (
      <Provider store={store}>
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
          </ul>
          <Outlet />
        </div>
      </Provider>
    ),
    children: [
      { path: "desafio-useReducer", element: <DesafioUm /> },
      { path: "desafio-redux", element: <DesafioRedux /> },
      { path: "desafio-toolkit", element: <DesafioToolkit /> }
    ]
  }
];

const AppRouter = createBrowserRouter(routes);

export default AppRouter;