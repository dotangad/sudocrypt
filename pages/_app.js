import Head from "next/head";
import App from "next/app";
import { Provider as AuthProvider } from "next-auth/client";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import "../styles/jetbrainsmono.css";
import "../styles/global.css";

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Head>
          <title>Sudocrypt v10.0 | Exun Clan</title>
          <link rel="shortcut icon" href="/logo-blue.png" type="image/png" />
        </Head>
        <div id="__content">
          <Component {...pageProps} />
        </div>
      </ReactQueryCacheProvider>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;
