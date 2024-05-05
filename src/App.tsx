import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Layout/Sidebar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <>
            <ToastContainer />
            {<Sidebar />}
          </>
      ),
    },
    {
      path: "/botsList",
      element: (
          <>
            <ToastContainer />
            {<Sidebar /> }
          </>
      ),
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
