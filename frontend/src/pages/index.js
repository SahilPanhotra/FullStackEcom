import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "lib/query";
import Product from "@/components/Products";
import { Gallery } from "@/styles/Gallery";

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;
  if (fetching) return <h1>Loading...</h1>;
  if (error) return <p>Oh no {error.message}</p>;
  const products = data.products.data;

  return (
    <>
      <Head>
        <title>SMACK</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <Gallery>
        {products.map((product) => (
          <Product key={product.attributes.slug} product={product} />
        ))}
        </Gallery>
      </main>
    </>
  );
}
