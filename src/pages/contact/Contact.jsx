import "./Contact.scss";
const Contact = () => {
  const sendEmail = () => {};
  return (
    <>
      <div className="contact-form">
        <div className="form-content">
          <h2 className="contact-form-heading">Contact US</h2>
          <form onSubmit={sendEmail} className="form">
            <div className="field input-field">
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="email"
                name="user_email"
                placeholder="Your active email"
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
            </div>
            <div className="field area-field">
              <textarea name="message" cols="30" rows="10"></textarea>
            </div>
            <div className="field button-field">
              <button className="send-msg-btn">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
