import { Poppins } from 'next/font/google';
import SiteHeader from './(client-components)/(Header)/SiteHeader';
import ClientCommons from './ClientCommons';
import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import Footer from '@/components/Footer';
import FooterNav from '@/components/FooterNav';
import Providers from './Providers';
import Head from 'next/head';
// import ReactGA from 'react-ga';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'optional',
  weight: ['100', '300', '400', '500', '600', '700', '800'],
});

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
  // ReactGA.initialize('G-40852TP7K2');
  return (
    <html lang='en' className={poppins.className}>
      <Head>
        <script src='https://cdn.auth0.com/js/auth0/9.18/auth0.min.js'></script>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link href='https://fonts.googleapis.com/css2?family=Michroma&display=swap' rel='stylesheet' />
        <link rel='icon' href='https://i.ibb.co/5TkRV2G/Group-4.png' type='image/x-icon' />
      </Head>

      <body className='relative bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200'>
        <Providers>
          <ClientCommons />
          <SiteHeader />
          {children}
          <FooterNav />
          <Footer />
        </Providers>
      </body>
      {/* <script type='text/javascript'>
        {` var lock = new Auth0Lock(" UiTWI15Fm0V7GpLZutKLK2VXe1GjGsRo", "https://auth0.splorite.com", {
          //code omitted for brevity
          configurationBaseUrl: config.clientConfigurationBaseUrl,
          overrides: {
            __tenant: config.auth0Tenant,
            __token_issuer: config.authorizationServer.issuer
          },
        })`}
      </script> */}
    </html>
  );
}
