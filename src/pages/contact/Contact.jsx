import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { toast } from "react-toastify";
import "./Contact.scss";
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6amjava",
        "template_unx8tri",
        form.current,
        "jW47gE_rb8WNC-23d"
      )
      .then(
        (result) => {
          toast.success("Message Sent Successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };
  return (
    <>
      <div className="contact-form">
        <div className="form-content">
          <h2 className="contact-form-heading">Contact US</h2>
          <form ref={form} onSubmit={sendEmail} className="form">
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
