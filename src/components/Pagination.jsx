const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    return (
        <div>
            <button
             disabled={currentPage === 1}
             onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>
              {
                Array.from({length : totalPages} , (_ , index) => {
                    const pageNumber = index + 1;

                     return (

                        <button
                          key={pageNumber}
                          onClick={() => onPageChange(pageNumber)}
                          className={
                            currentPage === pageNumber ?
                            'active-user' : ''
                          }
                        >
                            {pageNumber}
                        </button>

                     )

                })
              }
            <button
             disabled={currentPage === totalPages}
             onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    )
}
export default Pagination;