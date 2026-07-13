import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// ------- Images --------
import shop from '../assets/shop.png'
import pic2 from '../assets/gr2.png'
import pic3 from '../assets/gr3.png'

import shoppingcart from '../Lotties/shopping-cart.gif'

import rice from '../assets/rice.png'
import dairy from '../assets/dairy.png'
import snack from '../assets/snack.png'
import fruits from '../assets/fruits.png'
import bevarage from '../assets/bevarage.png'
import household from '../assets/household.png'
import spices from '../assets/spices.png'
import back from '../assets/background.png'
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
  const { token, address, setAddress } = useContext(AuthContext)
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
      toast.error('Please Login', {
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

  const [load, setLoad] = useState(false)
  useEffect(() => {
    setLoad(true)
    fetchProducts()
  }, [])


  return (
    <>
      <div className=' w-full flex flex-col ' >
        {/* ======== Upper Banner =========== */}
        <div className='  w-full sm:h-[80vh] h-[50vh] sm:p-2 p-1 bg-[#ffffffd3] flex sm:flex-row flex-col justify-center items-center z-50 ' >

          {/* ----------- Background image ---------- */}
          <div
            className="absolute sm:h-[70vh] h-[50%] top-[10vh] inset-0 bg-cover bg-center opacity-30 "
            style={{ backgroundImage: `url(${back})` }}
          ></div>

          {/* --- Left ---- */}
          <div className=' sm:w-[40%] h-[40%] w-full sm:p-2 sm:text-left text-center ' >
            <h1 className=' sm:text-[1.5rem] text-[1rem] font-bold  ' >Fresh Groceries Delivered to Your <span className=' text-[#258e05] ' > Doorstep </span> </h1>
            <p className=' sm:text-[1rem] text-[0.7rem] ' >Get the best quality products at the best prices.</p>
            <button
              onClick={() => navigate("/products")}
              className=' bg-[#259d00] sm:visible invisible text-white p-2 font-semibold rounded cursor-pointer ' >Shop Now</button>
          </div>

          {/* --- Right ---- */}
          <div className='sm:w-[60%] w-full h-[60%]  relative flex justify-center items-center ' >

            <img src={pic2} alt=""
              className='sm:visible invisible absolute h-[70%] left-10 bottom-10  '
            />
            <img src={pic3} alt=""
              className='sm:visible invisible absolute h-[40%] bottom-0 left-50 z-50 '
            />
            <img src={shop} alt=""
              className={`absolute h-full right-0 w-[80%] sm:w-[60%]
                transition-all duration-500 ease-out
                ${load ? "scale-100 opacity-100" : "scale-90 opacity-0"}
              `}
            />
          </div>
        </div>

        {/* ============= Features ============ */}
        <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 p-2">
          {features.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 border rounded-lg p-2 sm:p-3 w-[48%] sm:w-[230px] md:flex-1 min-w-[150px] max-w-[260px]"
              >
                <Icon className="text-[#259d00] text-xl sm:text-2xl md:text-3xl shrink-0" />

                <div className="min-w-0">
                  <p className="font-semibold text-[11px] sm:text-sm md:text-base leading-tight">
                    {card.title}
                  </p>

                  <p className="text-gray-500 text-[9px] sm:text-xs md:text-sm leading-tight">
                    {card.pr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========= Shop By Catagory ===== */}
        <div>
          <h1 className=' sm:text-[1.2rem] text-[1rem] font-bold ' >Shpo By Category</h1>
          <div className="w-full flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 p-2">
            {
              catagories.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} onClick={() => {
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
            <h1 className=' sm:text-[1.2rem] text-[1rem] font-bold ' >Products</h1>
            <p onClick={() => navigate("/products")} className=' text-[#000000] cursor-pointer ' >View All ➡️</p>
          </div>

          <div className=' w-full h-auto flex flex-wrap justify-center items-center gap-3 ' >
            {
              products.length === 0 ? (
                <div className=' w-full bg-white flex justify-center items-center ' >
                  <img src={shoppingcart} alt="" className=' w-20 h-20 ' />
                </div>
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
        <section className="sm:py-10 sm:px-6 p-2">
          <h2 className="sm:text-[1.2rem] text-[1.2rem] text-center font-bold">
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
        <section className="sm:py-10 sm:px-6 p-2 bg-gray-50">
          <h2 className="sm:text-[1.2rem] text-[1.2rem] text-center font-bold">
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
        <section className="sm:py-12 sm:px-6 p-2 text-center shadow shadow-[#646363] ">
          <h2 className="text-3xl font-bold">
            Subscribe to Our Newsletter
          </h2>

          <p className="text-gray-500 mt-2">
            Get the latest offers and discounts.
          </p>

          <div className="flex justify-center mt-6  ">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 px-4 py-2 rounded-l-lg sm:w-72 w-[80%]  outline-none"
            />

            <button className="bg-green-600 text-white sm:px-6 px-2 rounded-r-lg hover:bg-green-700">
              Subscribe
            </button>

          </div>
        </section>



      </div>
    </>
  )
}

export default Home