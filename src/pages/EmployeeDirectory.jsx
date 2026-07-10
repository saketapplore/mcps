import {useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar.jsx';
import Loader from '../components/Loader.jsx';
import Error from '../components/Error.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EmployeeList from '../components/EmployeeList.jsx';
import useDebounce from '../hooks/useDebounce.js';
import Pagination from '../components/Pagination.jsx';

import getEmployees from '../services/employeeApi.js';

const EmployeeDirectory = () => {
 
const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchTerm ,setSearchTerm] = useState('');
const [currentPage, setCurrentPage] = useState(1);
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

if(loading){
    return <Loader />
}

if(error){
    return <Error message={error} />
}


const query = debouncedSearchTerm.trim().toLowerCase()

const filteredEmployees = employees.filter((employee) => {

     const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();

    return (
        fullName.includes(query) || employee.email.toLowerCase().includes(query)
    )

})

const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

const startIndex = (currentPage - 1) * employeesPerPage;

const endIndex = startIndex + employeesPerPage;

const paginatedEmployees = filteredEmployees
.slice(startIndex, endIndex);

  return (

     
     <div>

     <h1>Employee Directory</h1>

      <SearchBar 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      />

      {
        filteredEmployees.length === 0 ? (
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

