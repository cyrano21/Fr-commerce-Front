import ReactDOM from 'react-dom'

// Style de base pour le modal, à personnaliser selon vos besoins
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '9999',
  background: '#FFF',
  padding: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}

// Style pour le fond sombre derrière le modal
const overlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: '9990',
}

// Le composant Modal
const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        {children}
        <button onClick={onClose}>Fermer</button>
      </div>
    </>,
    document.getElementById('modal-root'), // Assurez-vous que 'modal-root' existe dans votre index.html
  )
}

export default Modal
