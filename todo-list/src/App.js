import { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';

export default function App () {

  let [todoList, setTodoList] = useState([])
  
 


  
  
  let saveToDoList = (event) => {

    let toname = event.target.toname.value;
    if(!todoList.includes(toname)){
      let finalTodoList =[...todoList, toname]
      setTodoList(finalTodoList)
      toast.success('ToDo added successfully')


    }
    else(toast.error('This ToDo is already exists'))

    event.preventDefault();// for not reloading the web app when user hits save
  }

  let list = todoList.map((value, index) =>{
    return(
      <TodoListItems value={value}  key = {index} indexNum = {index} todoList={todoList} setTodoList={setTodoList}/>
    )
      
    })
  
  return(
    <div className='App'>
      <ToastContainer/>
      <h1>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type='text' name ='toname'/><button>Save</button>
      </form>

      <div className='outerDiv'>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  )
}


function TodoListItems ({value, indexNum, todoList, setTodoList}) {

  let [status, setStatus] = useState(false)

  let deleteRow = () => {
    let finalData = todoList.filter((value,i)=>i!==indexNum)
    setTodoList(finalData)
    toast.info('removed successfully')
  }
  return (
    <li className={(status)? 'completeTodo' : ''} onClick={()=>setStatus(!status)}> 
    {`(${indexNum + 1})-`} {value}
      <span onClick={deleteRow}>&times;</span>
    </li>
  )
}
