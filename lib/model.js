import {readFile, writeFile} from 'fs/promises'

export const getAllUsers = async()=>{
    const result = await readFile('./data.json', 'utf-8');
    if(!result) return []
    return JSON.parse(result)
}

export const getUser = async(cb)=>{
    const users = await getAllUsers();
    return users.find(cb)
}

export const addUser = async(user)=>{
    const users = await getAllUsers();
    users.push(user)
    await writeFile('./data.json', js.stringify(users))
}

export const deleteUser = async(cb)=>{
    const users = await getAllUsers();
    const updateUsers = users.filter(cb)
    await writeFile('./data.json', JSON.stringify(updateUsers))
}


export const editUser = async(body, id)=> {
    const users = await getAllUsers()
    const user = users.find(user => user.id == id)
    Object.assign(user, body)
    await writeFile('./data.json', JSON.stringify(users))
}

