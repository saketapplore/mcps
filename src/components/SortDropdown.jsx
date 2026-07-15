const SortDropdown = ({sortOption , setSortOption}) => {

    return (
  
        <div>
            <label htmlFor="sort">Sort By: </label>
               <select
               id="sort"
               value={sortOption}
               onChange={(e) => setSortOption(e.target.value)}
               >
                <option value='default'>Default</option>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
               </select>       

        </div>

    )

}

export default SortDropdown