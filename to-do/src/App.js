import { useEffect, useState } from "react"
import "./App.css"
import { PlusIcon } from "@heroicons/react/20/solid"
import { TrashIcon } from "@heroicons/react/24/outline"

function App() {
  const [task, setTask] = useState({
    title: "",
    content: "",
    time_created: new Date(),
    status: "Pending",
  })
  const storedTasks =
    localStorage.getItem("tasks").length &&
    JSON.parse(localStorage.getItem("tasks"))
  const [tasks, setTasks] = useState(storedTasks || [])
  function handleChange(e) {
    const { name, value } = e.target

    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      }
    })
    console.log(task)
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function submit(e) {
    e.preventDefault()
    setTasks([task, ...tasks])
    setTask({
      title: "",
      content: "",
      time_created: new Date(),
      status: "Pending",
    })
  }
  const markTask = (taskIndex) => {
    tasks.find(
      (item, index) => taskIndex === index && (item.status = "Completed")
    )
    localStorage.setItem("tasks", JSON.stringify(tasks))
    setTasks(JSON.parse(localStorage.getItem("tasks")))
  }
  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((Item, index) => {
        return index !== id
      })
    })
  }
  return (
    <div className="p-24">
      <div className="title mb-10">
        <h1 className="text-4xl">To-Do</h1>
      </div>
      <form className="mx-auto mb-8 w-1/3 relative">
        <div className="col-span-full">
          <input
            id="task-title"
            name="title"
            type="text"
            onChange={handleChange}
            value={task.title}
            placeholder="Enter Title"
            autoComplete="tast-title"
            className="block flex-1 border-0 rounded-md focus:outline-none bg-white w-full p-3  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="col-span-full">
          <div className="mt-2">
            <textarea
              id="about"
              name="content"
              rows={3}
              onChange={handleChange}
              value={task.content}
              placeholder="Description"
              className="block b-sha w-full rounded-md p-3 border-0 focus:outline-none py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 mt-5 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div
          className="rounded-full r-btn bg-green-900 w-9 p-1 ml-auto absolute -bottom-3 cursor-pointer right-0"
          onClick={submit}
        >
          <PlusIcon className="text-white" />
        </div>
      </form>
      <div className="mx-auto grid  grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-5 sm:pt-3 lg:mx-0 lg:max-w-none md:grid-cols-3 lg:grid-cols-4">
        {tasks.map((task, index) => (
          <article
            key={index}
            className="flex max-w-2xl mt-5 flex-col items-start bg-white rounded-md px-8 py-10"
          >
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold  font-salsa leading-6 text-gray-900 ">
                <a href="#" className="font-cabin text-2xl">
                  <span className="absolute inset-0" />
                  {task.title}
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 font-ssp text-gray-600">
                {task.content}
              </p>
            </div>
            <div className="flex items-center w-full justify-between gap-x-4 mt-2 text-xs">
              <time className="text-gray-500">
                Task Created -{" "}
                {new Date(task.time_created).toLocaleString("en-GB")}
              </time>
              <a
                href="#"
                className={`relative z-10 capitalize rounded-full ${
                  task.status === "Pending"
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-green-50 text-green-600 hover:bg-green-100"
                }  px-3 py-1.5 font-medium `}
              >
                Task {task.status}
              </a>
            </div>
            <div className="flex items-center w-full justify-between gap-x-4 mt-2 text-xs">
              <a
                href="#"
                onClick={() => {
                  markTask(index)
                }}
                className="relative z-10 capitalize rounded-full bg-green-50 px-3 py-1.5 font-medium text-green-600 hover:bg-green-100"
              >
                {task.status === "Pending" ? "Mark Complete" : "Completed"}
              </a>
              <span> - </span>
              <time className="text-gray-500">{}</time>
            </div>
            <a
              href="#"
              onClick={() => {
                deleteTask(index)
              }}
              className="relative z-10 capitalize rounded-full bg-red-50 px-3 py-1.5 font-medium ml-auto mt-3  text-xs hover:bg-red-100"
            >
              <TrashIcon className="h-5 w-5 text-red-600" />
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

export default App
