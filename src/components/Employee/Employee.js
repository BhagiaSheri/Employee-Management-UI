

function Employee(props){

    return <div className="Content" >
            <h1>{props.id}</h1>
            <div className="Info">
                <div className="Author">{props.name}</div>
            </div>
            <br/>
        </div>

}

export default Employee;