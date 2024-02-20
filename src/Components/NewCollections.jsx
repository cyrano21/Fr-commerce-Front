import Item from './Item'
import axios from 'axios'
import { useEffect, useState } from 'react'

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(5)
  const handleNewCollection = async () => {
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
      const response = await axios(`${backendUrl}/newcollections`)
      console.log('newCollection>>>', response.data)
      setNewCollection(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error)
    }
  }

  useEffect(() => {
    handleNewCollection()
  }, [])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = newCollection.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  )

  const totalPages = Math.ceil(newCollection.length / productsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="new-collections">
      <h1>NOUVELLES COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {currentProducts.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NewCollections
