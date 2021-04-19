import { Provider } from 'react-redux';
// import NextNProgress from 'nextjs-progressbar';

import {State, useStore} from '../store';
import '../styles/main.scss'


export default function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initializeStore as State)

    return (
        <Provider store={store}>
            {/*<NextNProgress*/}
            {/*    color="#290"*/}
            {/*    startPosition="0.3"*/}
            {/*    stopDelayMs="200"*/}
            {/*    height="3"*/}
            {/*/>*/}
            <Component {...pageProps} />
        </Provider>
    )
}
