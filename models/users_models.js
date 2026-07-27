let users = []

export function create(data){
    users = [...users, 
        {
        id:users.length+1,
        ...data,
    }]
}

export function getAll(){
    return users
}

export function getDetail(id){
 const res = users.filter((item) => item.id === parseInt(id))
    return res
}

export function delUser(id){
    users = users.filter((item) => item.id !== parseInt(id))
}

export function putUser(id, data){
    users.splice(parseInt(id)-1, 1, {
        id: parseInt(id),
        ...data
    })
    const res = getDetail(id)
    return res
}