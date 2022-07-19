import { createContext, useContext, useEffect, useState } from "react"


interface Props {
    children: any
}

interface Todo {
	id: string,
	text: string,
}

interface TodoContextProps {
    todos: Todo[],
    setTodos: (todos: Todo[]) => void,
    handleAddTodo: () => void,
    text: string,
    setText: (text: string) => void,
    isEditing: string | number,
    setIsEditing: (isEditing: string) => void,
    setEdit: (edit: string) => void,
    edit: string,
    handleSaveEdit: () => void,
    handleDeleteTodo: (id: string) => void,
}

type Context = 
    | TodoContextProps 
    | null


const TodoContext = createContext<Context>(null)


const TodoContextProvider: React.FC<Props> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([])
	const [text, setText] = useState<string>("")
    const [isEditing, setIsEditing] = useState<string>("")
    const [edit, setEdit] = useState<string>("")

	const handleAddTodo = (): void => {
		if(text) {
			const todo: Todo = {
				id: new Date(Date.now()).getTime().toString(),
				text
			}
            const DB = [...todos, todo]
			setTodos(prev => [...prev, todo])
			setText("")
            localStorage.setItem("TODOS", JSON.stringify(DB))
		}
	}

    const handleSaveEdit = (): void => {
        if(isEditing) {
            const item = todos.find(todo => todo.id === isEditing)
            if(item) {
                item.text = edit
                const index = todos.findIndex(todo => todo.id === isEditing)
                const todoItems = todos
                todoItems.splice(index, 1, item)

                setTodos(todoItems)
                setEdit("")
                setIsEditing("")
                localStorage.setItem("TODOS", JSON.stringify(todoItems))
            }
        }
    } 

    const handleDeleteTodo = (id: string): void => {
        const todoItems = todos.filter(todo => todo.id !== id)
        setTodos(todoItems)
        localStorage.setItem("TODOS", JSON.stringify(todoItems))
    }

    useEffect(() => {
        if(isEditing) {
            const item: Todo | undefined = todos.find((todo) => todo.id === isEditing)
            let text = item?.text || ""
            setEdit(text)
        }
    }, [isEditing])

    useEffect(() => {
        const DB = localStorage.getItem("TODOS")
        if(DB) {
            setTodos(JSON.parse(DB))
        }
        console.log("is called")
    }, [])

    return (
        <TodoContext.Provider value={{ handleAddTodo, todos, text, setTodos, setText, setIsEditing, isEditing, edit, setEdit, handleSaveEdit, handleDeleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider

const useTodoContext = () => {
    const context = useContext(TodoContext)
    if(!context) {
        throw new Error("useTodoContext must be used within a TodoContextProvider")
    }
    return context
}

export { useTodoContext, TodoContext } 