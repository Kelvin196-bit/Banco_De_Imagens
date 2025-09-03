import { useState } from 'react'
import './App.css'
import Cadastro from './Cadastro'
import Exibir from './Exibir'
import Layout from './Layout'

function App() {
    const [page, SetPage] = useState("cadastro")
  return (
    <>
    <Layout SetPage={SetPage}>
      {page === "cadastro" && <Cadastro/>}
      {page === "exibir" && <Exibir/>}
    </Layout>
    </>
  )
}

export default App
