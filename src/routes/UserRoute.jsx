import { Routes, Route } from "react-router-dom";
import FormPage from "../pages/FormPage";

import TablePage from "../pages/TablePage";

const UserRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/addStudent" element={<FormPage />} />
      </Routes>
    </>
  );
};

export default UserRoute;
