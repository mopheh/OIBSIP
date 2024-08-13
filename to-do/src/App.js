import { useEffect, useState } from "react"
import "./App.css"
import { PlusIcon } from "@heroicons/react/20/solid"

function App() {
  const [task, setTask] = useState({
    title: "",
    content: "",
  })
  const storedTasks = JSON.parse(localStorage.getItem("tasks"))
  const [tasks, setTasks] = useState(storedTasks || [])
  function handleChange(e) {
    const { name, value } = e.target

    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      }
    })
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function submit(e) {
    e.preventDefault()
    setTasks([...tasks, task])
    setTask({
      title: "",
      content: "",
    })
  }
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return (
    <div className="p-24">
      <div className="title mb-10">
        <h1 className="text-4xl">To-Do</h1>
      </div>
      <form className="mx-auto mb-5 w-1/3 relative">
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
              className="block w-full rounded-md p-3 border-0 focus:outline-none py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>
        <div
          className="rounded-full bg-green-900 w-9 p-1 ml-auto absolute -bottom-3 cursor-pointer right-0"
          onClick={submit}
        >
          <PlusIcon className="text-white" />
        </div>
      </form>
      <div className="mx-auto grid  grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-5 sm:pt-3 lg:mx-0 lg:max-w-none md:grid-cols-3 lg:grid-cols-4">
        {tasks
          .slice(0)
          .reverse()
          .map((task, index) => (
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
                  {new Date().toLocaleDateString(undefined, options)}
                </time>
                <a
                  href="#"
                  className="relative z-10 capitalize rounded-full bg-red-50 px-3 py-1.5 font-medium text-red-600 hover:bg-red-100"
                >
                  Task Pending
                </a>
              </div>
              <div className="flex items-center w-full justify-between gap-x-4 mt-2 text-xs">
                <a
                  href="#"
                  className="relative z-10 capitalize rounded-full bg-green-50 px-3 py-1.5 font-medium text-green-600 hover:bg-green-100"
                >
                  Mark Complete
                </a>
                <span> - </span>
                <time className="text-gray-500">
                  {new Date().toLocaleDateString(undefined, options)}
                </time>
              </div>
            </article>
          ))}
      </div>
    </div>
  )
}

export default App
