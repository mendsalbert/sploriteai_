// import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
// import '@/styles/globals.css';
import '../styles/globals.css';
import '@/styles/index.scss';
import 'regenerator-runtime/runtime';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Providers from '@/app/Providers';
import ReactGA from 'react-ga';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  ReactGA.initialize('G-40852TP7K2');
  return (
    <div className={inter.className}>
      <Providers>
        <Toaster />
        <Component {...pageProps} />
      </Providers>
    </div>
  );
}

export default appWithTranslation(App);
