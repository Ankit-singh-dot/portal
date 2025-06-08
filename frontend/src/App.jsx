import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/ui/componets_things/Navbar";
import Login from "./components/ui/login";
import Register from "./components/ui/Register";
import Home from "./components/ui/Home";

const appRouter = createBrowserRouter([
  { path: "/", element: < Home/> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter }></RouterProvider>
    </>
  );
}

export default App;
