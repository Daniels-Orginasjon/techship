import type { NextPage } from 'next'
import Head from 'next/head'
import Products from '../components/products'

const Home: NextPage = () => {
  return (
    <div className="min-h-full">
      <Products />
    </div>
  )
}

export default Home
