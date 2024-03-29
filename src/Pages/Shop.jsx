import Hero from '../Components/Hero.jsx'
import Popular from '../Components/Popular.jsx'
import Offers from '../Components/Offers.jsx'
import NewCollections from '../Components/NewCollections.jsx'
import NewsLetter from '../Components/NewsLetter.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Shop = () => {
  const [popular, setPopular] = useState([])
  const [newcollection, setNewcollection] = useState([])

  const fetchInfo = async () => {
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

      console.log('backendUrl')
      const popularResponse = await axios.get(`${backendUrl}/popularproducts`)
      console.log('popularResponse.data', popularResponse.data)

      setPopular(popularResponse.data)

      const newCollectionResponse = await axios.get(
        `${backendUrl}/newcollections`,
      )
      setNewcollection(newCollectionResponse.data)
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données:",
        error,
      )
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])
  return (
    <div>
      <Hero />
      <Popular data={popular} />
      <Offers />
      <NewCollections data={newcollection} />
      <NewsLetter />
    </div>
  )
}
export default Shop
