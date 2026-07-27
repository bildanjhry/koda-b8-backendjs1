import fs from "node:fs"

let users = []

export function create(data) {

	try {

		let formated = []

		if(fs.existsSync("./models/users.json")){
			const file = fs.readFileSync("./models/users.json", 'utf-8')
		  formated = JSON.parse(file)
			if (formated.find((item) => item.email === data.email)) {
				throw new Error("Email already being used")
			}
		}
		users = [...formated,
		{
			id: formated.length + 1,
			...data,
		}]
		fs.writeFileSync("./models/users.json", JSON.stringify(users))
	} catch (err) {
		console.error(err.message)
		return false
	}

	return true
}

export function getAll() {

	try{
		const file = fs.readFileSync("./models/users.json", 'utf-8')
		const formated = JSON.parse(file)
		return formated
	}catch(err){
		console.error(err.message)
		return []
	}
}

export function getDetail(id) {

	try{
		if(!fs.existsSync("./models/users.json")){
			throw new Error("Users are empty")
		}
		const file = fs.readFileSync("./models/users.json", 'utf-8')
		const formated = JSON.parse(file)
		const res = formated.filter((item) => item.id === parseInt(id))
		return res
	} catch(err){
		console.log(err.message)
		return []
	}
}

export function delUser(id) {
	users = users.filter((item) => item.id !== parseInt(id))
}

export function putUser(id, data) {
	users.splice(parseInt(id) - 1, 1, {
		id: parseInt(id),
		...data
	})
	const res = getDetail(id)
	return res
}