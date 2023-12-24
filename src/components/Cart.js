import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
export default function Cart(props) {

    let dispatch = useDispatchCart();
    let data=useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    let options=props.options;
    let priceOptions = Object.keys(options);

  let foodItem = props.foodItems;
  const handleAddToCart =async()=>{ 
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});
    console.log(data)
  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="Food" style={{height : "150px" , objectFit : "fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-primary text-white rounded' onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1}>{i + 1}</option>
                )
              })}
            </select>

            <select className='m-2 h-100 bg-primary text-white rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>

            <div className='d-inline h-100 fs-5'>
              Rs.{finalPrice}/-
            </div>
            <hr/>
            <button className='btn btn-primary justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
