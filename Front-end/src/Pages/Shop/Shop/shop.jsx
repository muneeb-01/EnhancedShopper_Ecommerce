import React, { useMemo } from "react";
import ReusableGridShopContainer from "../Component/ReusableGridShopContainer";
import { useSelector } from "react-redux";

const Shop = () => {
  const allProducts = useSelector((store) => store.allProducts);

  const memoizedAllProducts = useMemo(() => {
    return allProducts;
  }, [allProducts]);

  return (
    <>
      <ReusableGridShopContainer
        category={"Shop"}
        items={memoizedAllProducts}
      />
    </>
  );
};

export default Shop;
