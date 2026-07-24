import {memo} from 'react'

const EmployeeCard = ({ employee , onEmployeeSelect , onEditEmployee, onDeleteEmployee}) => {

 

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

             <button
              onClick={(e) => {
                e.stopPropagation();

                const isConfirmed = window.confirm(
                    "Are you sure want to delete?"
                )

                if(!isConfirmed){
                    return;
                }

                onDeleteEmployee(employee.id)
              }}
             >
                Delete
             </button>

         

        </div>

    )

}

export default memo(EmployeeCard);
