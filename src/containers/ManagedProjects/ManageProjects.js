import {useContext, useEffect, useRef, useState} from "react"
import axios from "axios";
import Project from "../../components/Project/Project";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {AssignedProjectsContext} from "../../context/AssignedProjectsContext";


function ManageProjects() {

    const {assignedProjects, setAssignedProjects} = useContext(AssignedProjectsContext);
    const filterForm = useRef();
    const [projectsState, setProjectsState] = useState([]);
    const [filterState, setFilterState] = useState(0)
    const {state} = useLocation();
    const employeeId = state.id;

    const fetchProjects = () => {
        const form = filterForm.current;
        let name = form['name'].value
        let location = form['location'].value

        if (name == '') {
            name = null
        }

        if (location == '') {
            location = null
        }


        axios.get("http://localhost:8080/api/v1/projects"
            , {
                params: {
                    name: name,
                    location: location
                }
            }
        )
            .then(response => {
                console.log(response);
                setProjectsState(response.data)
            })
            .catch(error => console.log("Error while fetching projects, error = " + error.message))
    }

    useEffect(() => fetchProjects(), [filterState])

    const handleFilterState = () => {
        setFilterState(filterState + 1)
    }

    const addProjectToEmployee = (projectId) => {
        axios.put(`http://localhost:8080/api/v1/employees/${employeeId}/projects/${projectId}`)
            .then(() => console.log("project added to employee =" + employeeId))
            .catch(error => console.log("Error while updating employee project, error = " + error.message))
    }

    const deleteProjectFromEmployeeId = (projectId) => {
        axios.delete(`http://localhost:8080/api/v1/employees/${employeeId}/projects/${projectId}`)
            .then(() => console.log("project deleted from employee =" + employeeId))
            .catch(error => console.log("Error while updating employee project, error = " + error.message))
    }

    const isProjectAssigned = (projectId) => {
        if (assignedProjects.length === 0) return false
        return assignedProjects.some(p => p.id == projectId)
    }

    const handleProjectAssignment = (event) => {
        const projectId = event.target.id;
        const projectName = event.target.name

        if(isProjectAssigned(projectId)){
            deleteProjectFromEmployeeId(projectId)
            setAssignedProjects(assignedProjects.filter(p => p.id != projectId))

        }else{
            setAssignedProjects(
                [...assignedProjects,
                    {
                        id: projectId,
                        name: projectName
                    }
                ]
            )
            addProjectToEmployee(projectId)
        }
    }

    const projectsComponents = projectsState.map(p =>
        <div className="Content">
            <Project id={p.id} key={p.id} name={p.name}/>
            <button id={p.id} name={p.name}
                    onClick={handleProjectAssignment}> {isProjectAssigned(p.id) ? "Remove" : "Add"}</button>
        </div>
    )

    return <div>
        <br/>
        <div>
            <form ref={filterForm}>
                Name: <input type="text" name={'name'} label={'name'}/> <br/>
                Location: <input type="text" name={'location'} label={'location'}/>
            </form>
            <button onClick={handleFilterState}>Apply Filter</button>
        </div>

        <div>
            {projectsComponents}
        </div>

        <div className="Spec">
            <Link to={`/employees/${employeeId}`}>Back</Link>
        </div>
    </div>
}

export default ManageProjects;