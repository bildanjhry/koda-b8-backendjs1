import fs from "node:fs"

export function create(data) {

	try {
		let formated = []

		if(fs.existsSync("./src/models/users.json")){
			const file = fs.readFileSync("./src/models/users.json", 'utf-8')
		  formated = JSON.parse(file)
			if (formated.find((item) => item.email === data.email)) {
				throw new Error("Email already being used")
			}
		}
		let users = []
		users = [...formated,
		{
			id: formated.length + 1,
			...data,
		}]
		fs.writeFileSync("./src/models/users.json", JSON.stringify(users))
	} catch (err) {
		console.error(err.message)
		return false
	}

	return true
}

export function getAll({
	limit = '5', page='1'}) {
	const args = {...arguments}
	const search = args[0]?.search
	const sort = args[0]?.sort

	try{
		const file = fs.readFileSync("./src/models/users.json", 'utf-8')
		const formated = JSON.parse(file)
		if (search){
			return formated.filter((item) => item.name === search.name)
		}
		if(sort){
			switch(sort){
				case 'name':
					formated.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
					break;
				case 'email':
					formated.sort((a, b) => a.email.toLowerCase().localeCompare(b.email.toLowerCase()))
					break;
				default:
			}
		}
		return formated.slice((parseInt(page)*parseInt(limit)) - parseInt(limit), parseInt(limit)*parseInt(page))
	}catch(err){
		console.error(err.message)
		return []
	}
}

export function getDetail(id) {

	try{
		if(!fs.existsSync("./src/models/users.json")){
			throw new Error("Users are empty")
		}
		const file = fs.readFileSync("./src/models/users.json", 'utf-8')
		const formated = JSON.parse(file)
		const res = formated.filter((item) => item.id === parseInt(id))
		return {succes:true, result:res}
	} catch(err){
		console.log(err.message)
		return {succes:false, message:err.message}
	}
}

export function delUser(id) {
	try {
		if(!fs.existsSync("./src/models/users.json")){
			throw new Error("Users are empty")
		}
		const file = fs.readFileSync("./src/models/users.json", 'utf-8')
		const formated = JSON.parse(file)
		let newFile = formated.filter((item) => item.id !== parseInt(id))
		if(newFile.length === formated.length){
			throw new Error("No user matches")
		}
		fs.writeFileSync("./src/models/users.json", JSON.stringify(newFile))

		return {succes: true, message:""}
	} catch(err){
		console.error(err.message)
		return {succes: false, message:err.message}
	}
}

export function putUser(id, data) {
	try{
		if(!fs.existsSync("./src/models/users.json")){
			throw new Error("Users are empty")
		}
		const file = fs.readFileSync("./src/models/users.json", 'utf-8')
		const formated = JSON.parse(file)
		const newUsers = formated
		let dataUser = newUsers.filter((item) => item.id !== parseInt(id))
		if(dataUser.length === formated.length){
			throw new Error("No user matches")
		}
		newUsers.splice(parseInt(id) - 1, 1, {
			id: parseInt(id),
			...data
		})
		fs.writeFileSync("./src/models/users.json", JSON.stringify(newUsers))
		const res = getDetail(id)
		return{succes:true, result:res}

	} catch(err){
		console.error(err.message)
		return{succes:false, message:err.message, result:[]}
	}
}

export function uploadPic(id, data){
	
	try{
		if(!fs.existsSync("./src/models/users.json")){
			throw new Error("Users are empty")
		}
		const file = fs.readFileSync("./src/models/users.json", 'utf-8')
		const formated = JSON.parse(file)
		const newUsers = formated
		let dataUser = newUsers.filter((item) => item.id !== parseInt(id))
		let choosen = newUsers.filter((item) => item.id === parseInt(id))
		if(dataUser.length === formated.length || choosen.length < 1){
			throw new Error("No user matches")
		}
		newUsers.splice(parseInt(id) - 1, 1, {
			id: parseInt(id),
			...choosen[0],
			picture:data.path
		})
		fs.writeFileSync("./src/models/users.json", JSON.stringify(newUsers))
		const res = getDetail(id)
		return{succes:true, result:res}

	} catch(err){
		console.error(err.message)
		return{succes:false, message:err.message, result:[]}
	}
}