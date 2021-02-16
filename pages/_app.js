import Layout from "../components/Layout";
import { AuthProvider } from "../lib/auth";

import "../styles/globals.css";
import "../styles/Form.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
