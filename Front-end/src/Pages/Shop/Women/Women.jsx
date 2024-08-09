import React, { useMemo } from "react";
import ReusableGridShopContainer from "../Component/ReusableGridShopContainer";
import { useSelector } from "react-redux";

const Women = () => {
  const allProducts = useSelector((store) => store.allProducts);

  const memoizedwomenProducts = useMemo(() => {
    const womenProducts = allProducts.filter(
      (product) => product.category === "women"
    );
    return womenProducts.length > 0 ? womenProducts : [];
  }, [allProducts]);

  return (
    <>
      <ReusableGridShopContainer
        category={"Women"}
        items={memoizedwomenProducts}
      />
    </>
  );
};

export default Women;
