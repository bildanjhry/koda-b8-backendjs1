let users = []

export function create(data){
    users = [...users, 
        {
        ...data,
        id:users.length+1,
    }]
}

export function getAll(){
    return users
}


export function getDetail(id){
 const res = users.filter((item) => item.id === parseInt(id))
    return res
}

export function deleteUser(id){
    console.log("id_"+id)
    users = users.filter((item) => item.id !== parseInt(id))
}