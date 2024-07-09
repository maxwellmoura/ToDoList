import React from 'react';
import { ITask } from '../interface/Task';
import styles from './Lista.module.css';

interface Props {
  taskList: ITask[];
  handleDelete(id: number): void;
  handleEdit(task: ITask): void;
}

const Lista = ({ taskList, handleDelete, handleEdit }: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.detalhes}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.dificuldade}</p>
              <p>Data de Criação: {task.date}</p>
              <p>Data de Conclusão: {task.completionDate}</p>
            </div>
            <div className={styles.acao}>
              <i
                className="bi bi-pencil"
                role="button"
                tabIndex={0}
                onClick={() => handleEdit(task)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleEdit(task);
                }}
              ></i>
              <i
                className="bi bi-trash"
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(task.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleDelete(task.id);
                }}
              ></i>
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
