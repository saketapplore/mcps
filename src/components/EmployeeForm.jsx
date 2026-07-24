import { useEffect, useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  department: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_FORM":
      return {
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        department: action.payload.department,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
};

const EmployeeForm = ({
  onAddEmployee,
  departments,
  editingEmployee,
  onUpdateEmployee,
}) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    if (!editingEmployee) {
      dispatch({
        type: "RESET_FORM",
      });
      return;
    }

    dispatch({
      type: "SET_FORM",
      payload: {
        name: `${editingEmployee.firstName} ${editingEmployee.lastName}`.trim(),
        email: editingEmployee.email,
        phone: editingEmployee.phone,
        department: editingEmployee.company?.department ?? "",
      },
    });

  }, [editingEmployee]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!state.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!state.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!state.phone.trim()) {
      alert("Phone is required");
      return;
    }

    if (!state.department.trim()) {
      alert("Department is required");
      return;
    }

    if (editingEmployee) {

      onUpdateEmployee({
        id: editingEmployee.id,
        name: state.name,
        email: state.email,
        phone: state.phone,
        department: state.department,
      });

    } else {

      onAddEmployee({
        name: state.name,
        email: state.email,
        phone: state.phone,
        department: state.department,
      });

    }

    dispatch({
      type: "RESET_FORM",
    });

  };

  return (
    <form
      className="employee-form"
      onSubmit={handleSubmit}
    >

      <div>
        <label htmlFor="name">
          Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "name",
              value: e.target.value,
            })
          }
        />
      </div>

      <div>

        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "email",
              value: e.target.value,
            })
          }
        />

      </div>

      <div>

        <label htmlFor="phone">
          Phone Number
        </label>

        <input
          id="phone"
          type="tel"
          placeholder="Enter Phone Number"
          value={state.phone}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "phone",
              value: e.target.value,
            })
          }
        />

      </div>

      <div>

        <label htmlFor="department">
          Department
        </label>

        <select
          id="department"
          value={state.department}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "department",
              value: e.target.value,
            })
          }
        >
          <option value="">
            Select Department
          </option>

          {departments?.map((department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          ))}

        </select>

      </div>

      <button type="submit">
        {editingEmployee
          ? "Update Employee"
          : "Add Employee"}
      </button>

    </form>
  );
};

export default EmployeeForm;