import { Outlet } from "react-router";
import "./App.css";

import AppLayout from "./layouts/applayout";

function App() {
  return (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </>
  );
}

export default App;
