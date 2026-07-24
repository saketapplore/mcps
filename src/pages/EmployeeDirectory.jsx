import {useState, useEffect, useMemo, useCallback, useContext} from 'react';
import SearchBar from '../components/SearchBar.jsx';
import Loader from '../components/Loader.jsx';
import Error from '../components/Error.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EmployeeList from '../components/EmployeeList.jsx';
import useDebounce from '../hooks/useDebounce.js';
import Pagination from '../components/Pagination.jsx';
import SortDropdown from '../components/SortDropdown.jsx'
import { getEmployees } from '../services/employeeApi.js';
import DepartmentFilter from '../components/DepartmentFilter.jsx'
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm.jsx';
import useAuth from '../hooks/useAuth.js';
import useTheme from '../hooks/useTheme.js';
import useModal from '../hooks/useModal.js';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import Modal from '../components/Modal.jsx';


const EmployeeDirectory = () => {
const {isOpen, openModal, closeModal} = useModal();
const [employeeToDelete, setEmployeeToDelete] = useState(null);
const {theme, toggleTheme} = useTheme();
const {user, login, logout} = useAuth();  
const [employees, setEmployees] = useState([]);
const navigate = useNavigate();
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchTerm ,setSearchTerm] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [sortOption , setSortOption] = useState('default')
const [selectedDepartment , setSelectedDepartment] = useState('')
const [editingEmployee, setEditingEmployee] = useState(null)
const employeesPerPage = 5;



useEffect(() => {

    const fetchEmployees = async() => {
        setLoading(true);
        setError(null);

        try {
            const employeeData = await getEmployees();
            setEmployees(employeeData)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
 fetchEmployees();
}, []);   

const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
    setCurrentPage(1);
}, [debouncedSearchTerm , sortOption , selectedDepartment]);

const pageStyle = {
  backgroundColor: theme === "light" ? "#ffffff" : "#1f2937",
  color: theme === "light" ? "#000000" : "#ffffff",
  minHeight: "100vh",
  padding: "20px",
};


const filteredEmployees = useMemo(() => {

    const query = debouncedSearchTerm.trim().toLowerCase()
     return(
        employees.filter((employee) => {
        const fullName =`${employee.firstName} ${employee.lastName}`.toLowerCase();

    return (
      fullName.includes(query) ||
      employee.email.toLowerCase().includes(query)
    );
        })
     )
    }, [employees , debouncedSearchTerm])



const departmentFilteredEmployees = useMemo(() => {
  
  if (selectedDepartment === "") {
    return filteredEmployees;
  }

  
  return filteredEmployees.filter((employee) => {
    return employee.company.department === selectedDepartment;
  });
}, [filteredEmployees, selectedDepartment]);


const sortedEmployees = useMemo(() => {
  const sorted = [...departmentFilteredEmployees];

  if (sortOption === "asc") {
    sorted.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
  }

  if (sortOption === "desc") {
    sorted.sort((a, b) =>
      b.firstName.localeCompare(a.firstName)
    );
  }

  return sorted;
}, [departmentFilteredEmployees, sortOption]);

useEffect(() => {
  const totalPages = Math.ceil(
    sortedEmployees.length / employeesPerPage
  );

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
}, [sortedEmployees, currentPage]);

const departments = useMemo(() => {
  return [
    ...new Set(
      employees.map(
        (employee) => employee.company.department
      ),
    ),
  ];
}, [employees]);



const handleAddEmployee = useCallback((newEmployee) => {

  const [firstName, ...lastNameParts] = newEmployee.name.trim().split(" ");

const employee = {
  id: Date.now(),
  firstName,
  lastName: lastNameParts.join(" "),
  email: newEmployee.email,
  phone: newEmployee.phone,
  image: "https://dummyjson.com/icon/emilys/128",
  company: {
    department: newEmployee.department,
  },
  address: {
    address: "",
    city: "",
  },
};

  setEmployees((previousEmployee) => [
    employee,
    ...previousEmployee
  ])

}, []);

const handleEmployeeClick = useCallback((employee) => {
  navigate(`/employees/${employee.id}`);
}, [navigate]);

const handleEditEmployee = useCallback((employee) => {
  setEditingEmployee(employee);
}, []);

const handleUpdateEmployee = useCallback((updatedEmployee) => {

  const [firstName, ...lastNameParts] =
    updatedEmployee.name.trim().split(" ");

  setEmployees((previousEmployees) =>
    previousEmployees.map((employee) => {

      if (employee.id !== updatedEmployee.id) {
        return employee;
      }

      return {
        ...employee,

        firstName,
        lastName: lastNameParts.join(" "),

        email: updatedEmployee.email,
        phone: updatedEmployee.phone,

        company: {
          ...employee.company,
          department: updatedEmployee.department,
        },
      };
    })
  );

  setEditingEmployee(null);
}, []);

const handleDeleteEmployee = useCallback((id) => {
  setEmployeeToDelete(id);
  openModal();
}, [openModal]);

const handleConfirmDelete = useCallback(() => {
  setEmployees(previous => 
    previous.filter(
      employee => employee.id !== employeeToDelete
    )
  );
  setEmployeeToDelete(null);
  closeModal();
}, [employeeToDelete, closeModal]);

const handleCancelDelete = useCallback(() => {
  setEmployeeToDelete(null);
  closeModal();
}, [closeModal])

if(loading){
  return <Loader />
}

if(error){
  return <Error message={error} />
}

const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

const startIndex = (currentPage - 1) * employeesPerPage;

const endIndex = startIndex + employeesPerPage;

const paginatedEmployees = sortedEmployees
.slice(startIndex, endIndex);


  return (

     
     <div style={pageStyle}>

      

     <button onClick={toggleTheme}>
       Toggle Theme
     </button>

     <button onClick={() => 
      login({
        name: "John Doe",
        email: "john.doe@example.com",
      })
     }> 
        Login
     </button>
 
     <button onClick={logout}>
      Logout
     </button>
     
    
     <p>Current Theme : {theme}</p>
     
     {
      user ? (  
        <>
        <p>Welcome, {user.name}</p>
        <p>{user.email}</p>
        </>
      ) : 
      (
        <p>Please login to continue</p>
      )
     }

      <EmployeeForm 
       onAddEmployee = {handleAddEmployee}
       departments = {departments}
       editingEmployee= {editingEmployee}
       onUpdateEmployee= {handleUpdateEmployee}
      />

      <SearchBar 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      />

     <SortDropdown 
      sortOption = {sortOption}
      setSortOption = {setSortOption}
     />

     <DepartmentFilter
  selectedDepartment={selectedDepartment}
  setSelectedDepartment={setSelectedDepartment}
  departments={departments}
     />

      {
        sortedEmployees.length === 0 ?
         (
            <EmptyState />
        ) :( <>
        <EmployeeList 
        employees={paginatedEmployees}
        onEmployeeSelect={handleEmployeeClick}
        onEditEmployee = {handleEditEmployee}
        onDeleteEmployee = {handleDeleteEmployee}
        />
          
         {
            totalPages > 1 && (
                 <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          />
            )
         }

        

       </>
       
        )

        
      }
       

       <ConfirmationModal 
       isOpen={isOpen}
       title="Delete Employee"
       message="Are you sure you want to delete this employee?"
       onConfirm={handleConfirmDelete}
       onCancel={handleCancelDelete}
       />


     </div>


  )
}


export default EmployeeDirectory;

