import Image from "next/image";
import { ProductStyle } from "@/styles/ProductStyle";

export default function Product({ product }) {
  const { title, price, image, Description } = product.attributes;

  return (
    <ProductStyle>
      <div>
        <img
          src={image.data.attributes.formats.small.url}
          alt={`${title}`}
        />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <p>{Description}</p>
    </ProductStyle>
  );
}
