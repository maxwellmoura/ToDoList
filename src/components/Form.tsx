import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ITask } from '../interface/Task';
import styles from './Form.module.css';

interface Props {
  btnText: string;
  task?: ITask | null;
  addTask?: (task: ITask) => void;
  handleUpdate?(id: number, title: string, dificuldade: number, date: string, completionDate: string): void;
}

const Form = ({ btnText, task, addTask, handleUpdate }: Props) => {
  // Estados para gerenciar os campos do formulário
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [dificuldade, setDificuldade] = useState<number>(0);
  const [date, setDate] = useState<string>(getCurrentDate()); // Inicializa com a data atual
  const [completionDate, setCompletionDate] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  // useEffect para preencher o formulário com os dados da tarefa ao editar
  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDificuldade(task.dificuldade);
      setDate(task.date);
      setCompletionDate(task.completionDate);
    }
  }, [task]);

  // Função para obter a data atual
  function getCurrentDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Manipuladores de mudança para cada campo do formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'dificuldade') {
      const dificuldadeValue = parseInt(e.target.value);
      if (dificuldadeValue <= 5) {
        setDificuldade(dificuldadeValue);
      }
    } else if (e.target.name === 'date') {
      setDate(e.target.value);
    } else if (e.target.name === 'completionDate') {
      setCompletionDate(e.target.value);
    }
  };

  // Manipulador de envio do formulário
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    const errors: string[] = [];
    if (!title) errors.push('O título é obrigatório.');
    if (dificuldade === 0) errors.push('A dificuldade deve ser entre 1 e 5.');
    if (!completionDate) errors.push('A data de conclusão é obrigatória.');

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    if (handleUpdate) {
      // Atualizar a tarefa existente
      handleUpdate(id, title, dificuldade, date, completionDate);
    } else {
      // Adicionar uma nova tarefa
      const id = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id, title, dificuldade, date, completionDate };
      if (addTask) {
        addTask(newTask);
      }

      // Limpar o formulário após adicionar a tarefa
      setTitle('');
      setDificuldade(0);
      setDate(getCurrentDate()); // Atualiza para a data atual
      setCompletionDate('');
    }

    setErrors([]); // Limpar os erros após a submissão bem-sucedida
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {errors.length > 0 && (
        <div className={styles.error}>
          {errors.map((error, index) => (
            <p key={`${error}-${index}`}>{error}</p>
          ))}
        </div>
      )}
      <div className={styles.input_container}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
          required
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="dificuldade">Dificuldade</label>
        <input
          type="number"
          name="dificuldade"
          placeholder="Dificuldade da tarefa (1-5)"
          onChange={handleChange}
          value={dificuldade}
          min="1"
          max="5"
          required
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="date">Data de Criação</label>
        <input
          type="text"
          name="date"
          value={date}
          readOnly // Impedir que o usuário altere a data de criação
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="completionDate">Data de Conclusão</label>
        <input
          type="date"
          name="completionDate"
          placeholder="Data de Conclusão"
          onChange={handleChange}
          value={completionDate}
          required
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default Form;
