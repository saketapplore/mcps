const API_URL = 'https://dummyjson.com/users';

const getEmployees = async () => {

  try {
    const response = await fetch(`${API_URL}?limit=100`);
     if(!response.ok){
        throw new Error('Failed to fetch employees');
     }
     const data = await response.json();
     return data.users ?? [];
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

const getEmployeeById = async (id) => {

  try {
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok){
      throw new Error('Failed to fetch employee');
    }
    const data = await response.json();
    return data ?? null;
  } catch (error) {
    console.error('Error fetching employee:', error);
    return null;
  }

}

export { getEmployees, getEmployeeById };

