
//Components
import Header from './components/Header'
import Footer from './components/Footer'
//CSS
import styles from './App.module.css'
//Formulario
import Form from './components/Form'
import Lista from './components/Lista'

function App() {
   return (
   <div>
    <Header />
   <main className={styles.main}>
    <div>
      <h2>O que você vai fazer?</h2>
      <Form btnText='Criar Tarefa' />
    </div>
    <div>
      <h2>Suas Tarefas</h2>
      <Lista />
    </div>
   </main>
    <Footer />
   </div>
  )
}

export default App
