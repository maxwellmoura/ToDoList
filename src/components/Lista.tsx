import { ITask } from '../interface/Task';
import styles from './Lista.module.css';

interface Props {
  taskList: ITask[];
  handleDelete(id: number): void;
  handleEdit(task: ITask): void;
  handleComplete(id: number): void;
}

const Lista = ({ taskList, handleDelete, handleEdit, handleComplete }: Props) => {
  // Função para formatar a data no padrão dia/mês/ano
  const formatDateToBrazilian = (date: string): string => {
    if (date.includes('-')) {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    }
    return date; // Retorna a data no formato original se não estiver no padrão esperado
  };

  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.detalhes}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.dificuldade}</p>
              <p>Data de Criação: {formatDateToBrazilian(task.date)}</p> {/* Exibe a data de criação formatada */}
              <p>Data de Conclusão: {formatDateToBrazilian(task.completionDate)}</p>
            </div>
            <div className={styles.acao}>
              {/* Botões de ação */}
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
              <button
                className="bi bi-check"
                onClick={() => handleComplete(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleComplete(task.id);
                }}
                aria-label="Complete task"
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
