const Modal = ({children}) => {

    return(
        <div className="modal-overlay">
            <div className='modal-content'>
                {children}
            </div>
        </div>
    )

}

const Header = ({children}) => {
    return(
        <div className="modal-header">
            {children}
        </div>
    )
}

Modal.Header = Header;

export default Modal;