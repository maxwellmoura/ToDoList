import { ITask } from '../interface/Task'; 
import styles from './Lista.module.css';

interface Props {
  taskList: ITask[];
  handleDelete(id: number): void;
  handleEdit(task: ITask): void;
}

const Lista = ({ taskList, handleDelete, handleEdit }: Props) => {
  // Função para formatar a data para o padrão brasileiro
  const formatDateToBrazilian = (date: string): string => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.detalhes}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.dificuldade}</p>
              <p>Data de Criação: {task.date}</p>
              <p>Data de Conclusão: {formatDateToBrazilian(task.completionDate)}</p>
            </div>
            <div className={styles.acao}>
              <button
                className="bi bi-pencil"
                onClick={() => handleEdit(task)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleEdit(task);
                }}
                aria-label="Edit task"
              ></button>
              <button
                className="bi bi-trash"
                onClick={() => handleDelete(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDelete(task.id);
                }}
                aria-label="Delete task"
              ></button>
            </div>
          </div>
        ))
      ) : (
        <p>Não há tarefas cadastradas!</p>
      )}
    </>
  );
};

export default Lista;
