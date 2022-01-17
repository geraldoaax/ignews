import Head from 'next/head'
import styles from './styles.module.scss'


export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | IgNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de Março de 2022</time>
            <strong>Sistema Avançado De Gestão De Frota Easymine Aumenta Em 19% A Massa Média Diária Movimentada</strong>
            <p>Otrabalho de gerenciamento de performance de minas resultou no aumento de 19% na massa média diária movimentada,
              constata consultoria especializada. A WF Mining Analytics implementou um projeto de melhoria contínua em uma empresa mineradora localizada na região do Alto Paranaíba (MG).</p>
          </a>
          <a href="#">
            <time>12 de Março de 2022</time>
            <strong>Sistema Avançado De Gestão De Frota Easymine Aumenta Em 19% A Massa Média Diária Movimentada</strong>
            <p>Otrabalho de gerenciamento de performance de minas resultou no aumento de 19% na massa média diária movimentada,
              constata consultoria especializada. A WF Mining Analytics implementou um projeto de melhoria contínua em uma empresa mineradora localizada na região do Alto Paranaíba (MG).</p>
          </a>
          <a href="#">
            <time>12 de Março de 2022</time>
            <strong>Sistema Avançado De Gestão De Frota Easymine Aumenta Em 19% A Massa Média Diária Movimentada</strong>
            <p>Otrabalho de gerenciamento de performance de minas resultou no aumento de 19% na massa média diária movimentada,
              constata consultoria especializada. A WF Mining Analytics implementou um projeto de melhoria contínua em uma empresa mineradora localizada na região do Alto Paranaíba (MG).</p>
          </a>
        </div>
      </main>
    </>
  )
}