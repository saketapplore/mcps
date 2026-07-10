import EmployeeCard from './EmployeeCard.jsx';

const EmployeeList = ({ employees}) => {

    return (
        <div className="employee-list">
           {employees.map((employee) => (
            <EmployeeCard 
            key={employee.id}
            employee={employee}
            />
           ))}
        </div>
    )

}

export default EmployeeList;

