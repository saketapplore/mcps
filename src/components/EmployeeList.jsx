import EmployeeCard from './EmployeeCard.jsx';

const EmployeeList = ({ employees , onEmployeeSelect, onEditEmployee}) => {

    return (
        <div className="employee-list">
           {employees.map((employee) => (
            <EmployeeCard 
            key={employee.id}
            employee={employee}
            onEmployeeSelect={onEmployeeSelect}
            onEditEmployee= {onEditEmployee}
            />
           ))}
        </div>
    )

}

export default EmployeeList;

