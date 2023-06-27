import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import createTodoRequest from '../api/createTodoRequest';
import { TokenContext } from '../App';

export const CreateTodoForm = () => {
	const [text, setText] = useState('');
	const [token] = useContext(TokenContext);

	const queryClient = useQueryClient();

	const { mutate: createTodo } = useMutation((newTodo) => createTodoRequest(newTodo, token), {
		onSettled: () => {
			queryClient.invalidateQueries('todos');
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				if (!text) return;
				createTodo({
					text,
				});
				setText('');
			}}
		>
			<input type='checkbox' className='checkbox checkbox-lg checkbox-success checkbox-primary invisible mr-5' />
			<input
				onChange={(e) => setText(e.target.value)}
				value={text}
				type='text'
				className='input input-bordered w-full max-w-xs text-black'
			/>
			<button className='btn btn-primary ml-5'>Create</button>
		</form>
	);
};
