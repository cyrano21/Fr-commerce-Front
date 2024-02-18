import Item from './Item'
import axios from 'axios'
import { useState } from 'react'

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([])

  const handleNewCollection = async () => {
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
      const response = await axios(`${backendUrl}/new_collection`)
      console.log('newCollection>>>', response.data)
      setNewCollection(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error)
    }
  }

  useState(() => {
    handleNewCollection()
  }, [])

  return (
    <div className="new-collections">
      <h1>NOUVELLES COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          )
        })}
      </div>
    </div>
  )
}

export default NewCollections
