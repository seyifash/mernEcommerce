import React, {useEffect} from 'react';
import './home.css';
import fenty from '../assets/landingPage/fentyskin.png';
import olay from '../assets/olayretinol.png';
import argan from '../assets/landingPage/arganoil.png';
import cerave from '../assets/landingPage/cerave.png';
import sauvage from '../assets/landingPage/sauvage.png';
import gucci from '../assets/gucci.png';
import dolce  from '../assets/dolce.png';
import missdior from '../assets/missdior.png';
import cleanser from '../assets/cleanser.png';
import toner from '../assets/toner.png';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Actions/productActions';

const Home2 = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);


  return (
    <>
    <div className="hero-section">
        <span className="span">Skin Care And <br />
        Fragrances <br />
        For Women <br /></span>
        <span className="span-text">The best skincare and fragrances<br /> for yourself as a gift</span>
        <div className="btn">Discover All</div>
    </div>
    <div className="best-seller">
       <div className="title">
        <h1>Best sellers</h1>
        <span>Shop All <strong>&#8599;</strong></span>
       </div>

       <div className="products">
        <div className="product">
            <img src={fenty}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4>Fenty</h4>
                <h5>Fenty Moisturizer</h5>
                <span>$17</span>
            </div>
        </div>
        <div className="product">
            <img src={olay}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4>Olay</h4>
                <h5>Olay Retinol</h5>
                <span>$19</span>
            </div>
        </div>
        <div className="product">
            <img src={argan}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4>Argan</h4>
                <h5>Argan Oil Body Lotion</h5>
                <span>$13</span>
            </div>
        </div>
        <div className="product">
            <img src={cerave}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4 className="brandName">Cerave</h4>
                <h5 className="productName">Cerave Moisturizer</h5>
                <span className="price">$25</span>
            </div>
        </div>
       </div>
    </div>
    <div className="best-seller  section-2">
       <div className="title">
        <h1>Featured Perfumes</h1>
       </div>

       <div className="products">
        <div className="product">
            <img src={gucci}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4>Gucci</h4>
                <h5>Gucci Guilty Elixir</h5>
                <span>$17</span>
            </div>
        </div>
        <div className="product">
            <img src={sauvage}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4>Dior</h4>
                <h5>Sauvage </h5>
                <span>$19</span>
            </div>
        </div>
        <div className="product">
            <img src={missdior}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4>Dior</h4>
                <h5>Miss Dior</h5>
                <span>$13</span>
            </div>
        </div>
        <div className="product">
            <img src={dolce}  alt="pro-1"/>
            <div className="save">
                <span className="new">New</span>
                <span className="save2">Save</span>
            </div>
            <div className="product-description">
                <h4 className="brandName">Dolce & gabbana</h4>
                <h5 className="productName">Light Blue Intense</h5>
                <span className="price">$100</span>
            </div>
        </div>
       </div>
    </div>

    <div className="newsLetter">
        <div className="consult">
            <h1>Talk To An Experienced
            Specialist Anytime, Anywhere</h1>
            <button>BOOK CONSULTATION</button> 
        </div>
    </div>

    <div className="cleanser-toners">
       <div className="cleanser">
        <img src={cleanser} alt="cleanser" />
        <div className="clean">
            <h1>Cleansers</h1>
            <button>Shop Now</button>
        </div>
       </div>
       <div className="toner">
       <img src={toner} alt="toner" />
       <div className="clean">
            <h1>Toners</h1>
            <button>Shop Now</button>
        </div>
       </div>
    </div>
    </>
  )
}

export default Home2