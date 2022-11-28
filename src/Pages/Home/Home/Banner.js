import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="min-h-[90vh] flex flex-col lg:flex-row container mx-auto p-5">
        <div className="lg:w-1/2 w-full flex items-center justify-center lg:justify-start p-4">
          <div>
            <h1 className="text-5xl text-center lg:text-start lg:text-8xl font-bold">
              Smart <br /> Solution <br /> For Modern Living
            </h1>
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="h-full">
            <Carousel></Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
