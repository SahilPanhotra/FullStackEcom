import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "@/styles/NavStyles";
import Cart from "./Cart";
import { useStateContext } from "lib/context";
const { AnimatePresence,motion } =require("framer-motion");
import User from "./User";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Nav() {
  const {showCart,setShowCart,totalQuantities}=useStateContext();
  const {user,error,isLoading}=useUser();
  // console.log(user["http://localhost:3000/stripe_customer_id"]);
  return (
    <NavStyles>
      <Link href={"/"}>Smack</Link>
      <NavItems>
      <User/>
        <div onClick={()=>setShowCart(true)}>
        {totalQuantities>0&& <motion.span animate={{scale:1}} initial={{scale:0}}>{totalQuantities}</motion.span>}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>
     {showCart && <Cart />}
     </AnimatePresence>
    </NavStyles>
  );
}
