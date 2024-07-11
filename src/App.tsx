import { useState, useEffect } from 'react';
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

  // Função para deletar uma tarefa
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Função para exibir o modal de edição com a tarefa selecionada
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

  // Função para atualizar uma tarefa
  const updateTask = (id: number, title: string, dificuldade: number, date: string, completionDate: string) => {
    // Formata a data de conclusão corretamente para o formato esperado no estado da tarefa
    const [year, month, day] = completionDate.split('-');
    const formattedCompletionDate = `${day}/${month}/${year}`;

    const updatedTask: ITask = { id, title, dificuldade, date, completionDate: formattedCompletionDate };
    const updatedItems = tasks.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });
    setTasks(updatedItems);
    tragaModal(false);
  };

  // Função para adicionar uma nova tarefa
  const addTask = (task: ITask) => {
    // Formata a data de conclusão corretamente para o formato esperado no estado da tarefa
    const [year, month, day] = task.completionDate.split('-');
    const formattedCompletionDate = `${day}/${month}/${year}`;

    // Adiciona a nova tarefa ao estado de tarefas
    setTasks([...tasks, { ...task, completionDate: formattedCompletionDate }]);
  };

  // Função para marcar uma tarefa como concluída
  const completeTask = (id: number) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: `${task.title} - Concluída` };
      }
      return task;
    }));
  };

  // Efeito para exibir no console a lista de tarefas sempre que for atualizada
  useEffect(() => {
    console.log('Lista de tarefas atualizada:', tasks);
  }, [tasks]);

  return (
    <div>
      {/* Modal para edição de tarefa */}
      <Modal>
        <Form
          btnText='Editar Tarefa'
          addTask={addTask}
          task={taskToUpdate}
          handleUpdate={updateTask}
        />
      </Modal>

      {/* Cabeçalho da aplicação */}
      <Header />

      {/* Corpo principal da aplicação */}
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          {/* Formulário para criar ou editar tarefa */}
          <Form
            btnText='Criar Tarefa'
            task={taskToUpdate}
            addTask={addTask}
          />
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          {/* Lista de tarefas */}
          <Lista taskList={tasks} handleDelete={deleteTask} handleEdit={editTask} handleComplete={completeTask} />
        </div>
      </main>

      {/* Rodapé da aplicação */}
      <Footer />
    </div>
  );
}

export default App;
