import express from "express";
import {addUser, deleteUser, editUser, getAllUsers, getUser} from "./lib/model.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.get('/users', async(req, res)=>{
    const users = await getAllUsers();
    res.send({users})
})

app.get('/users/:id', async(req, res)=>{
    const {id} = req.params
    const found = await getUser(user => user.id == id);
    if(!found){
        return res.status(404).send({message:"not user found"})
    }
    res.send({user:found})
})


app.post('/users', async(req, res)=>{
    await addUser({...req.body, id: Date.now()})
    res.status(201).send({ok:true})
})


app.patch('/users/:id', async(req, res)=>{
    const found = await getUser(user => user.id == req.params.id);
    if(!found){
        return res.status(404).send({message:"not user found"})
    }
    await editUser({...req.body}, req.params.id);
    res.status(201).send({ok:true}) 
})

app.delete('/users/:id', async(req, res)=>{
    const {id} = req.params
    const found = await getUser(user => user.id == id);
    if(!found){
        return res.status(404).send({message:"not user found"})
    }
    await deleteUser(user => user.id != id)
    res.status(201).send({ok:true});
})

app.listen(3004, ()=>console.log("localhost:3004"))