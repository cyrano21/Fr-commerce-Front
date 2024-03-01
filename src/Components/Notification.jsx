import { useEffect, useState } from 'react'

const Notification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Attend un peu avant de fermer pour voir l'animation
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`notification ${isVisible ? 'show' : 'hide'}`}>
      {message}
      <button onClick={() => setIsVisible(false)}>X</button>
    </div>
  )
}

export default Notification
