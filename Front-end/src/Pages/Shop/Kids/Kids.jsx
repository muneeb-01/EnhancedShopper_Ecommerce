import React, { useMemo } from "react";
import ReusableGridShopContainer from "../Component/ReusableGridShopContainer";
import { useSelector } from "react-redux";

const Kids = () => {
  const allProducts = useSelector((store) => store.allProducts);

  const memoizedKidsProducts = useMemo(() => {
    const kidProducts = allProducts.filter(
      (product) => product.category === "kid"
    );
    return kidProducts.length > 0 ? kidProducts : [];
  }, [allProducts]);

  return (
    <>
      <ReusableGridShopContainer
        category={"Kids"}
        items={memoizedKidsProducts}
      />
    </>
  );
};

export default Kids;
