import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import Carousal from '../components/Carousal';

export default function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2 w-50" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {/* <button className="btn btn-outline-primary text-black bg-primary" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1100×500/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1100×500/?pastry" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1100×500/?barbeque" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>
            <div className='container m-3'>
                {
                    foodCat.length === 0 ? "" : foodCat.map((data) => {
                        return (
                            <div className='row mb-3' key={data._id}>
                                <div className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {
                                    foodItem.length === 0 ? <div>No data found</div> : foodItem
                                        .filter((item) => {
                                            return (item.CategoryName === data.CategoryName) &&
                                                (typeof item.name === 'string' && item.name.toLowerCase().includes(search))
                                        })
                                        .map((filterItems) => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-8 col-lg-3'>
                                                    <Cart
                                                        foodItem={filterItems}
                                                        options={filterItems.options[0]} 
                                                    />
                                                </div>
                                            );
                                        })
                                }

                            </div>
                        );
                    })
                }
            </div>
            <Footer />
        </div>
    );
}
