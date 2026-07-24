import EmployeeCard from './EmployeeCard.jsx';
import { memo } from 'react';

const EmployeeList = ({ employees , onEmployeeSelect, onEditEmployee, onDeleteEmployee}) => {

    return (
        <div className="employee-list">
           {employees.map((employee) => (
            <EmployeeCard 
            key={employee.id}
            employee={employee}
            onEmployeeSelect={onEmployeeSelect}
            onEditEmployee= {onEditEmployee}
            onDeleteEmployee= {onDeleteEmployee}
            />
           ))}
        </div>
    )

}

export default memo(EmployeeList);

