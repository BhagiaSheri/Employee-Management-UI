import {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import './EmployeeDetails.css'
import Projects from "../../containers/Projects/Projects";


function EmployeeDetails() {

    const navigate = useNavigate()
    const params = useParams();
    const [employeeDetail, setEmployeeDetail] = useState({});
    const employeeId = params.id;


    const fetchEmployeeById = () => {
        axios.get(`http://localhost:8080/api/v1/employees/${employeeId}`)
            .then(response => setEmployeeDetail(response.data))
            .catch(error => console.log("Error while fetching employee details, error = " + error.message))
    }

    useEffect(() => fetchEmployeeById(), [employeeId])

    const deleteEmployeeById = () => {
        axios.delete(`http://localhost:8080/api/v1/employees/${employeeId}`)
            .then(() => navigate("/"))
            .catch(error => console.log("Error while deleting employees, error = " + error.message))
    }
    const handleDeleteOnClick = () => {
        deleteEmployeeById();
    }

    return (
        <>
            <div className="StudentDetails">
                <h3>Employee Info</h3>
                <h6>Name: {employeeDetail.name}</h6>
                <h6>ID: {employeeDetail.id}</h6>
                <h6>Salary: {employeeDetail.salary}</h6>
                <Projects/>
                <button onClick={handleDeleteOnClick}>Delete</button>
                <br/>
                <Link to="/employees">Back</Link>
            </div>
        </>
    );


}

export default EmployeeDetails;