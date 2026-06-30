import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// ------- Images --------
import shop from '../assets/shop.png'
import pic2 from '../assets/gr2.png'
import pic3 from '../assets/gr3.png'

import rice from '../assets/rice.png'
import dairy from '../assets/dairy.png'
import snack from '../assets/snack.png'
import fruits from '../assets/fruits.png'
import bevarage from '../assets/bevarage.png'
import household from '../assets/household.png'
import spices from '../assets/spices.png'
import { toast, Slide } from 'react-toastify'


// ------ Icons ---------
import { FaShuttleVan } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SiCodefresh } from "react-icons/si";
import { MdOutlinePayment } from "react-icons/md";

import { AuthContext } from '../Context/AuthContext'
import { FaRegHeart } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const { token,address,setAddress } = useContext(AuthContext)
  const navigate = useNavigate()
  const features = [
    {
      "icon": FaShuttleVan,
      "title": "Free Delievery",
      "pr": "On order above 149"
    },
    {
      "icon": RiMoneyRupeeCircleFill,
      "title": "Best Prices",
      "pr": "On the best deals"
    },
    {
      "icon": SiCodefresh,
      "title": "Free Products",
      "pr": "100% Quality Guarentee"
    },
    {
      "icon": MdOutlinePayment,
      "title": "Secure Payment",
      "pr": "100% Secure Payment"
    }
  ]
  // ----------- Catagories ======
  const catagories = [
    {
      "name": "Rice",
      "icon": rice
    },
    {
      "name": "Dairy",
      "icon": dairy
    },
    {
      "name": "Snacks",
      "icon": snack
    },
    {
      "name": "Fruits",
      "icon": fruits
    },
    {
      "name": "Beverages",
      "icon": bevarage
    },
    {
      "name": "Household",
      "icon": household
    },
    {
      "name": "Spices",
      "icon": spices
    }
  ]

  // -----------------------------------------
  const [products, setProducts] = useState([])

  // =============== API ===============
  const apibase = "https://grocery-kirana-store.onrender.com"
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apibase}/allproducts`)
      setProducts(response.data)
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  // ============= Add to Cart ===========
  const add_to_cart = async (productid) => {
    try {
      const response = await axios.put(`${apibase}/customer/addtocart/${productid}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast.success('Cart Added', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });

    } catch (error) {
      console.log(`Error:- ${error}`)
      console.log(`Raise Error:- ${error.response.data.detail}`)
    }
  }

  // ====== Fetch Profile =======
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${apibase}/customer/myprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      setAddress(response.data.address)
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <div>

        {/* ======== Upper Banner =========== */}
        <div className=' w-full h-[80vh] p-2 bg-[#d2fcc7] flex justify-center items-center ' >
          {/* --- Left ---- */}
          <div className=' w-[40%] p-2 ' >
            <h1 className=' text-5xl font-bold  ' >Fresh Groceries Delivered to Your <span className=' text-[#258e05] ' > Doorstep </span> </h1>
            <p>Get the best quality products at the best prices.</p>
            <button 
            onClick={()=>navigate("/products")}
            className=' bg-[#259d00] text-white p-2 font-semibold rounded cursor-pointer ' >Shop Now</button>
          </div>
          {/* --- Right ---- */}
          <div className=' w-[60%] h-full relative flex justify-center items-center ' >

            <img src={pic2} alt=""
              className=' absolute h-[70%] left-10 bottom-10  '
            />
            <img src={pic3} alt=""
              className=' absolute h-[40%] bottom-0 left-50 z-50 '
            />
            <img src={shop} alt=""
              className=' absolute h-full w-[60%] right-0  '
            />
          </div>
        </div>

        {/* ============= Features ============ */}
        <div className=' w-full flex justify-center items-center gap-4 p-2 ' >
          {features.map((card, index) => {
            const Icon = card.icon;

            return (
              <div key={index} className="rounded p-4 flex items-center gap-3">
                <Icon className="text-[#259d00] text-3xl" />
                <div>
                  <p className="font-semibold">{card.title}</p>
                  <p className="text-gray-500">{card.pr}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========= Shop By Catagory ===== */}
        <div>
          <h1 className=' text-[1.2rem] font-bold ' >Shpo By Category</h1>
          <div className=' w-full h-auto p-2 flex justify-evenly items-center gap-2 ' >
            {
              catagories.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} onClick={()=>{
                    navigate(`/filterproducts?category=${item.name}`) 
                  }} className="w-25 h-25 bg-[#e2fadb]  p-1 rounded flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition-all duration-500  ">
                    <img src={Icon} alt="" className='rounded w-full h-[75%] object-contain   ' />
                    <p className=' font-semibold text-[0.9em] ' >{item.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>

        {/* =============== Products Cards ========== */}
        <div className=' w-full bg-[#d2fcc7] p-2 ' >
          <div className=' flex justify-between ' >
            <h1 className=' text-[1.2rem] font-bold ' >Products</h1>
            <p onClick={()=>navigate("/products")} className=' text-[#000000] cursor-pointer ' >View All ➡️</p>
          </div>
          <div className=' w-full h-auto flex flex-wrap justify-center items-center gap-3 ' >
            {
              products.length === 0 ? (
                <p>Product not available</p>
              )
                : (
                  products.map((product, index) => (
                    <div key={index} className="w-40 h-50 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg  transition duration-300">
                      <img
                        src={product.image_url}
                        alt="Kurkure Masala Munch"
                        className="w-full h-24 object-contain "
                      />

                      <div className="h-25 p-1 flex flex-col justify-between ">

                        <h2 className="text-[0.8em] font-semibold line-clamp-1 ">
                          {product.productname}
                        </h2>

                        <p className="text-sm text-gray-500">
                          {product.brand} • {product.unit}
                        </p>

                        <div className="flex justify-between items-center mt-4">
                          <p className="text-[0.9em] font-bold text-green-600">₹{product.discount_price}</p>

                          <button
                            onClick={() => add_to_cart(product._id)}
                            className="bg-green-600 cursor-pointer text-white px-1 text-[0.9em] rounded hover:bg-green-700 transition-all duration-500 ">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
            }

          </div>
        </div>

        {/* ========== Why Choose Us ====== */}
        <section className="py-10 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Us?
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-52 p-5 bg-white shadow rounded-lg text-center">
              <div className="text-4xl">🥬</div>
              <h3 className="font-semibold mt-3">Fresh Products</h3>
              <p className="text-sm text-gray-500 mt-2">
                Farm fresh groceries every day.
              </p>
            </div>

            <div className="w-52 p-5 bg-white shadow rounded-lg text-center">
              <div className="text-4xl">🚚</div>
              <h3 className="font-semibold mt-3">Fast Delivery</h3>
              <p className="text-sm text-gray-500 mt-2">
                Delivered to your doorstep.
              </p>
            </div>

            <div className="w-52 p-5 bg-white shadow rounded-lg text-center">
              <div className="text-4xl">💳</div>
              <h3 className="font-semibold mt-3">Secure Payment</h3>
              <p className="text-sm text-gray-500 mt-2">
                100% safe online payments.
              </p>
            </div>

            <div className="w-52 p-5 bg-white shadow rounded-lg text-center">
              <div className="text-4xl">💰</div>
              <h3 className="font-semibold mt-3">Best Prices</h3>
              <p className="text-sm text-gray-500 mt-2">
                Great quality at low prices.
              </p>
            </div>
          </div>
        </section>

        {/* ===========  Reviews ====== */}
        <section className="py-10 px-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">
            Customer Reviews
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-72 bg-white p-5 rounded-lg shadow">
              <p className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600 mt-3">
                Fresh products and quick delivery.
              </p>
              <h4 className="font-semibold mt-4">Rahul Kumar</h4>
            </div>

            <div className="w-72 bg-white p-5 rounded-lg shadow">
              <p className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600 mt-3">
                Affordable prices with great quality.
              </p>
              <h4 className="font-semibold mt-4">Priya Sharma</h4>
            </div>
          </div>
        </section>

        {/* ======= NewsLetter ===== */}
        <section className="py-12 px-6 text-center">
          <h2 className="text-3xl font-bold">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-gray-500 mt-2">
            Get the latest offers and discounts.
          </p>

          <div className="flex justify-center mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 px-4 py-2 rounded-l-lg w-72 outline-none"
            />

            <button className="bg-green-600 text-white px-6 rounded-r-lg hover:bg-green-700">
              Subscribe
            </button>
          </div>
        </section>



      </div>
    </>
  )
}

export default Home