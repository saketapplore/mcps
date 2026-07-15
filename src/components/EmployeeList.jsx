import EmployeeCard from './EmployeeCard.jsx';

const EmployeeList = ({ employees , onEmployeeSelect}) => {

    return (
        <div className="employee-list">
           {employees.map((employee) => (
            <EmployeeCard 
            key={employee.id}
            employee={employee}
            onEmployeeSelect={onEmployeeSelect}
            />
           ))}
        </div>
    )

}

export default EmployeeList;

