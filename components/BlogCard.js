import Link from 'next/link';
import styles from '../styles/BlogCard.module.css';

export default function BlogPost({
    title, 
    author, 
    coverPhoto, 
    datePublished, 
    slug
}){
    return(
        <div className={styles.card}>
            <Link href={'/posts/' + slug}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt='blog cover photos' />
                </div>
                <div className={styles.text}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.authorAvatar}>
                    <img src={author.avatar.url} alt={author.name} />
                    <p>Author: {author.name}</p>
                    <p>|</p>
                    <p>{datePublished}</p>
                </div>
            </Link>
        </div>
    )
} 