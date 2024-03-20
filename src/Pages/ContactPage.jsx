function ContactPage() {
  return (
    <div className="contact">
      <div className="contact-container">
        <h2>Contactez-Nous</h2>
        <form id="contact-form">
          <div className="form-group">
            <label htmlFor="name">Votre Nom</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Votre Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Votre Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
