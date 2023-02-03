import { useRouter } from "next/router";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "lib/query";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "@/styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "lib/context";

export default function ProductDetail() {
  const {qty,increaseQty,decreaseQty,onAdd} = useStateContext();
  console.log(qty);
  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <h1>Loading...</h1>;
  if (error) return <p>Oh no {error.message}</p>;
  const { title, Description, image } = data.products.data[0].attributes;
  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{Description}</p>

        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle  onClick={increaseQty}/>
          </button>
        </Quantity>
        <Buy onClick={()=>onAdd(data.products.data[0].attributes,qty)}>Add to Cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
