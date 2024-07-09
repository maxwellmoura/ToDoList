import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './Form.module.css';
import { ITask } from '../interface/Task';

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  addTask: (task: ITask) => void;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, dificuldade: number, date: string, completionDate: string): void;
}

const Form = ({ btnText, taskList, task, addTask, setTaskList, handleUpdate }: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [dificuldade, setDificuldade] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [completionDate, setCompletionDate] = useState<string>('');

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDificuldade(task.dificuldade);
      setDate(task.date);
      setCompletionDate(task.completionDate);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString();
    if (handleUpdate) {
      handleUpdate(id, title, dificuldade, date, completionDate);
    } else {
      const newId = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id: newId, title, dificuldade, date: currentDate, completionDate };
      if (setTaskList) {
        setTaskList([...taskList, newTask]);
      }
      addTask(newTask);
    }
    setTitle('');
    setDificuldade(0);
    setCompletionDate('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'dificuldade') {
      setDificuldade(parseInt(e.target.value));
    } else if (e.target.name === 'completionDate') {
      setCompletionDate(e.target.value);
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
      <div className={styles.input_container}>
        <label htmlFor="completionDate">Data de Conclusão:</label>
        <input
          type="date"
          name="completionDate"
          placeholder="Data de Conclusão da Tarefa"
          onChange={handleChange}
          value={completionDate}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default Form;
