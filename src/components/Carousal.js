import React from 'react'

export default function Carousal() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2 w-50" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-primary text-black bg-primary" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1100×500/?pizza" className="d-block w-100" alt="..." style={{filter:"brightness(50%)"}}/>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1100×500/?pastry" className="d-block w-100" alt="..." style={{filter:"brightness(50%)"}}/>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1100×500/?barbeque" className="d-block w-100" alt="..." style={{filter:"brightness(50%)"}}/>
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
        </div>
    )
}
