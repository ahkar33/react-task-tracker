import Header from "./components/Header"
import Tasks from "./components/Tasks"
import React, { useState } from 'react'
import AddTask from "./components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: true
    },
  ]);

  const addTask = (task) => {
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
    task = { id: id, ...task };
    setTasks((previousTasks) => {
      return [...previousTasks, task];
    });
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id != id));
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map(task => task.id === id
      ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="App">
      <Header
        title='Task Tracker'
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
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
    </div>
  )
}

export default App
