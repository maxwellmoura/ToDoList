import styles from './Form.module.css'

interface Props  {
  btnText: string
}

const Form = ({btnText}: Props) => {
  return (
    <form className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Titulo:</label>
        <input type="text" name='title' placeholder='Titulo da Tarefa' />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="title">Dificuldade:</label>
        <input type="text" name='dificuldade' placeholder='Dificuldade da Tarefa' />
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}

export default Form