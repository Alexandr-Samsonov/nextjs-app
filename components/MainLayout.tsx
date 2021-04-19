import Link from 'next/link';
import Head from 'next/head';

export function MainLayout({ children, title = 'Next App' }) {
    return (
        <>
            <Head>
                <title>{title} | NextJS App</title>
                <meta name="keywords" content="ключевые слова" />
                <meta name="description" content="this is nextjs" />
                <meta charSet="utf-8" />
            </Head>
            <nav>
                <Link href="/"><a>Home</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/posts"><a>Posts</a></Link>
            </nav>
            <main>
                {children}
            </main>
            <style jsx>
                {`
                    nav {
                        position: fixed;
                        left: 0;
                        top: 0;
                        right: 0;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        height: 68px;
                        background: darkblue;
                    }
                    
                    nav a {
                        color: #fff;
                        text-decoration: none;
                    }
                    
                    main {
                        margin-top: 60px;
                        padding: 1rem 
                    }
                `}
            </style>
        </>
    );
}
