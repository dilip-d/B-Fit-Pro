import "./TrainerScreen.css";
import t1 from "../assets/t1.jpg";
import t2 from "../assets/t2.jpg";
import t3 from "../assets/t3.jpg";

function TrainerList() {
    return (
        <div className="container">
            <div className="t-card">
                <div className="t-image">
                    <img src={t1} alt='image'></img>
                </div>
                <h4>Johnson</h4>
                <p>Certified in personal training and nutrition</p>
                <div className="btn">
                    <button>Details</button>
                    <button>Book Now</button>
                </div>
            </div>
            <div className="t-card">
                <div className="t-image">
                    <img src={t2} alt='image'></img>
                </div>
                <h4>Silva</h4>
                <p>Certified in personal training and nutrition</p>
                <div className="btn">
                    <button>Details</button>
                    <button>Book Now</button>
                </div>
            </div>
            <div className="t-card">
                <div className="t-image">
                    <img src={t3} alt='image'></img>
                </div>
                <h4>Roy Mathew</h4>
                <p>Certified in personal training and nutrition</p>
                <div className="btn">
                    <button>Details</button>
                    <button>Book Now</button>
                </div>
            </div>
            <div className="t-card">
                <div className="t-image">
                    <img src={t3} alt='image'></img>
                </div>
                <h4>Denice</h4>
                <p>Certified in personal training and nutrition</p>
                <div className="btn">
                    <button>Details</button>
                    <button>Book Now</button>
                </div>
            </div>
        </div>
    );
}

export default TrainerList;