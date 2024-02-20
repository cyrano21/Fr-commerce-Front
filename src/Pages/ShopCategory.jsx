import { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../Components/Item'

const ShopCategory = ({ banner, category }) => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchProducts = async () => {
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
      const { data } = await axios.get(`${backendUrl}/allproducts`, {
        params: {
          category: category,
          page: currentPage,
          limit: 12,
        },
      })

      setProducts(data.products)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [category, currentPage])

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="shopcategory">
      <img src={banner} alt="Banner" className="shopcategory-banner" />
      <div className="shopcategory-indexSort">
        {/* Index and Sorting Elements Here */}
      </div>
      <div className="shopcategory-items">
        {products.map((product, index) => (
          <Item key={index} {...product} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ShopCategory
