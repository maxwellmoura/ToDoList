//React, useState(Manuzear o estado), ChangeEvent(Manuzear o evento), FormEvent(Submeter o Formulario) e useEfect()
import React, {useState, ChangeEvent, FormEvent,} from 'react'
import styles from './Form.module.css'
//Interface
import { ITask } from '../interface/Task'

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  addTask: (task: ITask) => void;
}

const TaskForm = ({ btnText, taskList, addTask, setTaskList }: Props) => {
  // Criação de variáveis

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [dificuldade, setDificuldade] = useState<number>(0);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000);
    const newTask: ITask = { id, title, dificuldade };
    setTaskList!([...taskList, newTask]); //União da taskList e a newTask
    addTask(newTask);
    setTitle(''); //Limpar o campo de titulo após a submissão
    setDificuldade(0); //Limpar o campo de dificuldade
    console.log(taskList)
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setDificuldade(parseInt(e.target.value));
    }
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da Tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="dificuldade">Dificuldade:</label>
        <input
          type="number"
          name="dificuldade"
          placeholder="Dificuldade da Tarefa"
          onChange={handleChange}
          value={dificuldade}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;