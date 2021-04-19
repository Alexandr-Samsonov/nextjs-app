import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link';
import Head from 'next/head';

import { MainLayout } from '../components/MainLayout';
import { loadPosts } from '../store/actions/post';
import {initializeStore, State} from '../store';

interface IPostsProps {
    initializeStore: State | null
}

export default function Posts({ initializeStore }: IPostsProps) {
    const dispatch = useDispatch()
    const post = useSelector((state: State) => state.post);

    useEffect(() => {
        if (!initializeStore) {
            dispatch(loadPosts());
        }
    }, [])

    if (post.loading) {
        return <MainLayout>
            <p>Loading...</p>
        </MainLayout>
    }

    return (
        <MainLayout>
            <Head>
                <title>Posts page</title>
            </Head>
            <h1>Posts Page</h1>
            <ul>
                {post.allPosts.map(post => (
                    <li key={post.id}>
                        <Link href={`/post/[id]`} as={`/post/${post.id}`}><a>{post.title}</a></Link>
                    </li>
                ))}
            </ul>
        </MainLayout>
    );
}


Posts.getInitialProps = async ({ req }) => {
    if (!req) {
        return {
            initializeStore: null
        }
    }

    const reduxStore = initializeStore();
    const { dispatch } = reduxStore

    await dispatch(loadPosts());

    return { initializeStore: reduxStore.getState() }
}
