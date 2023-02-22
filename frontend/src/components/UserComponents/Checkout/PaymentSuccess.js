import { Link } from "react-router-dom";
import success from "../../../assets/success.png";

const PaymentSuccess = () => {

	return (
		<>
			<div className='container p-3' style={{ background: 'white', height: '100%', width: '100vw', marginTop: "110px" }}>
				<img src={success} alt="success_img" className='success_img mt-5' style={{ width: '300px', height: '100px', objectFit: 'contain' }} />
				<h3 className="mt-5">Payment done successfully</h3>
				<Link to='/userProfile'>
					<button className='btn btn-success btn-lg mt-5 mb-5'>View bookings</button>
				</Link>
			</div>
		</>
	);
};

export default PaymentSuccess;