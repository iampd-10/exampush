import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");


  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8005/task/getall", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        setTasks(res.data.data);
        localStorage.setItem("taskList", JSON.stringify(res.data.data)); 
      } else {
        toast.error(res.data.message || "Failed to fetch tasks");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.warning("Both title and description are required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8005/task/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success && res.data.data) {
        const createdTask = res.data.data;


        setTasks((prev) => {
          const updated = [...prev, createdTask];
          localStorage.setItem("taskList", JSON.stringify(updated));
          return updated;
        });

        toast.success("Task created successfully");
        setTitle("");
        setDescription("");
      } else {
        toast.error(res.data.message || "Failed to create task");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };


  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await axios.delete(`http://localhost:8005/task/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        setTasks((prev) => {
          const updated = prev.filter((task) => task._id !== id);
          localStorage.setItem("taskList", JSON.stringify(updated));
          return updated;
        });
        toast.success("Task deleted");
      } else {
        toast.error(res.data.message || "Failed to delete task");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>


      <form onSubmit={createTask} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-3">Task List</h3>
        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-start bg-gray-800 p-3 rounded-lg"
              >
                <div>
                  <h4 className="font-bold">{task.title}</h4>
                  <p className="text-gray-400">{task.description}</p>
                </div>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default CreateTask;
