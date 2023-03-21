import styles from '@/styles/Slug.module.css'
import { GraphQLClient, gql } from 'graphql-request';
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { TbArrowLeft } from "react-icons/tb";


const inter = Inter({ subsets: ['latin'] })

const graphCms = new GraphQLClient(
  "https://api-ap-southeast-2.hygraph.com/v2/clf0x57b326tu01tdgbhz9ba9/master"
  );

const QUERY = gql`
    query Post($slug: String!){
        post(where: {slug: $slug}){
            id,
            title,
            slug,
            datePublished,
            author{
                id,
                name,
                avatar{
                    url
                }
            }
            content{
                html
            }
            coverPhoto{
                id,
                url
            }
        }
    }
`;

const SLUGLIST = gql`
{
    posts{
        slug
    }
}
`;

export async function getStaticPaths() {
    const {posts} = await graphCms.request(SLUGLIST);
    return{
        paths: posts.map((post) => ({ params: {slug: post.slug} })),
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug;
  const data = await graphCms.request(QUERY, {slug});
  const post = data.post;
  return{
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function BlogPost({post}){
    const router = useRouter()
    return(
        <main className={styles.blog}>

            <div className={styles.goBack} >
                <button type="button" onClick={() => router.back()}>
                <TbArrowLeft /> Go back
                </button>
            </div>

            <div className={styles.imgContainer}>
                <img src={post.coverPhoto.url} className={styles.cover} alt="" />
            </div>

            <div className={styles.authorAvatar}>
                <img src={post.author.avatar.url} className={styles.cover} alt={post.author.name} />
                <p>By {post.author.name}</p>
                <p>|</p>
                <p>{post.datePublished}</p>
            </div>

            <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content.html}}>
            </div>
        </main>
    )
}

// export default function Article() {
//     return <div>article</div>
// }