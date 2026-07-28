import { useState } from "react"
import { useEffect } from "react"
import { FaRegEdit } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";

export default function App() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch('http://localhost:8080/users', {
      headers: {
        "Authorization": "Allow"
      },
    }).then(res => res.json()).then(data => setData(data.results)).catch(err => console.error(err.message))
  }, [])


  function handleUpload(e, id) {
    const file = e.target.files[0]
    const data = new FormData()
    data.append("file", file)
    fetch(`http://localhost:8080/users/${id}/upload`, {
      method: "PUT",
      headers: {
        "Authorization": "Allow"
      },
      body: data
    }).then(res => res.json()).then(data => {
      console.log(data)
      // if (data.success) {
      //   fetch('http://localhost:8080/users', {
      //     headers: {
      //       "Authorization": "Allow"
      //     },
      //   }).then(res => res.json()).then(data => setData(data.results)).catch(err => console.error(err.message))
      // }
    })
  }

  return (
    <div className="flex flex-col bg-black/5 items-center py-10 w-full">
      <h1 className="text-3xl font-medium">Available Users</h1>
      <div className="flex mt-10 flex-col gap-3 w-[40%]">
        {data?.map((item, index) => (
          <div
            key={index}
            className="flex flex-row shadow-sm items-center relative gap-5 bg-white/50 rounded-xl px-5 py-4">
            <div className="bg-slate-300 relative overflow-hidden rounded-full">
              <div className="h-20 absolute w-20 overflow-hidden hover:bg-slate-400/30">
                <label
                  className="w-full h-full justify-center items-center rounded-full cursor-pointer flex"
                  htmlFor={`profile-pic-${item.id}`}>
                </label>
                <input
                  onChange={(e) => { handleUpload(e, item.id) }}
                  className="hidden"
                  type="file" id={`profile-pic-${item.id}`} name="profile-pic" accept=".jpg, .png, .jpeg" />
              </div>
              <img
                className="rounded-full w-20 h-20 object-cover"
                src={`http://localhost:8080/${item.picture}`} alt="profile-picture" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1">
              <h1 className="text-lg font-semibold">{item.name}
              </h1>
                <span>
                  <VscVerifiedFilled className="text-blue-600"/>
                </span>
              </div>
              <h3 className="text-gray-500">@{item.email}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}