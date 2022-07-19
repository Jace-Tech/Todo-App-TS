import { useEffect, useState } from 'react'
import "./App.css"
import TodoItem from './components/TodoItemComponent/TodoItem'
import { useTodoContext } from './context/TodoContext'


const App = () => {
	const {todos, text, setText, handleAddTodo, isEditing} = useTodoContext()

	useEffect(() => {
		console.log(todos)
	}, [todos])

	return (
		<div className={"App"}>
			<div className={"container"}>
				<div className={"input-container"}>
					<input placeholder={"Enter todo item.."} type="text" value={text} onChange={(e) => setText(e.target.value)} />
					<button onClick={handleAddTodo}>Add Todo</button>
				</div>

				<div className={"items-container"}>
					{
						todos.map(todo => <TodoItem key={todo.id} editing={isEditing === todo.id} {...todo} />)
					}
					{ todos.length === 0 && <p className={"not-found"}>No todos</p> }
				</div>
			</div>
		</div>
	)
}

export default App
