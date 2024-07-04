//React
import React, { useState, useEffect } from 'react'
//Components
import Header from './components/Header'
import Footer from './components/Footer'
import Modal from './components/Modal'
//CSS
import styles from './App.module.css'
//Formulario
import Form from './components/Form'
import Lista from './components/Lista'
//Interface
import { ITask } from './interface/Task'


function App() {
  //Variável da lista de tarefas
  const [tasks, setTasks] = useState<ITask[]>([])
  //Removendo as tarefas da lista
    const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Função para adicionar uma nova tarefa
  const addTask = (task: ITask) => {
    setTasks([
      ...tasks,
      task
    ])
  }
  // useEffect para monitorar mudanças na lista de tarefas
  useEffect(() => {
    console.log('Lista de tarefas atualizada:', tasks);
  }, [tasks]);

   return (
   <div>
    <Modal />
    <Header />
   <main className={styles.main}>
    <div>
      <h2>O que você vai fazer?</h2>
      <Form btnText='Criar Tarefa' 
      taskList={tasks}
      addTask={addTask} 
      setTaskList={setTasks} />
    </div>
    <div>
      <h2>Suas Tarefas</h2>
      <Lista  
      taskList={tasks}
      handleDelete={deleteTask}
      />
    </div>
   </main>
    <Footer />
   </div>
  )
}

export default App
