import { useEffect, useState } from "react"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [todo, setToDo] = useState([])
  const [input, setInput] = useState({
    userid: "",
    id: "",
    title: "",
    body: ""
  })

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(resData => setToDo(resData))
  }, [])

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({ ...input, [name]: value })
  }
  const saveData = (e) => {
    e.preventDefault()

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(input)
    }).then(response => response.json()).then(resData => {
      setToDo([...todo, resData])
      setInput({
        userid: "",
        id: "",
        title: "",
        body: ""
      })
    })
  }

  const deleteData=(index)=>{
    fetch("https://jsonplaceholder.typicode.com/posts",{
      method:"DELETE"
    }).then(setToDo(todo.filter((ob,id)=>id!==index)))
  }
  return <div>

    <form onSubmit={saveData}>
      <input type="number" name="userid" value={input.userid} onChange={handleInput} placeholder="userId" />
      <input type="number" name="id" value={input.id} onChange={handleInput} placeholder="Id" />
      <input type="text" name="title" value={input.title} onChange={handleInput} placeholder="Title" />
      <input type="text" name="body" value={input.body} onChange={handleInput} placeholder="Body" />
      <button>Add</button>
    </form>

    <table className="table">
      <thead>
        <tr>
          <th>S No.</th>
          <th>UserId</th>
          <th>Id</th>
          <th>Title</th>
          <th>Body</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todo.map((ob, index) => <tr key={index}>
          <td>{index + 1}</td>
          <td>{ob.userId}</td>

          <td>{ob.id}</td>

          <td>{ob.title}</td>
          <td>{ob.body}</td>
          <td><button Click={() => editData(index)}>Edit</button></td>
          <td><button onClick={() => deleteData(index)}>Delete</button></td>
        </tr>)}
      </tbody>
    </table>

  </div>
}``