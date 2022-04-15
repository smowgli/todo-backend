const express = require ('express')
const cors = require ('cors')
const { v4 } = require('uuid')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

let todos = []

/* const todoExample = {
    id: '1',
    isCompleted: true,
    content: 'this is todo'
} */

// read all todos (get)
app.get('/todo', (req, res) =>{
    res.status(200).json(todos)
})

// add new todo (post)
app.post('/todo', (req, res) =>{
    const todo = {
        id: v4(),
        isCompleted: false,
        content: req.body.content,
    }
    todos.push(todo)
    res.json(todo)
})

// delete todo (delete)
app.delete('/todo/:id', (req, res) =>{
    todos = todos.filter((todo) =>{
        return todo.id !== req.params.id
    })
    res.json(todos)
})


// toggle complete todo (patch)  Map Application bijective
app.patch('/todo/complete/:id', (req, res) =>{
    todos = todos.map((todo) => {
        if (todo.id === req.params.id) {
            return {
                id: todo.id,
                isCompleted: !todo.isCompleted,
                content: todo.content
            }
        } else {
            return todo
        }
    })
    res.json(todos)
})


app.listen(process.env.PORT)