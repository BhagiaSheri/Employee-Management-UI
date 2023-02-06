import { Route, Routes, Navigate } from "react-router";
import EmployeeDetails from "../../components/EmployeeDetails/EmployeeDetails";
import NewEmployee from "../../components/NewEmployee/NewEmployee";
import Employees from "../Employees/Employees";
import ManageProjects from "../ManagedProjects/ManageProjects";

export default function PageRoutes() {
    return (
    <Routes>
        <Route path="/" element={<Navigate to={"/employees"}/>}></Route>
        <Route path="employees" element={<Employees /> } />
        <Route path="employees/:id" element={<EmployeeDetails/>}></Route>
        <Route path="add-employee" element={<NewEmployee/>}/>
        <Route path="employees/manage-projects" element={<ManageProjects/>}></Route>
    </Routes>
    );
}



