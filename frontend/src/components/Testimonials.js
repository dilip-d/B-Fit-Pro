import "./TestimonialStyles.css";
import TestimonialsData from "./TestimonialsData";
import Trip1 from "../assets/20.jpg";
import Trip2 from "../assets/25.jpg";
import Trip3 from "../assets/24.jpg";

function Testimonials() {
  return (
    <div className="trip">
      <h1>Testimonials</h1>
      <p>You can find personal trainer at your location</p>
      <div className="tripcard">
        <TestimonialsData
          image={Trip1}
          heading='Christine'
          text='"I have worked with Wendy for a number of years, and my sessions make me feel so much better that I miss them when I am on holiday. Wendy brings a blend of skill and a friendly, pleasant manner to her work."'
        />
        <TestimonialsData
          image={Trip2}
          heading='Denise'
          text='"Dee is an awesome trainer! Her infectious optimism make exercise fun. Dee works hard to tailor her program to the client’s level, assists in setting realizable goals and when met makes getting to the next level achievable."'
        />
        <TestimonialsData
          image={Trip3}
          heading='Sharon'
          text='"I am enjoying my sessions very much, my balance is slowly improving. Last Monday, we did exercises in the pool, that I enjoyed very much. Olena is very nice and easy to work with."'
        />
      </div>
    </div>
  );
}

export default Testimonials;
