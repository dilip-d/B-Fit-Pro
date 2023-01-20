import { useRef } from "react";
import "./ContactFormStyles.css";
import emailjs from '@emailjs/browser'

function ContactForm() {
  const form = useRef()

  const sendEmail = (e) => {
      e.preventDefault();

      emailjs.sendForm('service_cxjguth', 'template_ia0gs0d', form.current, '8wVksha5u0skIfYTn')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
  }
  return (
    <div className="form-container">
      <h1>Send a message to us!</h1>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name='user_name' placeholder="Name" />
        <input type="email" name='user_email' placeholder="Email" />
        <input type="text" name='user_subject' placeholder="Subject" />
        <textarea type="text" name='user_message' placeholder="Message" rows='4'></textarea>
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;
