import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "../components/Loader.jsx";
import Error from "../components/Error.jsx";

import { getEmployeeById } from "../services/employeeApi.js";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      setError(null);

      try {
        const employeeData = await getEmployeeById(id);
        setEmployee(employeeData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="employee-details">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
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
            <strong>Department:</strong>{" "}
            {employee.company?.department ?? "N/A"}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {employee.address?.address},{" "}
            {employee.address?.city}
          </p>
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;