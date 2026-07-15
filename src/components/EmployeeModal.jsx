import { useEffect } from "react";

const EmployeeModal = ({employee ,onClose}) => {
 

    useEffect(() => {

      if(!employee) return;

        const handleKeyDown = (event) => {
            if(event.key === "Escape"){
                onClose()
            }
        }

        window.addEventListener("keydown" , handleKeyDown);

        return () => {
            window.removeEventListener("keydown" , handleKeyDown)
        }

    }, [onClose])
 
    return (
    <div className="modal-overlay" onClick={onClose}>
       <div className="modal" 
        onClick={(e) => e.stopPropagation()}
       >

          <button onClick={onClose}>Close</button>

          <img 
          src={employee.image}
           alt={`${employee.firstName} ${employee.lastName}`}
          />

          <h2>
            {employee.firstName} {employee.lastName}
          </h2>

          <p>
          <strong>Email:</strong> {employee.email}
        </p>

        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>

        <p>
          <strong>Department:</strong> {employee.company.department}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {employee.address.address}, {employee.address.city}
        </p>

       </div>
    </div>
 )
}

export default EmployeeModal;