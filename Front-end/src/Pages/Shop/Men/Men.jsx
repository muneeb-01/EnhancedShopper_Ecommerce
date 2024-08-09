import React, { useMemo } from "react";
import ReusableGridShopContainer from "../Component/ReusableGridShopContainer";
import { useSelector } from "react-redux";

const Men = () => {
  const allProducts = useSelector((store) => store.allProducts);

  const memoizedMenProducts = useMemo(() => {
    const menProducts = allProducts.filter(
      (product) => product.category === "men"
    );
    return menProducts.length > 0 ? menProducts : [];
  }, [allProducts]);
  return (
    <>
      <ReusableGridShopContainer category={"Men"} items={memoizedMenProducts} />
    </>
  );
};

export default Men;
