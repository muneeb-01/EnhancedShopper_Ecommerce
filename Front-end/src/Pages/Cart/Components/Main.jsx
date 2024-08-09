import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuMinus, LuPlus } from "react-icons/lu";

function Cart() {
  const handleCheckOut = async () => {};

  const increaseQuantity = async (qty, id, cartQty) => {};
  const decreaseQuantity = async (qty, id, cartQty) => {};
  const handleRemoveFromBag = async (id, productId) => {};

  return (
    <>
      <div className=" z-[1]  flex gap-[2vw] min-h-screen items-start justify-around px-24 py-10 max-lg:flex-col max-lg:items-center max-lg:px-[5vw] max-sm:py-1 max-md:">
        {/* {bagItems && (
          <div className="w-[70%] max-lg:w-[100%]   flex flex-col justify-center items-start">
            <h5
              className={`gap-4 my-4 text-2xl max-sm:text-[2vh]  ${
                bagItems.length === 0
                  ? "absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
                  : ""
              }`}
            >
              Cart ({bagItems.length})
            </h5>
            {bagItems.map((e, id) => {
              return (
                <div
                  key={id}
                  className={`w-full  flex justify-center p-6 items-center max-sm:p-1 ${
                    bagItems.length - 1 === id ? "border-y-2" : "border-t-2"
                  } border-[#ddd8d8]  max-lg:py-3`}
                >
                  <div className="w-[15%] h-[12rem] max-xl:h-[10rem] max-lg:w-[20%] max-sm:w-[27%] max-md:w-[25%] max-md:h-[16vh]  p-3  max-xl:p-1">
                    <div className=" w-full h-full rounded-xl ">
                      <img
                        className="h-full  object-contain"
                        src={e.item.image}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="w-[70%] h-full max-lg:w-[60%]  px-5 py-3 max-sm:p-2">
                    <div className=" w-full h-full flex flex-col justify-around">
                      <h2 className="text-[1.5rem] leading-[-.5] tracking-tighter max-xl:text-[1.8vw] max-lg:text-[2.6vw] max-sm:text-[3vw]">
                        {e.item.name}
                      </h2>
                      <h3 className="text-[1rem] tracking-tight max-xl:text-[1.4vw] max-lg:text-[2.2vw] max-sm:text-[2.5vw]">
                        {e.item.brand}
                      </h3>
                      <p className="text-[0.8rem] leading-[-.8] tracking-tight max-xl:text-[1vw] max-lg:text-[1.6vw] max-sm:text-[1.8vw]">
                        {e.item.description <= 70
                          ? e.item.description
                          : e.item.description.substring(0, 50) + "..."}
                      </p>
                      <h3 className="text-[1rem] tracking-tight max-xl:text-[1.1vw] max-lg:text-[1.8vw] max-sm:text-[2.2vw]">
                        Size: Xl
                      </h3>
                      <button
                        onClick={() =>
                          handleRemoveFromBag(e.item.id, e.item._id)
                        }
                        className="flex z-20 w-min px-3 max-sm:p-[3px] max-sm:text-[2.3vw] text-nowrap py-1  tracking-tighter rounded-sm  items-center justify-center  gap-2 text-[0.9rem] border border-slate-300 "
                      >
                        <FaRegTrashCan />
                        <span className="max-xl:text-[1vw] max-lg:text-[1.6vw] max-sm:hidden ">
                          Remove Item
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-[15%] max-lg:text-[20%] h-[12rem] max-lg:h-[18vh] max-md:h-[16vh] max-sm:h-[13vh] flex flex-col justify-between items-end">
                    <div className="">
                      <div className="overflow-hidden flex items-center py-1 max-xl:py-[4px] rounded-md justify-center  w-min text-[1.1rem] border border-slate-300 max-xl:text-[1.1vw] max-md:text-[1.6vw]">
                        <button
                          onClick={(event) =>
                            decreaseQuantity(-1, e.item._id, e.quantity)
                          }
                          className="px-3 max-xl:px-[7px] max-md:px-[8px] max-md:font-medium"
                        >
                          <LuMinus />
                        </button>
                        <button className="px-3  border-x max-xl:px-[7px] max-md:px-[8px] max-md:font-medium">
                          {e.quantity}
                        </button>
                        <button
                          onClick={() =>
                            increaseQuantity(+1, e.item._id, e.quantity)
                          }
                          className="px-3 max-xl:px-[7px] max-md:px-[8px] max-md:font-medium"
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>
                    <div className="text-2xl max-xl:text-[1.4vw] max-md:text-[2vw] max-md:font-medium text-nowrap max-sm:text-[2.6vw]">
                      Rs. {e.item.price}/-
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {bagItems.length > 0 && (
          <div className="w-[350px] max-sm:px-[4vw] max-xl:w-[300px] max-lg:w-[90%] max-lg:px-[4vw] border-2 px-[1.4vw] py-[2.8vh] border-[#dadada] sticky top-[5%] h-max mt-[6.6vh] rounded-xl ">
            <h2 className="text-[1.4rem] max-sm:text-[4.4vw]">Cart Total</h2>

            <div className="w-full rounded-md flex flex-col gap-[1.2vh] px-[1vw] py-[1vh] border border-[#dadada] my-[1.2vh]">
              <p className="border-b py-[1.2vh] max-sm:text-[3.2vw] max-sm:px-[4vw] flex justify-between items-center text-[1rem] border-[#dadada]">
                Subtotal <span className=" inline-block">Rs. {bagtotal}/-</span>
              </p>
              <p className="border-b max-sm:text-[3.2vw] max-sm:px-[4vw] py-[1.2vh] text-[1rem] flex justify-between items-center border-[#dadada]">
                Shipping
                <span className=" inline-block">
                  Rs.{" "}
                  {bagtotal === 0
                    ? 0
                    : bagtotal <= 5000
                    ? Math.floor(bagtotal * (8 / 100))
                    : 0}
                  /-
                </span>
              </p>
              <p className=" py-[1.2vh] text-[1.15rem] max-sm:text-[3.5vw] max-sm:px-[4vw] font-medium flex justify-between items-center">
                Total
                <span className=" inline-block">
                  Rs.{" "}
                  {bagtotal +
                    (bagtotal === 0
                      ? 0
                      : bagtotal <= 5000
                      ? Math.floor(bagtotal * (8 / 100))
                      : 0)}
                  /-
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                handleCheckOut();
              }}
              className="bg-green-500 w-full py-[1.2vh] rounded-lg font-semibold text-white"
            >
              CheckOut
            </button>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Cart;

// const bagtotal = bagItems.reduce((acc, e) => {
//     const price = +e.item.price || 0;
//     const quantity = +e.quantity;
//     return acc + quantity * price;
//   }, 0);
