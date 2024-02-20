import Item from './Item'
import axios from 'axios'
import { useEffect, useState } from 'react'

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  useEffect(() => {
    const fetchNewCollection = async () => {
      try {
        const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
        const response = await axios(`${backendUrl}/newcollections`)
        setNewCollection(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error)
      }
    }
    fetchNewCollection()
  }, [])

  const currentProducts = newCollection.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  )

  const totalPages = Math.ceil(newCollection.length / productsPerPage)

  return (
    <div className="new-collections">
      <h1>NOUVELLES COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {currentProducts.map((item) => (
          <Item key={item._id} {...item} />
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button key={number + 1} onClick={() => setCurrentPage(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NewCollections
