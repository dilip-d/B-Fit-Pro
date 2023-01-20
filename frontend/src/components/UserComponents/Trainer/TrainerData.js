import { Component } from "react";
import "./TrainerStyles.css";
import Trainer1 from '../../../assets/1.jpg'
import Trainer2 from '../../../assets/2.jpg'
import Trainer3 from '../../../assets/3.jpg'
import Trainer4 from '../../../assets/4.jpg'

class TrainerData extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="des-text">
          <h2>{this.props.heading}</h2>
          <p>{this.props.text}</p>
        </div>
        <div className="image">
          <img alt="img" src={this.props.img1} />
          <img alt="img" src={this.props.img2} />
        </div>
      </div>
    );
  }
}

export default TrainerData;
