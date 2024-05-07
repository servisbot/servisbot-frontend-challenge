import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <>
            {<Sidebar />}
          </>
      ),
    },
    {
      path: "/botsList",
      element: (
          <>
            {<Sidebar /> }
          </>
      ),
    },
      {
          path: "/ListOfWorkersForABot",
          element: (
              <>
                  {<Sidebar /> }
              </>
          ),
      },
      {
          path: "/ListOfLogsForABot",
          element: (
              <>
                  {<Sidebar /> }
              </>
          ),
      },
      {
          path: "/ListOfLogsForAWorkerForABot",
          element: (
              <>
                  {<Sidebar /> }
              </>
          ),
      }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
