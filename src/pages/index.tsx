import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'

export default function Home() {
  return (

    <>
      <Head>     
        <title>Home | IG.News</title>
      </Head>

     <main  className={styles.contentContainer}>
       <section className={styles.hero}>
        <span> 👏 Hey, Welcome</span>
        <h1>News About the <span>React</span> World.</h1>
        <p>
          Get acess to all the publications <br />
          <span>for $9,90 month</span>
        </p>
         
    
       </section>
       <Image  src="/images/avatar.svg" alt="Girl Coding" width={500} height={500}/>

     </main>
    </>
  )
}
