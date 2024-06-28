import React , {useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import pics from '../assets/landingPage/pics1.png';
import next from '../assets/landingPage/next.png';
import skin from '../assets/landingPage/skin.jpg';
import cent from '../assets/landingPage/centella1.jpg';
import creamPack from '../assets/landingPage/creamPack.jpg';
import sun from '../assets/landingPage/sun.jpg';
import oriflame from '../assets/landingPage/oriflam.png';
import sunkissed from '../assets/landingPage/sunkissed.jpeg';
import orange from '../assets/landingPage/orange.png';
import AOS from 'aos';
import 'aos/dist/aos.css';




const Home = () => {
    const frameRef = useRef(null);
    const sliderRef = useRef(null);
    const [itemDisplay, setItemDisplay] = useState(3);
    const [margin, setMargin] = useState(10);
    const [itemDisplay2, setItemDisplay2] = useState(3);
    const [margin2, setMargin2] = useState(10);
    const [active, setActive] = useState(false);
    const [active2, setActive2] = useState(false);
    let pagination = useRef(0)
    let  totalWidth = useRef(0);

    const slideRef = useRef(null);
    const slidersRef = useRef(null);
    useEffect(() => {
        AOS.init();
      }, [])

    const handleSlide = (direction, frame) => {
        const scrollAmount = frame.current.clientWidth * direction;
        frame.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };


    useEffect(() => {
        const currentFrame = frameRef.current;

        const updateButtonState = () => {
            if (currentFrame.scrollLeft <= 0) {
                setActive(false);
            } else {
                setActive(true);
            }
        };

        if (currentFrame) {
            currentFrame.addEventListener('scroll', updateButtonState);
        }

        return () => {
            if (currentFrame) {
                currentFrame.removeEventListener('scroll', updateButtonState);
            }
        };
    }, []);

    useEffect(() => {
        const currentFrame = slideRef.current;

        const updateButtonState = () => {
            if (currentFrame.scrollLeft <= 0) {
                setActive2(false);
            } else {
                setActive2(true);
            }
        };

        if (currentFrame) {
            currentFrame.addEventListener('scroll', updateButtonState);
        }

        return () => {
            if (currentFrame) {
                currentFrame.removeEventListener('scroll', updateButtonState);
            }
        };
    }, []);

    const updateDisplay = () => {
        if (window.innerWidth > 900) {
          setItemDisplay(4);
          setMargin(12.8);
        } else if (window.innerWidth < 900 && window.innerWidth > 700) {
          setItemDisplay(3);
          setMargin(12.8);
        } else if (window.innerWidth < 700 && window.innerWidth > 500) {
          setItemDisplay(1);
          setMargin(11);
        }else if (window.innerWidth < 500) {
          setItemDisplay(1);
          setMargin(1);
        }
      };

      const updateDisplay2 = () => {
        if (window.innerWidth > 900) {
          setItemDisplay2(2);
          setMargin2(12.8);
        } else if (window.innerWidth < 900 && window.innerWidth > 700) {
          setItemDisplay2(2);
          setMargin2(12.8);
        } else if (window.innerWidth < 700) {
          setItemDisplay2(1);
          setMargin2(1);
        }
      };
    
    
    useEffect(() => {
          updateDisplay();
            window.addEventListener('resize', updateDisplay);

            return () => {
            window.removeEventListener('resize', updateDisplay);
            };
    }, [setItemDisplay])

    useEffect(() => {
        updateDisplay2();
        window.addEventListener('resize', updateDisplay2);

        return () => {
        window.removeEventListener('resize', updateDisplay2);
        };
    }, [itemDisplay2])

    useEffect(() => {

        const liElement = Array.from(frameRef.current.children);
        liElement.forEach((item) => {
          const div = sliderRef.current.clientWidth / itemDisplay;
          const remainder = sliderRef.current.clientWidth % itemDisplay;
          const imgWidth = div + remainder - margin;
    
          item.style.width = `${imgWidth}px`;
          
        });
      }, [itemDisplay, margin]);

      useEffect(() => {
        const liElements = Array.from(slideRef.current.children);
        liElements.forEach((item) => {
          const div = slidersRef.current.clientWidth / itemDisplay2;
          const remainder = slidersRef.current.clientWidth % itemDisplay2;
          const imgWidth = div + remainder - margin2;
    
          item.style.width = `${imgWidth}px`;

          totalWidth.current += item.offsetWidth;

            let comp = getComputedStyle(item);
            totalWidth.current += parseInt(comp.marginLeft);
    
    
        });
      }, [itemDisplay2, margin2, setItemDisplay2]);

      useEffect(() => {
        console.log(totalWidth.current)
        console.log(slidersRef.current.clientWidth)
        pagination.current = totalWidth.current / slidersRef.current.clientWidth
        pagination.current = Math.floor(pagination.current);
        console.log(pagination.current)

      }, [totalWidth])
      

      const updateActiveButton = () => {
        const currentIndex = Math.round(slideRef.current.scrollLeft / slideRef.current.clientWidth);
        const buttons = document.querySelectorAll('.slides .div1');
        console.log(currentIndex)
    
        buttons.forEach((button, index) => {
            if (index === currentIndex) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    };
    
    useEffect(() => {
        const slide = slideRef.current;
    
        const handleScroll = () => {
            updateActiveButton();
        };
    
        if (slide) {
            slide.addEventListener('scroll', handleScroll);
        }
    
        return () => {
            if (slide) {
                slide.removeEventListener('scroll', handleScroll);
            }
        };
    }, []); 


  return (
    <div class="container">
        <section className="hero">
            <div className='part1' data-aos="zoom-out-up">
                <h1>body care and 
                    <br/> Fragrance products</h1>

                <span className="btn"><Link to="/login">Explore More</Link> <span className="btn2"><i className='bx bx-right-arrow-alt'></i></span></span>
               <p className="tag1">We believe in the transformative power of effective skincare and luxurious <br/>
                fragrances. Our curated selection features top-quality skincare products <br />
                from renowned brands known for their excellence and innovation. Discover <br />
                a wide range of perfumes, roll-ons, and sprays, meticulously chosen to<br />
                enhance your beauty and elevate your senses. Explore our website for a <br />
                blend of skincare essentials and captivating fragrances that cater to <br />
                your every need.</p>
                <p className="tag2">We believe in the transformative power of effective skincare and luxurious
                fragrances. Our curated selection features top-quality skincare products 
                from renowned brands known for their excellence and innovation. Discover
                a wide range of perfumes, roll-ons, and sprays, meticulously chosen to
                enhance your beauty and elevate your senses. Explore our website for a 
                blend of skincare essentials and captivating fragrances that cater to
                your every need.</p>
                <div className="card">
                    
                        <img src={skin} alt="skin-1" data-aos="flip-right"/>

                        <img src={next} alt="skin-1" data-aos="flip-right"/>

                        <img src={pics} alt="skin-1" data-aos="flip-right" />
                </div>
            </div>
            <div className='part2' data-aos="fade-left">
                <div className="pics" >
                    
                </div>
                <div className="pics3">
                    <div className="open">
                        <span className="arr"><Link to="/login">&#8599;</Link></span>
                        <span className="text">Open Product</span>
                    </div>
                    <div className="sm-pics">
                        <img src={cent} alt="sm-pics" />
                        <div className='content'>
                            <span className="cont-text">Discounted face serum</span>
                        <span className="arr"><Link to="/login">&#8599;</Link></span>
                        </div>
                        <span className="disc">30%</span>
                        <span className="price">10,000</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="sect-2">
            <h1>OUR PRODUCT RANGE</h1>
            <div className="cards">
                <div className="card none" data-aos="fade-left">
                    <img src={sun} alt="card-1" />
                    <span className="sp">Cleaniness and exfoliation</span>
                    <div className='content'>
                            <span className="cont-text">Discover</span>
                        <span className="arr"><Link to="/login">&#8599;</Link></span>
                        </div>
                </div>
                <div className="card" data-aos="fade-left">
                    <img src={creamPack} alt="card-2" />
                    <span className="sp"> Mosturizing and toning</span>
                    <div className='content'>
                            <span className="cont-text">Discover</span>
                        <span className="arr"><Link to="/login">&#8599;</Link></span>
                    </div>
                </div>
                <div className="card" data-aos="fade-left">
                    <img src={sunkissed} alt="card-3" />
                    <span className="sp">Perfumes and Deodorants</span>
                    <div className='content'>
                            <span className="cont-text">Discover</span>
                        <span className="arr"><Link to="/login">&#8599;</Link></span>
                    </div>
                </div>
            </div>
        </section>
        <section className="sect-3">
            <div className="pt-1">
                <div className="d-50" data-aos="fade-down">
                    <div className="disc-div" >
                        <h1 className="off">+50</h1>
                        <span className="arr"><Link to="/login">&#8599;</Link></span>
                    </div>
                    <div className="fl">
                        <img src={oriflame} alt="oriflame" />
                        <div className="sp-btn">
                            <span className='sp'>types of <br />
                            product for the <br />
                            core of your skin</span>
                            <span className='bt'>
                                New Products +5
                            </span>
                        </div>
                    </div>
                </div>
                <div className='d-60' data-aos="fade-left">
                <   div className="disc-div2">
                        <h1 className="off">35% <br /> <span>OFF</span></h1>
                        <span className="arr"><Link to="/login">&#8599;</Link></span>
                    </div>
                    <span className="text">Body care and <br /> wellness products</span>
                </div>
            </div>
            <div className="pt-2">
                <p className="tag3">
                    Ready to elevate your skin care routine and <br />
                    achieve your skin goals? Browse our selection of<br/>
                     skin care products and discover the perfect<br/>
                     solutions for your unique needs.Plus enjoy fast <br />
                     shipping and hassle free returns for a seamless<br />
                     shopping experience. 
                </p>
                <p className="tag4">
                    Ready to elevate your skin care routine and 
                    achieve your skin goals? Browse our selection of
                     skin care products and discover the perfect
                     solutions for your unique needs.Plus enjoy fast 
                     shipping and hassle free returns for a seamless
                     shopping experience. 
                </p>
                <span className="btn"><Link to="/login">Explore More</Link> <span className="btn2"><i className='bx bx-right-arrow-alt'></i></span></span>
            </div>
        </section>
        <section className="sect-4">
            <div className="product">
                <h1>OUR BEST PRODUCTS</h1>
                <p>We have solutions to help you achieve smoother, <br />
                clearer and more youthful-looking skin </p>
            </div>
            <div className="product-card" ref={sliderRef}>
                <div className="main-ctn" ref={frameRef}>
                <div className="P-card p-card1"  data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Cloud Milk full body set</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card2" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Fenty Moisturizer</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card3" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card4" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card5" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card6" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card7" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card8" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card9" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card10" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card11" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card12" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                <div className="P-card p-card13" data-aos="flip-down">
                    <span className="cart">Add to cart <strong><i class='bx bx-shopping-bag'></i></strong></span>
                    <div className="itemName">
                        <span className="item">Neutriherbs</span>
                        <span className="ptag">&#8358;25,000</span>
                    </div>
                </div>
                </div>
                <div className="controls">
                    <div className="pagination">
                        <span className={`prev ${!active ? 'active' : ''}`} id="prev-slide" onClick={() => handleSlide(-1, frameRef)}><i className='bx bx-left-arrow-alt'></i></span>
                        <span className={`next ${active ? 'active': ''}`} id="next-slide" onClick={() => handleSlide(1, frameRef)}><i className='bx bx-right-arrow-alt'></i></span>
                        <span className="avail-prod">Products (13)</span>
                    </div>
                    <span className="btn">Open store <span className="btn2"><i class='bx bx-right-arrow-alt'></i></span></span>
                </div>
            </div>
        </section>
        <section className="sect-5">
            <div className="sect">
                <div className="txt">
                    <h1>WHY CHOOSE ORCHEN?</h1>
                    <p>Whether you have dry, sensitive, oily or combination skin, our<br />
                    skin care expert are here to help you find the perfect product<br />
                    for your individual needs.</p>
                </div>
                <div className="crds">
                    <div className="crd" >
                    <span className='icon'><i className='bx bxs-donate-blood'></i></span>
                        <span className="tx">Personalized <br />Solutions</span>
                    </div>
                    <div className="crd">
                        <span className='icon'><i className='bx bxs-florist'></i></span>
                        <span className="tx">Natural <br />Ingredients</span>
                    </div>
                    <div className="crd">
                        <span className='icon'><i className='bx bxs-cookie' ></i></span>
                        <span className="tx">Effective <br />Result</span>
                    </div>
                </div>
            </div>
            <div className="img">
                    <img src={orange} alt="orange" />
            </div>
        </section>
        <section className="sect-6">
        <div className="text-sect">
            <h1>Here is what our customers say  <br />about us</h1>
            <div className="ctn-span">
                <span>reviews (6)</span>
                <span className={`left ${!active2 ? 'active' : ''}`} id="prev" onClick={() => handleSlide(-1, slideRef)}><i className='bx bx-left-arrow-alt'></i></span>
                <span  className={`left ${active2 ? 'active' : ''}`} id="next" onClick={() => handleSlide(1, slideRef)}><i className='bx bx-right-arrow-alt'></i></span>
            </div>
        </div>
            <div className="crd" ref={slidersRef}>
                <div className="card" ref={slideRef}>
                    <div class="review-container" data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1500">
                        <h4 class="reviewer-name">Michael R</h4>
                        <p class="review-text">"This skincare product is absolutely amazing! It has really improved my skin's texture and clarity. After just a few weeks of use, I've noticed a significant reduction in blemishes and my skin feels much smoother. The hydrating effects are incredible and it leaves my skin feeling fresh all day. Highly recommend!"</p>
                        <span class="review-source">Reviewed on <strong> INSTA<i className='bx bxl-instagram-alt'></i></strong></span>
                    </div>  
                    <div class="review-container" data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500">
                        <h4 class="reviewer-name">Wendy B.</h4>
                        <p class="review-text">"This skincare product is absolutely amazing! It has really improved my skin's texture and clarity. After just a few weeks of use, I've noticed a significant reduction in blemishes and my skin feels much smoother. The hydrating effects are incredible and it leaves my skin feeling fresh all day. Highly recommend!"</p>
                        <span class="review-source">Reviewed on <strong> INSTA <i className='bx bxl-instagram-alt'></i></strong></span>
                    </div>
                    <div class="review-container" data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500">
                        <h4 class="reviewer-name">Wendy B.</h4>
                        <p class="review-text">"This skincare product is absolutely amazing! It has really improved my skin's texture and clarity. After just a few weeks of use, I've noticed a significant reduction in blemishes and my skin feels much smoother. The hydrating effects are incredible and it leaves my skin feeling fresh all day. Highly recommend!"</p>
                        <span class="review-source">Reviewed on <strong> INSTA <i className='bx bxl-instagram-alt'></i></strong></span>
                    </div>
                    <div class="review-container" data-aos="fade-down"
                                data-aos-easing="linear"
                                data-aos-duration="1500">
                        <h4 class="reviewer-name">Wendy B.</h4>
                        <p class="review-text">"This skincare product is absolutely amazing! It has really improved my skin's texture and clarity. After just a few weeks of use, I've noticed a significant reduction in blemishes and my skin feels much smoother. The hydrating effects are incredible and it leaves my skin feeling fresh all day. Highly recommend!"</p>
                        <span class="review-source">Reviewed on <strong> INSTA <i className='bx bxl-instagram-alt'></i></strong></span>
                    </div>
                    <div class="review-container" data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500">
                        <h4 class="reviewer-name">Wendy B.</h4>
                        <p class="review-text">"This skincare product is absolutely amazing! It has really improved my skin's texture and clarity. After just a few weeks of use, I've noticed a significant reduction in blemishes and my skin feels much smoother. The hydrating effects are incredible and it leaves my skin feeling fresh all day. Highly recommend!"</p>
                        <span class="review-source">Reviewed on <strong> INSTA <i className='bx bxl-instagram-alt'></i></strong></span>
                    </div>
                    <div class="review-container" data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500">
                        <h4 class="reviewer-name">Wendy B.</h4>
                        <p class="review-text">"This skincare product is absolutely amazing! It has really improved my skin's texture and clarity. After just a few weeks of use, I've noticed a significant reduction in blemishes and my skin feels much smoother. The hydrating effects are incredible and it leaves my skin feeling fresh all day. Highly recommend!"</p>
                        <span class="review-source">Reviewed on <strong> INSTA <i className='bx bxl-instagram-alt'></i></strong></span>
                    </div>
                </div>

                <div className="slides">
                {Array.from({ length: pagination.current }, (_, index) => (
                            <div key={index} className={`div1 ${index === 0 ? 'active' : ''}`}></div>
                        ))}
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home