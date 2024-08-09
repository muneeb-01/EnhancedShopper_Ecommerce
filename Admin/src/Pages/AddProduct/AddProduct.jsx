import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/apiClient";
import { ADD_PRODUCT, HOST, UPLOAD_PRODUCT_IMAGES } from "../../utils/constant";
import { BiImageAdd } from "react-icons/bi";

function Form() {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("men");
  const [files, setFiles] = useState([]);

  const validateForm = () => {
    if (!name.length) {
      toast.error("Name is required");
      return false;
    }
    if (!description.length) {
      toast.error("Description is required");
      return false;
    }
    if (!price.length && price !== typeof Number) {
      toast.error("price is required");
      return false;
    }
    if (!quantity.length && quantity !== typeof Number) {
      toast.error("price is required");
      return false;
    }
    if (!brand.length) {
      toast.error("Brand is required");
      return false;
    }
    if (!category.length) {
      toast.error("Category is required");
      return false;
    }
    if (!files.length) {
      toast.error("Images are required");
      return false;
    }
    return true;
  };

  const imageHandler = (e) => {
    const userSelectedFiles = e.target.files;
    const maxFilesLength = 4;
    const inpFiles = [];

    setFiles([]);

    if (userSelectedFiles > maxFilesLength) {
      toast.info("Only first 4 files will uploaded");
    } else if (!userSelectedFiles) {
      toast.error("Images are required");
    }

    for (let i = 0; i < maxFilesLength; i++) {
      if (userSelectedFiles[i]) {
        inpFiles.push(userSelectedFiles[i]);
      }
    }

    setFiles(inpFiles);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("productImages", files[i]);
      }
      formData.append("HOST", HOST);

      try {
        const imagesResponce = await apiClient.post(
          UPLOAD_PRODUCT_IMAGES,
          formData,
          { withCredentials: true }
        );
        if (imagesResponce.status === 200 && imagesResponce.data) {
          setImages(imagesResponce.data);
          const responce = await apiClient.post(
            ADD_PRODUCT,
            {
              name,
              description,
              price,
              brand,
              quantity,
              category,
              images: imagesResponce.data,
            },
            { withCredentials: true }
          );
          if (responce) {
            toast.success(responce.data);
          }
          setName("");
          setBrand("");
          setCategory("");
          setDescription("");
          setPrice("");
          setFiles([]);
          setImages([]);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="w-full mt-[18vh] flex items-center justify-center flex-col">
      <h5 className="w-full  my-[2vh] text-[2.8rem]  text-center">
        Add Product{" "}
      </h5>
      <form onSubmit={handleForm} action="" className="w-full  px-[8vw]">
        <div className="mb-10">
          <p className="text-xl mb-4">Product title</p>
          <input
            className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
          />
        </div>
        <div className="mb-8 w-full">
          <p className="text-xl mb-4">Description</p>
          <textarea
            placeholder="Add Description"
            className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div className="flex flex-wrap gap-5 mb-8 w-full">
          <div className="">
            <p className="text-xl mb-4 text-nowrap">Add Price</p>
            <input
              className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Type here"
            />
          </div>

          <div className="">
            <p className="text-xl mb-4 text-nowrap">Add Quantity</p>
            <input
              className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Type here"
            />
          </div>

          <div className="">
            <p className="text-xl mb-4">Brand</p>
            <input
              className="focus:outline-none w-full text-[1rem] py-2 px-4 border border-[#5d5d5d]"
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Type here"
            />
          </div>

          <div>
            <p className="text-xl mb-4">Category</p>
            <select
              className="focus:outline-none text-[1rem] py-2 px-10 border border-[#5d5d5d]"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="women">Women</option>
              <option value="kid">Kid</option>
              <option value="men">Men</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <p className="text-xl mb-4">Add Image</p>
          <input
            className={`${"hidden"}`}
            onChange={imageHandler}
            type="file"
            multiple
            id="file-input"
            accept=".png, .jpg, .jpeg, .svg, .webp"
          />
          <label htmlFor="file-input" className="">
            <div className="relative">
              <BiImageAdd size={"78px"} />
              <span className="absolute inset-0 size-6 bg-black rounded-full flex justify-center items-center text-white">
                {files.length}
              </span>
            </div>
          </label>
        </div>
        <button className="px-8 py-2 mt-4 rounded-lg text-[1.17rem] text-[#EB423F] hover:text-black active:scale-95 font-medium  border border-gray-400 hover:bg-[#EBA72E] focus:outline-none">
          Add
        </button>
      </form>
    </div>
  );
}

export default Form;
