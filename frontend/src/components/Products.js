import Image from "next/image";
import { ProductStyle } from "@/styles/ProductStyle";
import Link from "next/link";

export default function Product({ product }) {
  const { title, price, image,slug } = product.attributes;

  return (
    <ProductStyle>
    <Link href={`/products/${slug}`}>
      <div>
        <img
          src={image.data.attributes.formats.small.url}
          alt={`${title}`}
        />
      </div>
      </Link>
      <Link href={`/products/${slug}`}>
      <h2>{title}</h2>
      </Link>
      <Link href={`/products/${slug}`}>
      <h3>{price}</h3>
      </Link>
    </ProductStyle>
  );
}
