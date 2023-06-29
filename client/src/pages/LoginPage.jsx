import React, { useContext, useState } from 'react';
import loginRequest from '../api/loginRequest';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';

export const LoginPage = () => {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [token, setToken] = useContext(TokenContext);
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		loginRequest(password)
			.then(({ token }) => {
				setToken(token);
				navigate('/');
				console.log(token);
			})
			.catch((err) => {
				setError(err.message);
				console.log(err);
			});
	};

	return (
		<div>
			<h1 className='mb-5 text-3xl text-purple-700'>Login</h1>
			<div style={{ color: 'red' }}>{error}</div>
			<form onSubmit={handleLogin}>
				<input
					className='w-full max-w-xs text-black input input-bordered'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='ml-5 btn btn-accent'>Login</button>
			</form>
		</div>
	);
};
