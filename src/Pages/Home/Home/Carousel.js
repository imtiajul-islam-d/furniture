import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ban1 from "../../../assets/categoryImage/category1.jpg";
import ban3 from "../../../assets/categoryImage/category3.jpg";

export default function Carousel() {
  var settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear"
  };
  return (
    <Slider className="h-full flex items-center justify-center" {...settings}>
      <div className="h-full">
        <img className="w-full h-full" src={ban1} alt="" />
      </div>
      <div className="h-full">
        <img className="w-full h-full" src={ban3} alt="" />
      </div>
    </Slider>
  );
}
