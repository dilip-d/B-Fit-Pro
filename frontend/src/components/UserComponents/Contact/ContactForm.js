import { useRef } from "react";
import "./ContactFormStyles.css";
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

function ContactForm() {

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    // Trim the input values
    const name = form.current.user_name.value.trim();
    const email = form.current.user_email.value.trim();
    const subject = form.current.user_subject.value.trim();
    const message = form.current.user_message.value.trim();

    // Check if any of the input values are empty after trimming
    if (!name || !email || !subject || !message) {
      alert("Please fill out all fields.");
      return;
    }

    emailjs.sendForm('service_cxjguth', 'template_ia0gs0d', form.current, '8wVksha5u0skIfYTn')
      .then((result) => {
        console.log(result.text);
        toast.success('Sent Successfully')
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <div className="form-container">
      <h1>Send a message to us!</h1>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name='user_name' placeholder="Name" required />
        <input type="email" name='user_email' placeholder="Email" required />
        <input type="text" name='user_subject' placeholder="Subject" required />
        <textarea type="text" name='user_message' placeholder="Message" rows='4' required></textarea>
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;