import  { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { ITask } from '../interface/Task';
import styles from './Form.module.css';

// Define as propriedades esperadas pelo componente Form
type Props = {
  btnText: string; // Texto do botão (Criar Tarefa / Editar Tarefa)
  task?: ITask | null; // Tarefa a ser editada (opcional)
  addTask?: (task: ITask) => void; // Função para adicionar nova tarefa (opcional)
  handleUpdate?: (id: number, title: string, dificuldade: number, date: string, completionDate: string) => void; // Função para atualizar tarefa existente (opcional)
};

const Form = ({ btnText, task, addTask, handleUpdate }: Props) => {
  // Estados locais para armazenar os valores dos campos do formulário
  const [id, setId] = useState<number>(0); // ID da tarefa
  const [title, setTitle] = useState<string>(''); // Título da tarefa
  const [dificuldade, setDificuldade] = useState<number>(0); // Dificuldade da tarefa
  const [date, setDate] = useState<string>(''); // Data de criação da tarefa
  const [completionDate, setCompletionDate] = useState<string>(''); // Data de conclusão da tarefa
  const [errors, setErrors] = useState<string[]>([]); // Estado para armazenar os erros de validação

  // Efeito para preencher o formulário com os dados da tarefa a ser editada
  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDificuldade(task.dificuldade);
      setDate(task.date);
      setCompletionDate(task.completionDate || ''); // Garante que completionDate seja tratado corretamente como string vazia se for undefined
    }
  }, [task]);

  // Função para lidar com as mudanças nos campos de entrada do formulário
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'dificuldade') {
      setDificuldade(parseInt(value));
    } else if (name === 'date') {
      setDate(value);
    } else if (name === 'completionDate') {
      setCompletionDate(value);
    }
  };

  // Função para validar os campos do formulário
  const validateFields = (): string[] => {
    const errors: string[] = [];

    // Verifica se todos os campos estão preenchidos
    if (!title) errors.push('O título é obrigatório.');
    if (!dificuldade) errors.push('A dificuldade é obrigatória.');
    if (!date) errors.push('A data de criação é obrigatória.');
    if (!completionDate) errors.push('A data de conclusão é obrigatória.');

    // Verifica se a data de conclusão não é anterior à data atual
    const currentDate = new Date().toISOString().split('T')[0]; // Data atual no formato yyyy-mm-dd
    if (completionDate && completionDate < currentDate) {
      errors.push('A data de conclusão não pode ser anterior à data atual.');
    }

    return errors;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      // Se handleUpdate existir, atualiza a tarefa existente
      if (handleUpdate) {
        handleUpdate(id, title, dificuldade, date, completionDate);
      } else if (addTask) {
        // Se addTask existir, cria uma nova tarefa
        addTask({
          id: Math.floor(Math.random() * 1000), // Gera um ID aleatório para a nova tarefa
          title,
          dificuldade,
          date,
          completionDate,
        });
      }

      // Reseta os campos do formulário
      setTitle('');
      setDificuldade(0);
      setDate('');
      setCompletionDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Renderiza os erros de validação */}
      {errors.length > 0 && (
        <div className={styles.errors}>
          {errors.map((error, index) => (
            <p key={`${error}-${index}`}>{error}</p>
          ))}
        </div>
      )}
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="dificuldade">Dificuldade:</label>
        <input
          type="number"
          name="dificuldade"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={dificuldade}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="date">Data de Criação:</label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={date}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="completionDate">Data de Conclusão:</label>
        <input
          type="date"
          name="completionDate"
          onChange={handleChange}
          value={completionDate}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default Form;
