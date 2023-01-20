import DestinationData from "./TrainerData";
import "./TrainerStyles.css";
import Trainer1 from '../../../assets/15.jpg'
import Trainer2 from '../../../assets/16.jpg'
import Trainer3 from '../../../assets/17.jpg'
import Trainer4 from '../../../assets/18.jpg'

const Trainer = () => {
  return (
    <div className="destination">
      <h1>Hire the best Personal Trainers</h1>
      <p>The body achieves what the mind believes</p>
      <DestinationData
        className="first-des"
        heading='Join the B-Fit Pro family'
        text='¨If we could give every individual the right amount of nourishment and exercise, not too little and not too much, we would have found the safest way to health.¨ — Hippocrates'
        img1={Trainer1}
        img2={Trainer2}
      />
      <DestinationData
        className="first-des-reverse"
        heading='Loose Weight For Good'
        text='¨Physical fitness is not only one of the most important keys to a healthy body, it is the basis of dynamic and creative intellectual activity.¨ – John F. Kennedy'
        img1={Trainer3}
        img2={Trainer4}
      />
    </div>
  );
};

export default Trainer;
