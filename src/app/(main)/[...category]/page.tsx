import { Metadata } from 'next'
import Head from 'next/head'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'PrintInc Shop',
    description: 'Shop for print-ready high-resolution PNG files',
  }
}

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>PrintInc Shop</title>
        <meta name="description" content="Shop for print-ready high-resolution art and design." />
      </Head>
    </>
  )
}
