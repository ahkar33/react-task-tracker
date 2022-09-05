import Header from "./components/Header"
import Tasks from "./components/Tasks"
import React, { useEffect, useState } from 'react'
import AddTask from "./components/AddTask";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      setError(error.message);
      setTasks(null);
    }
  }

  const getOneTask = async (id) => {
    const res = await axios.get(`http://localhost:5000/tasks/${id}`)
    return res.data;
  }

  const addTask = async (task) => {
    const response = await axios.post(`http://localhost:5000/tasks`, task);
    const data = response.data;
    setTasks([...tasks, data]);
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task.id != id)); // this is for ui
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await getOneTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
    const data = await res.data;

    setTasks(tasks.map(task => task.id === id
      ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          title='Task Tracker'
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {
                  showAddTask &&
                  <AddTask onAdd={addTask} />
                }
                {
                  tasks.length > 0 ?
                    <Tasks tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                    : 'No Task To Show'
                }
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
