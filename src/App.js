import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/navigationBar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Dashboard from "./pages/home/Dashboard";
import ConfigTable from "./pages/appdata/ConfigTable";
import AppTypeTable from "./pages/appdata/AppTypeTable";
import EnvironmentTable from "./pages/appdata/EnvironmentTable";
import HostTable from "./pages/appdata/HostTable";
import RecipientTable from "./pages/appdata/RecipientTable";
import Login from "./pages/login/Login";
import "./styles/style.css";
import ApplicationDetails from "./pages/home/ApplicationDetails";
import HealthStatusPage from "./pages/envstatus";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },

        {
          path: "/dashboard/applicationdetails",
          element: <ApplicationDetails />,
        },

        {
          path: "/config",
          element: <ConfigTable />,
        },

        {
          path: "/apptype",
          element: <AppTypeTable />,
        },

        {
          path: "/environment",
          element: <EnvironmentTable />,
        },
        {
          path: "/host",
          element: <HostTable />,
        },
        {
          path: "/recipient",
          element: <RecipientTable />,
        },
        {
          path: "/dev",
          element: <HealthStatusPage pageName={"DEV"} />,
        },
        {
          path: "/sit",
          element: <HealthStatusPage pageName={"SIT"} />,
        },
        {
          path: "/qa",
          element: <HealthStatusPage pageName={"QA"} />,
        },
        {
          path: "/prod",
          element: <HealthStatusPage pageName={"PROD"} />,
        },
      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
