import Head from 'next/head'

import Logo from '../assets/logo.svg'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <main>
          <Logo />
        <h1>Hello World</h1>
      </main>
    </div>
  )
}
