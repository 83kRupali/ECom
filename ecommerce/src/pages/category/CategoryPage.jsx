import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';
import toast from 'react-hot-toast';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';




const CategoryPage = () => {

    const {categoryname} = useParams();

    const context = useContext(myContext)
    const {getAllProduct, loading} = context;

    const navigate = useNavigate();


// const navigate = useNavigate();
//   const {loading ,getAllProduct } = useContext(myContext);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { loading, getAllProduct } = useContext(myContext);
  const cartItems = useSelector((state) => state.cart);

  // Add to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success('Added to cart');
  };

  // Delete from cart
  const handleDeleteFromCart = (item) => {
    // dispatch(deleteFromCart(item));
    // toast.success('Removed from cart');
    dispatch(deleteFromCart(item.id)); // ✅ pass ID only
  toast.success("Removed from cart");
  };

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems));
  },[cartItems])




    // FilterProduct
    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));

    console.log(filterProduct);

  return (
    <Layout>
        <div>

             {/* Heading */}

        <div className='mt-10'>
            <h1 className='text-center mb-5 text-2xl font-semibold'> 
                {categoryname}
            </h1>
        </div>

            <section className='text-gray-600 body-font'>
            {/* main 2 */}
            <div className='container px-5 py-5 max-auto'>

              <div className='flex justify-center'>
                {loading && <Loader />}
              </div>
                {/* main 3 */}
                <div className='flex flex-wrap m-4'>
                    {filterProduct.length > 0 ? 
                    
                    <>
                    {filterProduct.map((item, index) =>{
                        const {id, title, price, productImageUrl} = item
                        const isInCart = cartItems.some((p) => p.id === id);

                        return (
                            <div key={index} className='p-4 w-full md:w-1/4'>
                                <div className='h-full border border-gray-300 rounded-xl overflow-hidden shadow-hidden shadow-md cursor-pointer'>
                                    <img 
                                    onClick={() => navigate(`/productinfo/${id}`)}
                                    className='lg:h-80 h-96 w-full'
                                    src={productImageUrl}
                                    alt='img'
                                    />

                                    <div className='p-6'>
                                        <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'> 
                                            E-bharat
                                        </h2>

                                        <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
                                            {title.substring(0, 25)}
                                        </h1>

                                        <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
                                            {price}
                                        </h1>

                                        {/* <div className='flex justify-center'>
                                            <button className='bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold'>
                                                Add To Cart
                                            </button>

                                        </div> */}


                                        <div className="flex justify-center">
                        {isInCart ? (
                          <button
                            onClick={() => handleDeleteFromCart(item)}
                            className="bg-red-600 hover:bg-red-700 w-full text-white py-1 rounded-lg font-bold"
                          >
                            Delete From Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-pink-500 hover:bg-pink-600 w-full text-white py-1 rounded-lg font-bold"
                          >
                            Add To Cart
                          </button>
                        )}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        )
                    })}
                    </>:
                    <div>
                        <div className='flex justify-center'>
                            <h1>No {categoryname} Product Found</h1>
                        </div>
                    </div>    
                }
                </div>
            </div>

        </section>

        </div>
    </Layout>
  )
}

export default CategoryPage