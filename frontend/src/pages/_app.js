import "@/styles/globals.css";
import { Provider, createClient } from "urql";
import Nav from "@/components/Nav";
import { StateContext } from "lib/context";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}
