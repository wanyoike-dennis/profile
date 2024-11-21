import { useEffect, useState } from "react";
import { dummyData } from "../todos";
import { Todo } from "../types/todos";

export default function useTodos(){
    const [todos,setTodos] = useState(() => {
        const savedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]")
        return savedTodos.length > 0 ? savedTodos : dummyData
      });
    
      useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todos))
      },[todos])
      function setToDoCompeted(id:number,completed:boolean){
       setTodos((prevTodos) =>
       prevTodos.map((todo) => (todo.id=== id ? {...todo,completed} : todo))
       ) ;
       }
    
       function addTodo(title:string){
        setTodos((prevTodos) => [
          {
            id:Date.now(),
            title,
            completed:false,
          },
          ...prevTodos,
        ]) 
       }
    
       function deleteTodo(id:number){
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
       }
    
       function deleteAllCompletedTodos(){
        setTodos(prevTodos => prevTodos.filter((todo) => !todo.completed) );
       }

       return{
        todos,
        setTodos,
        setToDoCompeted,
        addTodo,
        deleteTodo,
        deleteAllCompletedTodos
       }
}