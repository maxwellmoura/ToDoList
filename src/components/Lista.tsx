//React
import React from "react"
//Interface
import { ITask } from "../interface/Task"
//CSS
import styles from "./Lista.module.css"

interface Props  {
  taskList: ITask[] //Lista de tarefas
  handleDelete(id: number): void //Função para deletar uma tarefa
}

const Lista = ({taskList, handleDelete}: Props) => {
  return (
    <>
    {taskList.length > 0 ?(
      taskList.map((task) =>(
        <div key={task.id} className={styles.task}>
          <div className={styles.detalhes}>
            <h4>{task.title}</h4>
            <p>Dificuldade: {task.dificuldade}</p>
          </div>
          <div className={styles.acao}>
            <i className="bi bi-pencil"></i>
            <i className="bi bi-trash" onClick={() => handleDelete(task.id)}></i>
          </div>
        </div>
      ))
    ): (
      <p>Não há tarefas cadastradas</p>
    )}
    </>
  )
}

export default Lista