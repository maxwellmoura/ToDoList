import  { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Form from './components/Form';
import Lista from './components/Lista';
import styles from './App.module.css';
import { ITask } from './interface/Task';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  // Função para deletar uma tarefa pelo ID
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Função para exibir ou esconder o modal
  const tragaModal = (display: boolean) => {
    const modal = document.querySelector('#modal');
    if (display) {
      modal!.classList.remove('hide');
    } else {
      modal!.classList.add('hide');
    }
  };

  // Função para editar uma tarefa
  const editTask = (task: ITask): void => {
    tragaModal(true);
    setTaskToUpdate(task);
  };

  // Função para atualizar uma tarefa existente
  const updateTask = (id: number, title: string, dificuldade: number, date: string, completionDate: string) => {
    const updatedTask: ITask = { id, title, dificuldade, date, completionDate };
    const updatedItems = tasks.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });
    setTasks(updatedItems);
    tragaModal(false);
  };

  // Função para adicionar uma nova tarefa
  const addTask = (task: ITask) => {
    setTasks([...tasks, task]);
  };

  // useEffect para exibir a lista de tarefas no console quando é atualizada
  useEffect(() => {
    console.log('Lista de tarefas atualizada:', tasks);
  }, [tasks]);

  return (
    <div>
      <Modal>
        <Form
          btnText='Editar Tarefa'
          addTask={addTask}
          task={taskToUpdate}
          handleUpdate={updateTask}
        />
      </Modal>
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <Form
            btnText='Criar Tarefa'
            task={taskToUpdate}
            addTask={addTask}
          />
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <Lista taskList={tasks} handleDelete={deleteTask} handleEdit={editTask} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
