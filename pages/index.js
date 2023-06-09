import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request';
import BlogCard from '../components/BlogCard';

const inter = Inter({ subsets: ['latin'] })

const graphCms = new GraphQLClient(
  "https://api-ap-southeast-2.hygraph.com/v2/clf0x57b326tu01tdgbhz9ba9/master"
  );

const QUERY = gql`
{
  posts{
    id,
    title,
    datePublished,
    slug,
    content{
      html
    }
    author{
      name,
      avatar{
        url
      }
    }
    coverPhoto{
      publishedAt
      url
    }
  }
}
`;

export async function getStaticProps() {
  const {posts} = await graphCms.request(QUERY);
  return{
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({posts}) {
  console.log(posts)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Blog Posts</h1>
        <h5>
          - GraphQL with Next.js -
        </h5>
        {posts.map((post) => {
          return <div key={post.id}>
              <BlogCard 
              title={post.title} 
              author={post.author} 
              coverPhoto={post.coverPhoto} 
              key={post.id}
              datePublished={post.datePublished}
              slug={post.slug}
              />
            </div>
        })}
      </main>
    </>
  )
}
