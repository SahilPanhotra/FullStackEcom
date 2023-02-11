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
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function ProductDetail() {
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();
  //reset Qty
  useEffect(() => {
    setQty(1);
  },[]);
  const { query } = useRouter();
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  

  const { data, fetching, error } = results;
  if (fetching) return <h1>Loading...</h1>;
  if (error) return <p>Oh no {error.message}</p>;
  const { title, Description, image } = data.products.data[0].attributes;

  

  //create a toast
  const notify = () => {
    toast.success(`${title} Added to your Cart`, {
      duration: 1500,
      icon: "🛒",
    });
  };

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
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
