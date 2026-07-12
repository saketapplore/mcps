import {useState, useEffect, useMemo} from 'react';
import SearchBar from '../components/SearchBar.jsx';
import Loader from '../components/Loader.jsx';
import Error from '../components/Error.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EmployeeList from '../components/EmployeeList.jsx';
import useDebounce from '../hooks/useDebounce.js';
import Pagination from '../components/Pagination.jsx';
import SortDropdown from '../components/SortDropdown.jsx'
import getEmployees from '../services/employeeApi.js';
import DepartmentFilter from '../components/DepartMentFilter.jsx'

const EmployeeDirectory = () => {
 
const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchTerm ,setSearchTerm] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [sortOption , setSortOption] = useState('default')
const [selectedDepartment , setSelectedDepartment] = useState('')
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
}, [debouncedSearchTerm]);


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


const departments = useMemo(() => {
  return [
    ...new Set(
      employees.map(
        (employee) => employee.company.department
      ),
    ),
  ];
}, [employees]);

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

     
     <div>

     <h1>Employee Directory</h1>

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
        sortedEmployees.length === 0 ? (
            <EmptyState />
        ) :( <><EmployeeList employees={paginatedEmployees} />
          
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
       

     </div>


  )
}


export default EmployeeDirectory;

