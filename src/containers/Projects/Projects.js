import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Project from "../../components/Project/Project";
import {useNavigate} from "react-router";
import {AssignedProjectsContext} from "../../context/AssignedProjectsContext";

function Projects() {

    const navigate = useNavigate()
    const params = useParams()
  //  const [projectsState, setProjectsState] = useState([]);
    const employeeId = params.id;

    const {assignedProjects, setAssignedProjects} = useContext(AssignedProjectsContext);

    const fetchProjectsByEmployeeId = () => {
        axios.get(`http://localhost:8080/api/v1/employees/${employeeId}/projects`)
            .then(response => setAssignedProjects(response.data))
            .catch(error => console.log(`Error while fetching projects for EmployeeId=${employeeId}, error=${error.message}`))
    }

    useEffect(() => fetchProjectsByEmployeeId(), [employeeId])

    const handleManageProjects = () => {
        navigate("/employees/manage-projects", {state:{id:  params.id }})
    }

    const projectComponents = assignedProjects.map(p =>
        <Project id={p.id} key={p.id} name={p.name}/>
    )

    return (<>
        {(projectComponents.length > 0) ? <div className="Content">
            <h3>Projects</h3>
            {projectComponents}
        </div> : <h4>No Projects Assigned</h4>}
        <div> <button onClick={handleManageProjects}>Manage Projects</button></div>
    </>)


}


export default Projects