import React from 'react';
import PromoBar from './home/promo-bar';
import TopHeader from './home/top-header';
import Slider from './home/slider';
import Categories from './home/categories';
import NewArrival from './home/new-arrival';
import Tranding from './home/tranding';
import Fragrances from './home/fragrances';
import Face from './home/face';
import Lips from './home/lips';
import SkinCare from './home/skin-care';
import Brands from './home/brands';
import Blog from './home/blog';
import Footer from './home/footer';
import Navbar from './home/navbar'


const HomePage = () => {
    return (
        <>
           <PromoBar/> 
            <div className="bg-white shadow-sm sticky top-0 z-50 ">
        <TopHeader />
        <Navbar />
      </div>
      <Slider />
      <Categories />
      <NewArrival />
      <Tranding/>
      <Fragrances />
      <Face />
      <Lips/>
      <SkinCare/>
      <Brands/>
      <Blog/>
      {/* <TestimonialSection/> */}
      <Footer/>
        </>
    );
};

export default HomePage;