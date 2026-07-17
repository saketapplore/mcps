

const EmployeeCard = ({ employee , onEmployeeSelect , onEditEmployee}) => {

    return(

        <div className="employee-card"
        onClick={() => onEmployeeSelect(employee)}
        >
             <img src={employee.image}
             alt={`${employee.firstName} ${employee.lastName}`} />
             
             <h3>{employee.firstName} {employee.lastName}</h3>

             <p>{employee.email}</p>
             <p>{employee.phone}</p>

             <button
              onClick={(e) => {
               e.stopPropagation();
               onEditEmployee(employee)
              }}
             >
                Edit
             </button>

        </div>

    )

}

export default EmployeeCard;
