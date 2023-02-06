import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Employee from "../../components/Employee/Employee";


function Employees() {

    const [employeeState, setEmployeeState] = useState([]);

    const fetchEmployees = () => {
        axios.get("http://localhost:8080/api/v1/employees")
            .then(response => setEmployeeState(response.data))
            .catch(error => console.log("Error while fetching employees, error = " + error.message))
    }

    useEffect(() => fetchEmployees(), [])


    const employeeComponents = employeeState.map(s =>
        <Link to={`${s.id}`} key={s.id}>
            <Employee id={s.id} key={s.id} name={s.name}/>
        </Link>
    )

    return (
        <>
            <div className="Employee">
                {employeeComponents}
            </div>
        </>
    )

}

export default Employees

