import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const AddAProduct = () => {
  const [loading, setLoading] = useState(false);
  const { user, loadingState } = useContext(AuthContext);
  const navigate = useNavigate()
  const userName = user?.displayName;
  const userEmail = user?.email;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // const imageHostKey = process.env.REACT_APP_imagebb_key;
  const imageHostKey = "4d0a30ae8dcdfa6967e6c431234d0065";
  if (loadingState) {
    return <Loader></Loader>;
  }
  const handleAddProduct = (data) => {
    setLoading(true);
    const title = data.title;
    const name = data.productName;
    let category = data.productCategory;
    if (category === "Minimalism") {
      category = 1;
    } else if (category === "Industrial") {
      category = 2;
    } else if (category === "Bohemian") {
      category = 3;
    }
    const productLocation = data.productLocation;
    const originalPrice = data.originalPrice;
    const resalePrice = data.resalePrice;
    const purchaseYear = data.purchaseYear;
    const yearOfUse = data.usingDuration;
    const mobile = data.mobile;
    const condition = data.condition;
    const description = data.description;

    // upload the image
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    }).then((res) =>
      res.json().then((imageData) => {
        setLoading(false);
        if (imageData.success) {
          setLoading(true);
          const product = {
            title,
            name,
            categoryId: category,
            productLocation,
            originalPrice,
            resalePrice,
            purchaseYear,
            yearOfUse,
            condition,
            sellerName: userName,
            mobile,
            sellerEmail: userEmail,
            verified: false,
            description,
            sold: false,
            ad: false,
            postedDate: new Date(),
            productImage: imageData?.data?.url,
            reported: false,
          };
          // post data into the database
          fetch(`http://localhost:5000/products?email=${user.email}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              //JWT remaining
            },
            body: JSON.stringify(product),
          })
          .then(res => res.json())
          .then(result => {
            setLoading(false)
            if(result?.acknowledged){
              toast.success("Product successfully added")
              navigate('/')
              reset()
            }
            console.log(result)
          })
        }
      })
    );
    // const form = event.target;
    // const title = form.productTitle.value;
    // const name = form.productName.value;
    // let category = form.productCategory.value;
    // if(category === 'Minimalism'){
    //   category = 1
    // }else if(category === 'Industrial'){
    //   category = 2
    // }else if(category === 'Bohemian'){
    //   category = 3
    // }
    // const location = form.productLocation.value;
    // const originalPrice = form.productOriginalPrice.value;
    // const resalePrice = form.productResalePrice.value;
    // const purchaseYear = form.productPurchaseYear.value;
    // const usingYears = form.usingDuration.value;
    // const productCondition = form.productCondition.value;
    // const description = form.productDescription.value;
    // const image = form.productImage.value

    // console.log(image);
  };
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="container mx-auto p-5 my-5">
      <h2 className="text-center text-3xl font-bold">Add a product</h2>
      <div>
        <form onSubmit={handleSubmit(handleAddProduct)} action="">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product title</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("title", {
                required: "Please enter product title",
              })}
            />
            {errors.title && (
              <p className="text-red-700" role="alert">
                {errors.title?.message}
              </p>
            )}
          </div>
          {/* d */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product name</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("productName", {
                required: "Please enter product name",
              })}
            />
            {errors.productName && (
              <p className="text-red-700" role="alert">
                {errors.productName?.message}
              </p>
            )}
          </div>
          {/* d */}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product category</span>
            </label>
            <select
              className="input input-bordered w-full"
              type="text"
              {...register("productCategory", {
                required: "Please choose a category",
              })}
            >
              <option>Minimalism</option>
              <option>Industrial</option>
              <option>Bohemian</option>
            </select>
            {errors.productCategory && (
              <p className="text-red-700" role="alert">
                {errors.productCategory?.message}
              </p>
            )}
          </div>
          {/*  location   */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("productLocation", {
                required: "Please enter product location",
              })}
            />
            {errors.productLocation && (
              <p className="text-red-700" role="alert">
                {errors.productLocation?.message}
              </p>
            )}
          </div>
          {/* original price */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Original price</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("originalPrice", {
                required: "Please enter product original price",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "Please enter in a number",
                },
              })}
            />
            {errors.originalPrice && (
              <p className="text-red-700" role="alert">
                {errors.originalPrice?.message}
              </p>
            )}
          </div>
          {/* resale price */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Resale price</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("resalePrice", {
                required: "Please enter product resale price",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "Please enter in a number",
                },
              })}
            />
            {errors.resalePrice && (
              <p className="text-red-700" role="alert">
                {errors.resalePrice?.message}
              </p>
            )}
          </div>
          {/* year of purchase */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Year of purchase</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("purchaseYear", {
                required: "Please enter product purchase year",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "Please enter in a number",
                },
              })}
            />
            {errors.purchaseYear && (
              <p className="text-red-700" role="alert">
                {errors.purchaseYear?.message}
              </p>
            )}
          </div>
          {/* year of use */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Year of use</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("usingDuration", {
                required: "Please enter product using duration in year",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "Please enter in a number",
                },
              })}
            />
            {errors.usingDuration && (
              <p className="text-red-700" role="alert">
                {errors.usingDuration?.message}
              </p>
            )}
          </div>
          {/* mobile number */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your mobile number</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("mobile", {
                required: "Please enter your mobile number",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "Please enter in number",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-red-700" role="alert">
                {errors.mobile?.message}
              </p>
            )}
          </div>
          {/* d */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Select product condition</span>
            </label>
            <select
              className="input input-bordered w-full"
              type="text"
              {...register("condition", {
                required: "Please choose a product condition",
              })}
            >
              <option>excellent</option>
              <option>good</option>
              <option>fair</option>
            </select>
            {errors.condition && (
              <p className="text-red-700" role="alert">
                {errors.condition?.message}
              </p>
            )}
          </div>
          {/* d */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Short description</span>
            </label>
            <textarea
              required
              className="textarea textarea-primary w-full"
              placeholder="Enter a short description"
              type="text"
              {...register("description", {
                required: "Please enter product description",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-700" role="alert">
                {errors.description?.message}
              </p>
            )}
          </div>
          {/* d */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Upload a product image</span>
            </label>
            <input
              {...register("image", {
                required: "Please choose a product image",
              })}
              type="file"
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-red-700" role="alert">
                {errors.image?.message}
              </p>
            )}
          </div>
          <button className="btn bg-primary mt-3 w-full" type="submit">
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAProduct;
