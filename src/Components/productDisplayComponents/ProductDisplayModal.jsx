import Modal from '../Modal.jsx'

const ProductDisplayModal = ({ setSelectedSize, setIsModalOpen }) => {
  return (
    <Modal onClose={() => setIsModalOpen(false)}>
      <h2>Sélectionnez une taille</h2>
      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
        <button
          key={size}
          onClick={() => {
            setSelectedSize(size)
            setIsModalOpen(false)
          }}
        >
          {size}
        </button>
      ))}
    </Modal>
  )
}
export default ProductDisplayModal
