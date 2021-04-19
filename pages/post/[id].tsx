import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextPageContext } from 'next';

import { MainLayout } from '../../components/MainLayout';
import { IPost } from '../../types/post';

interface IPostProps {
    post: IPost
}

export default function Post({ post: serverPost }: IPostProps) {
    const router = useRouter();
    const [post, setPost] = useState(serverPost);

    const loadPost = async () => {
        const response = await fetch(`http://localhost:4200/posts/${router.query.id}`);
        const post = await response.json();
        setPost(post);
    }

    // Импользуем эффект только на фронте, на сервере отрабатывает getInitialProps
    useEffect(() => {
        if (!serverPost) {
            loadPost();
        }
    }, []);

    if (!post) {
        return <MainLayout>
            <p>Loading...</p>
        </MainLayout>
    }

    return (
        <MainLayout>
            <h1>{post.title}</h1>
            <hr />
            <p>{post.body}</p>
            <Link href="/posts"><a>Back to all posts</a></Link>
        </MainLayout>
    );
}

// Данный метод отрабатывает на сервере, но также отрабатывет на фронте. Чтобы заигнорить отработку на фронте, то проверяем на существование req
// Post.getInitialProps = async ({ query, req }) => {
//     if (!req) {
//         return { post: null }
//     }
//
//     const response = await fetch(`http://localhost:4200/posts/${query.id}`);
//     const post = await response.json();
//
//     return {
//         post
//     }
// }


interface PostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

// Данная функция отрабатывает только на сервере
export async function getServerSideProps({ query }: PostNextPageContext) {
    const response = await fetch(`${process.env.API_URL}/posts/${query.id}`);
    const post: IPost = await response.json();

    return { props: { post } }
}
