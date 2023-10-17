import React from "react";
import HostelNav from "../components/HostelNav";

function Hostels(){
    
    return(
        <div className="flex flex-col items-center">
            <HostelNav />

            <div id="carouselExampleAutoplaying" className="carousel slide w-3/4 mt-4" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="../assets/BH-1.png" className="d-block w-100 h-[30rem] rounded-xl" alt="bh1" />
                    </div>
                    <div className="carousel-item">
                        <img src="../assets/BH-2.png" className="d-block w-100 h-[30rem] rounded-xl" alt="bh2" />
                    </div>
                    <div className="carousel-item h-90">
                        <img src="../assets/BH-3.png" className="d-block w-100 h-[30rem] rounded-xl" alt="bh3" />
                    </div>
                    <div className="carousel-item h-90">
                        <img src="../assets/BH-4.png" className="d-block w-100 h-[30rem] rounded-xl" alt="bh4" />
                    </div>
                    <div className="carousel-item h-90">
                        <img src="../assets/GH.png" className="d-block w-100 h-[30rem] rounded-xl" alt="gh" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-black" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Hostels;