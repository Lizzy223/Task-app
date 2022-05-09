
import React from 'react'
import {v4 as uuidv4} from 'uuid'

const TodoList = ({todo, setTodo}) =>{

  const handleComplete = (todos) =>{
    setTodo(
      todo.map((item)=>{
        if (item.id === todos.id){
          return {...item, completed : !item.completed}
        }
        return item
      })
    )
  }

  const handleDelete = ({id}) =>{
      setTodo(todo.filter((todos) => todos.id !==id))
  }

  return(
    <div>
      {
        todo.map((todos) =>(
          <li key={todos.id}
            style={{
              textDecoration:'none',
              padding:'.5rem'
            }}
          >
            <input type='text' value={todos.title} onChange={(e)=>e.preventDefault()} style={{
              color:'black',
              border:'none',
              background:'transparent',
            }} />
            <button type='submit' onClick={ () => handleDelete(todos)} >Delete</button>
            {/* <button type='submit' onClick={ ()=> handleComplete(todos)}>Edit</button> */}
          </li>
        ))
      }
    </div>
  )
}


const Form =({todo, input, setInput, setTodo})=>{

  const onInputChange = (e)=>{
    setInput(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setTodo([...todo, {id:uuidv4(), title:input, completed:false}]);
    setInput(" ")
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter your Task' style={{
          border:'none',
          borderBottom:'1px solid #333',
          background:'none',
          padding:'.75rem',
          marginRight:'1rem',
          color:'#333',
        }} value={input}  onChange={onInputChange} required/>
        <input type='submit' value='Add' style={{
          padding:'1rem .75rem',
          border:'1px solid #000',
          background:'transparent',
          width:'4rem',
          cursor:'pointer',
          color:'#000'
        }} />
      </form>
    </div>
  )
}

export default function Todo() {
  const [input,setInput] = React.useState("");
  const [todo, setTodo] = React.useState([]);
  const [edit, setEdit] = React.useState(null)
  return (
    <div >
     <div
     style={{
       padding:'2rem',
       width:'50%',
       height:'50%',
       display:'block',
       justifyContent:'center',
       alignItems:'center',
       margin:'auto',
       borderRadius:'8px',
     }} >
       <h1
       style={{
         marginTop:'1rem',
         color:'black',
         fontSize:'2rem',
         textAlign:'center',
       }}
       >Task List</h1>
       <br/>
      <Form 
      input={input}
      setInput={setInput}
      todo={todo}
      setTodo={setTodo}
      edit={edit}
      setEdit={setEdit}
      /><TodoList todo={todo} setTodo={setTodo} edit={edit} setEdit={setEdit} />
     </div>
        
    </div>
  )
}
