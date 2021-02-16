import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="app">
      <Head>
        <title>Kudo Survey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mainContent">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
