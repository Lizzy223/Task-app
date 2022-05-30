import {Box, Text, HStack,  Input, Form, Button, Stack} from '@chakra-ui/react'
import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import {BiLike, BiDislike} from 'react-icons/Bi'

const TodoList = ({todo, setTodo}) =>{

  const [input, setInput] = useState();
  const [reply, setReply] = useState([])
  const [show, setShow] = useState(false)

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
            <HStack spacing={2}>
              <input type='text' value={todos.title} onChange={(e)=>e.preventDefault()} style={{
                color:'black',
                border:'none',
                background:'transparent',
              }} />
              <Button type='submit' onClick={ () => handleDelete(todos)} >Delete</Button>
              <Button type='submit' mx='0.7rem' onClick={()=>setShow(!show)} >Reply</Button>
            </HStack>
            { show ?
            <Comment input={input} setInput={setInput} reply={reply} setReply={setReply} /> : null}
            <CommentList reply={reply} setReply={setReply} />

            {/* <button type='submit' onClick={ ()=> handleComplete(todos)}>Edit</button> */}
          </li>
        ))
      }
    </div>
  )
}

const Comment = ({reply, setReply, input, setInput}) =>{
  const [show, setShow] = useState(false);
  const onInputChange = (e)=>{
    setInput(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setReply([...reply, {id:uuidv4(), title:input, completed:false}]);
    setInput(" ")
  }
  return(
    <form onSubmit={handleSubmit}>
      <HStack p='.5rem'>
        <input type='text' value={input}  onChange={onInputChange} 
           style={{
            border:'none',
            borderBottom:'1px solid #333',
            background:'none',
            padding:'.75rem',
            marginRight:'1rem',
            color:'#333',}}
          placeholder='Add a Comment'/>
          <input type='submit' value='Reply' style={{
          padding:'.5rem .75rem',
          border:'1px solid #000',
          background:'transparent',
          width:'4rem',
          cursor:'pointer',
          color:'#000'
        }} />
        <HStack spacing={2}>
              <BiDislike onClick={() => setShow(!show)} /> { show ? <BiDislike color='blue'/> : <BiDislike/> }
              <BiLike onClick={() => setShow(!show)}/>{  show? <BiLike color='blue'/> : <BiLike/> }
          </HStack>
        </HStack>
    </form>
  )
}


const Forms =({todo, input, setInput, setTodo})=>{

  const onResponseChange = (e)=>{
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
        <HStack>
        <input type='text' placeholder='Enter your Task' style={{
          border:'none',
          borderBottom:'1px solid #333',
          background:'none',
          padding:'.75rem',
          marginRight:'1rem',
          color:'#333',
        }} value={input}  onChange={onResponseChange} required/>
        <input type='submit' value='Add' style={{
          padding:'1rem .75rem',
          border:'1px solid #000',
          background:'transparent',
          width:'4rem',
          cursor:'pointer',
          color:'#000'
        }} />
        </HStack>
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
       padding:'1rem',
       width:'95%',
       height:'100%',
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
      <Forms 
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

const CommentList =({reply, setReply}) =>{
  const [show, setShow] = useState(false);

  const handleDelete = ({id}) =>{
    setReply(reply.filter((replies) => replies.id !==id))
}

  return(
    <>
      <Box spacing={2} w='50%' h='50%' overflow='auto'  mt='.5rem' ml='1rem' boxShadow='2px 2px 2px rgba(0.3, 0.3, 0.3, #333)' p='.5rem' >
        {/* <Text color='blue' float='right' >Reply</Text> */}
        { reply.map((replys) =>(
        <Stack key={replys.id} borderLeft='2px solid blue' p='.5rem' mt='.2rem'>
           <input type='text' value={replys.title} onChange={(e)=>e.preventDefault()} style={{
              color:'black',
              border:'none',
              background:'transparent',
            }} />
          <HStack spacing={2}>
              <BiDislike onClick={() => setShow(!show)} /> { show ? <BiDislike color='blue'/> : <BiDislike/> }
              <BiLike onClick={() => setShow(!show)}/>{  show? <BiLike color='blue'/> : <BiLike/> }
              <Text color='red' cursor='pointer' onClick={handleDelete(replies)} >Delete</Text>
          </HStack>
        </Stack>
        ))
}
      </Box>
    </>
  )
}
