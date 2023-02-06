
import React, { useState } from 'react';
import '../Headers/Header.css'
import Header from "../Headers/Header";
import PageRoutes from "./PageRoutes";
import Employee from '../../components/Employee/Employee';
import {AssignedProjectsContext} from "../../context/AssignedProjectsContext";

export default function Dashboard() {


const [assignedProjects, setAssignedProjects] = useState([]);

    return (
        <React.Fragment>
            <AssignedProjectsContext.Provider value={{assignedProjects, setAssignedProjects}}>
                <div className='header'>
                    <Header />
                </div>
                <div className="Employee">
                    <PageRoutes />
                </div>
            </AssignedProjectsContext.Provider>
        </React.Fragment>

    )

}