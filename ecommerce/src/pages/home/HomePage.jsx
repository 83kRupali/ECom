import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCart from '../../components/homePageProductCart/HomePageProductCart'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
        <Layout>
            <HeroSection/>
            <Category />
            <HomePageProductCart />
            <Track />
            <Testimonial />
          
        </Layout>
    </div>
  )
}

export default HomePage