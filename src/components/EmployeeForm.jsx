import { useEffect, useState } from "react"

const EmployeeForm = ({onAddEmployee , departments , editingEmployee , onUpdateEmployee}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department , setDepartment] = useState('');

   
    useEffect(() => {
      
      if(!editingEmployee){
        return;
      }

      setName(
        `${editingEmployee.firstName} ${editingEmployee.lastName}`.trim()
      )

      setEmail(editingEmployee.email);
      setPhone(editingEmployee.phone)
      setDepartment(editingEmployee.company?.department ?? "");

    }, [editingEmployee])

    const handleSubmit = (e) => {
      e.preventDefault();

      if(!name.trim()){
        alert('Name is required')
        return;
      }

      if(!email.trim()){
        alert('Email is required')
        return;
      }

      if(!phone.trim()){
        alert('Phone is required')
        return;
      }

      if(!department.trim()){
        alert('Department is required')
        return;
      }

      if(editingEmployee){
        onUpdateEmployee({
          id: editingEmployee.id,
          name,
          email,
          phone,
          department
        })
      } else {
        onAddEmployee({
        name,
        email,
        phone,
        department
      })
      }

      setName('');
      setEmail('');
      setPhone('');
      setDepartment('');

    }

    return (

    <form className="employee-form"
       onSubmit={handleSubmit}
    >
        
        <div>
            <label htmlFor="name"
            >Name</label>

             <input      
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Enter Name"
              type="text"
             />

        </div>

        <div>

             <label htmlFor="email">Email</label>

            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            type="email"
            placeholder="Enter Email"
            />

        </div>

        <div>

           <label htmlFor="phone">Phone Number</label>
 
           <input 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            type="tel"
            placeholder="Enter Phone Number"
           />

        </div>


        <div>

          <label htmlFor="department">Department</label>
          
          <select id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
             <option value=''>Select Department</option>
             {
                departments?.map((department) => (
                   <option 
                   key={department}
                   value={department}
                   >
                    {department}
                   </option>
                ))
             }
          </select>

        </div>

        <button
        type="submit">
            {editingEmployee ? 'Update Employee' : 'Add Employee'}
        </button>

    </form>

)

}

export default EmployeeForm;