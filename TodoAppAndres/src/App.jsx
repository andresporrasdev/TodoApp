import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { v4 as uuid} from "uuid";
import PropTypes from 'prop-types';

function App() {
  const [items, setItems] = useState([
    { id: 1, content: "pay bills", done: true },
    { id: 2, content: "learn React", done: false },
  ]);
  const [input, setInput] = useState("")
 
  const handleOnChange = e => {
    setInput(e.target.value)
    console.log(input)
  }
  
  const handleOnSubmit = e =>{
    e.preventDefault();
    setItems([{id: uuid(), content: input, done: false}, ...items])
      console.log("calling Submit", items)
      setInput("")
  }

  const handleDelete = id => {
    setItems(items.filter (item => item.id !==id));
    console.log("Deleted item with the id", id)
  }

  const taskDown = id => {
    const index = items.findIndex(item => item.id === id);
    if (index === items.length - 1) return;
    else {
      const updatedItems = [...items];
      const previousIndex = updatedItems[index];
      const nextIndex = updatedItems[index+1];
      updatedItems[index+1] = previousIndex;
      updatedItems[index] = nextIndex;
      setItems(updatedItems);
    }
  }

  const taskUp = id => {
    const index = items.findIndex(item => item.id === id);
    if (index === 0) return;
    const updatedItems = [...items];
    const previousIndex = updatedItems[index];
    const nextIndex = updatedItems[index-1];
    updatedItems[index-1] = previousIndex;
    updatedItems[index] = nextIndex;
    setItems(updatedItems);
  }

  function Item ({id, content, done, onDelete}) {
    return(
      <li key={id}>
        <input className="form-check-input" type="checkbox" aria-label="..."/>
        <span className={done ? "done" : ""}>{content}</span>
        <button className='btn btn-danger btn-sm' onClick={()=>onDelete(id)}>Delete</button>
        <button className='btn btn-info btn-sm'onClick={()=>taskUp(id)}>up</button>
        <button className='btn btn-info btn-sm' onClick={()=>taskDown(id)}>down</button>
      </li>
    )
  };

    Item.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired
    };
   
  return (
    <>
      <form className='form-group' onSubmit={handleOnSubmit} onChange={handleOnChange}>
        <h1 className='h1-primarly'>Todo List Andres</h1>
        <input type='text' className='form-control' placeholder='Write a task' ></input>
        <button type='submit' className='btn btn-primary'>Add</button>
      </form>
      <ul>
        {items.map(item => (
          <Item key={item.id} {...item} onDelete={handleDelete}/> 
          ))}
      </ul>
    </>
  )
}

export default App
