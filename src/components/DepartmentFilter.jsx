const DepartmentFilter = ({
  selectedDepartment,
  setSelectedDepartment,
  departments,
}) => {
  return (
    <div>
      <label htmlFor="department">Department: </label>

      <select
        id="department"
        value={selectedDepartment}
        onChange={(e) =>
          setSelectedDepartment(e.target.value)
        }
      >
        <option value="">All Departments</option>

        {departments.map((department) => (
          <option
            key={department}
            value={department}
          >
            {department}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;