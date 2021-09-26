import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <p id="page">home</p>
      <Link href="/test">
        <a>test</a>
      </Link>
    </div>
  )
}

export async function getStaticProps(context) {
  console.log('Fetching page props!')
  return {
    props: {
      layout: false,
    },
    revalidate: 1,
  }
}
