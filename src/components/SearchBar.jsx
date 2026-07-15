import { useRef } from "react";

const SearchBar = ({searchTerm, setSearchTerm}) => {

    const inputRef = useRef(null);

    const handleClear = () => {
        setSearchTerm('');
        inputRef.current.focus()
    }

    return(

        <div className="search-container">

        <input 
          ref={inputRef}
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        { searchTerm.trim().length > 0 && <button
         className="clear-btn"
         onClick={handleClear}
        >
              ×
            </button>}

       </div>        

    )

}

export default SearchBar;

