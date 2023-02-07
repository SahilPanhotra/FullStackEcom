import Image from "next/image";
import { useRouter } from "next/router";
import shiba from "../../public/shiba.png";

import styled from "styled-components";
import { motion } from "framer-motion";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );
  return { props: { order } };
}

export default function Success({ order }) {
  const route = useRouter();
  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{duration:0.75}}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{duration:0.75}}>
          <Address animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{duration:1.3}}>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, val]) => (
                <p key={key}>
                  {key}:{val}
                </p>
              )
            )}
          </Address>
          <OrderInfo animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{duration:1.3}}>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product:{item.description}</p>
                <p>Quantity:{item.quantity}</p>
                <p>Price:{item.price.unit_amount}</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <button
          onClick={() => {
            route.push("/");
          }}
        >
          Continue Shopping
        </button>
        <Image src={shiba} alt="shiba-inu"></Image>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 5rem 5rem;
`;
const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem 0 3rem 0;
  button {
    color: white;
    background: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    cursor: pointer;
  }
  h2 {
    margin-bottom: 1rem 0rem;
  }
`;

const Address = styled(motion.div)`
  font-size: 1rem;
  width: 100%;
`;
const OrderInfo = styled(motion.div)`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;
const InfoWrapper = styled(motion.div)`
  display: flex;
  margin: 2rem 0rem;
`;
