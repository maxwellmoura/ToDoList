//React
import React from "react"
//Interface
import { ITask } from "../interface/Task"
//CSS
import styles from "./Lista.module.css"

interface Props  {
  taskList: ITask[]
}

const Lista = ({taskList}: Props) => {
  return (
    <>
    {taskList.length > 0 ?(
      taskList.map((task) =>(
        <div key={task.id}>
          <p>{task.title}</p>
        </div>
      ))
    ): (
      <p>Não há tarefas cadastradas</p>
    )}
    </>
  )
}

export default Lista