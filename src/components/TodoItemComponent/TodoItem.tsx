import React, { useState } from 'react'
import { useTodoContext } from '../../context/TodoContext'
import "./Todo.css"

interface Props {
    text: string,
    handleDelete?: () => void,
    handleEdit?: () => void,
    id: string,
    editing: boolean,
}

const TodoItem: React.FC<Props> = ({ text, id, handleDelete, handleEdit, editing }) => {
    const { setIsEditing, edit, setEdit, handleSaveEdit, handleDeleteTodo } = useTodoContext()

    return (
        <div className={"todo-item"}>
            { 
                editing ? (
                    <input type="text" autoFocus value={edit} placeholder={"Update item... "} onChange={(e) => setEdit(e.target.value)} className={`todo-input`} />
                ) : (
                    <p className={"todo-text"}>{ text }</p>
                )
            }

            <div className={"todo-item-options"}>
                
                {
                    editing ? (
                        <>
                            <button onClick={() => setIsEditing("")} className={`todo-item-option danger`}>Cancel</button>
                            <button onClick={handleSaveEdit} className={"todo-item-option success"}>Save</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(id)} className={`todo-item-option info`}>Edit</button>
                            <button onClick={() => handleDeleteTodo(id)} className={"todo-item-option danger"}>Delete</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default TodoItem