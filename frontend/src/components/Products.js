import Image from "next/image";

export default function Product({ product }) {
  const { title, price, image, Description } = product.attributes;

  return (
    <div>
      <div>
        <Image
          src={image.data.attributes.formats.small.url}
          width={200}
          height={200}
          alt={`${title}`}
        />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <p>{Description}</p>
    </div>
  );
}
