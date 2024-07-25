import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let data = useCart()
  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef()

  let options = props.options
  let priceOptions = Object.keys(options)
  let foodItem = props.foodItem

  const dispatch = useDispatchCart()

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }

  const handleQty = (e) => {
    setQty(e.target.value)
  }

  const handleOptions = (e) => {
    setSize(e.target.value)
  }

  const handleAddToCart = async () => {
    if (!foodItem || !foodItem._id) {
      console.error("foodItem or foodItem._id is undefined")
      return
    }

    let finalPrice = qty * parseInt(options[size])
    let food = data.find(item => item.id === foodItem._id && item.size === size)

    if (food) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
    } else {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
    }
  }

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value)
    }
  }, [])

  let finalPrice = qty * parseInt(options[size])

  return (
    <div>
      <div className='card mt-3' style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={foodItem.img} className="card-img-top" alt='' style={{ height: "120px", objectFit: "fill" }} />
        <div className='card-body'>
          <h5 className='card-title'>{foodItem.name}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className='m-2 h-100 bg-success rounded' style={{ color: "black" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ color: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className='d-inline ms-2 h-100 w-20 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}