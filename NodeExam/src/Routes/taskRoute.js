import express from 'express'
import { addtask, deleteTask, getTask } from '../controllers/taskController.js'
import { hasToken } from '../middleware/hasToken.js'

const route = express.Router()

route.post('/add', hasToken, addtask);
route.get('/getall', hasToken, getTask)
route.delete('/delete/:id', hasToken, deleteTask);


export default route;