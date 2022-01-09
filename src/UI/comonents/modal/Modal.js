import './modal.scss';

export const MyModal = ({children, visible, setVisible}) => {


    return (
        <div onClick={() => setVisible(false)} className={visible?'modal-layer modal-active':'modal-layer'}>
             <div className='modal' onClick={(e)=> e.stopPropagation()}>
                 {children}
            </div>
        </div>
       
    )
}
