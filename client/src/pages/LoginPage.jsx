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
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	return (
		<div>
			<h1 className='text-3xl mb-5 text-purple-700'>Login</h1>
			<div style={{ color: 'red' }}>{error}</div>
			<form onSubmit={handleLogin}>
				<input
					className='input input-bordered w-full max-w-xs text-black'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='btn btn-accent ml-5'>Login</button>
			</form>
		</div>
	);
};
