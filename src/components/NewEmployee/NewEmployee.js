import axios from "axios";
import {useRef} from "react";
import {useNavigate} from "react-router";
import './NewEmployee.css';

const NewEmployee = () => {

    const navigate = useNavigate();
    const newEmployeeForm = useRef();

    const addEmployee = () => {
        const form = newEmployeeForm.current;
        const data = {
            name: form['name'].value,
            salary: form['salary'].value,
            projectList: [] //no projects by default
        };

        axios.post(`http://localhost:8080/api/v1/employees`, data)
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error while creating new employee, error=', error.message);
            })
    }

    return (
        <div className="NewProduct">
            <form ref={newEmployeeForm}>
                <h1>Add Employee</h1>
                <label>Name</label>
                <input type="text"
                       label={'name'}
                       name={'name'}
                />
                <label>Salary</label>
                <input type="text"
                       label={'salary'}
                       name={'salary'}
                />
            </form>
            <button onClick={addEmployee}>Add Employee</button>
        </div>
    );

}

export default NewEmployee;