import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useQueryClient, useMutation, QueryClient } from 'react-query';
import deleteTodoRequest from '../api/deleteTodoRequest';
import updateTodoRequest from '../api/updateTodoRequest';
import { debounce } from 'lodash';
import { TokenContext } from '../App';

export const TodoItem = ({ todo }) => {
	const [text, setText] = useState(todo.text);
	const [token] = useContext(TokenContext);

	const queryClient = useQueryClient();

	const { mutate: updateTodo } = useMutation((updatedTodo) => updateTodoRequest(updatedTodo, token), {
		onSettled: () => {
			queryClient.invalidateQueries('todos');
		},
	});

	const { mutate: deleteTodo } = useMutation((updatedTodo) => deleteTodoRequest(updatedTodo, token), {
		onSettled: () => {
			queryClient.invalidateQueries('todos');
		},
	});

	const debouncedUpdateTodo = useCallback(debounce(updateTodo, 600), [updateTodo]);

	useEffect(() => {
		if (text !== todo.text) {
			debouncedUpdateTodo({
				...todo,
				text,
			});
		}
	}, [text]);

	return (
		<div
			style={{
				marginBottom: '6px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<input
				checked={todo.completed}
				type='checkbox'
				className='checkbox checkbox-lg checkbox-success checkbox-primary mr-5'
				onChange={() =>
					updateTodo({
						...todo,
						completed: !todo.completed,
					})
				}
			/>

			<input
				className='input input-bordered w-full max-w-xs text-black'
				type='text'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button className='btn btn-danger ml-5' onClick={() => deleteTodo(todo)}>
				delete
			</button>
		</div>
	);
};
