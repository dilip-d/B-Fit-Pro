import {  Link } from "react-router-dom";
import success from "../../../assets/success.png";
import styles from "./styles.module.css";

const VerificationSuccess = () => {

	return (
		<>
				<div className='container p-3' style={{ background: 'white', height: '100%', width: '100vw' , marginTop:"110px"}}>
					<img src={success} alt="success_img" className='success_img mt-5' style={{ width: '400px', height: '200px', objectFit: 'contain' }} />
					<h1 className="mt-5">Email verified successfully</h1>
					<Link to="/login">
						<button className='btn btn-success btn-lg mt-5 mb-5'>Login</button>
					</Link>
				</div>
		</>
	);
};

export default VerificationSuccess;