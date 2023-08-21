import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router';
  
const LandingPage = () => {
// const navigate=useNavigate();
  return (
    <div className="body-wrap">
      <div className="site-header">
            <div className="container">
                <div className="site-header-inner">
                    <div className="brand header-brand">
                        <h1 className="m-0">
							
								{/* <img className="header-logo-image" src="./image(1).png" alt="Logo" /> */}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">Landing Page</h1>
                <p className="hero-paragraph">
                  Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
                </p>
                <div className="hero-cta">
            
              <Link className="button button-primary" to="/pages/register/register3">
              Register now 
              </Link>
              <Link className="button" to="/pages/login/login3">
              Get Started
              </Link> 
            </div>
              </div>
              <div className="hero-figure anime-element">
                <svg className="placeholder" width="528" height="396" viewBox="0 0 528 396">
                  <rect width="528" height="396" />
                </svg>
                <div className="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
                <div className="hero-figure-box hero-figure-box-02" data-rotation="-45deg"></div>
                <div className="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
                <div className="hero-figure-box hero-figure-box-04" data-rotation="-135deg"></div>
                <div className="hero-figure-box hero-figure-box-05"></div>
                <div className="hero-figure-box hero-figure-box-06"></div>
                <div className="hero-figure-box hero-figure-box-07"></div>
                <div className="hero-figure-box hero-figure-box-08" data-rotation="-22deg"></div>
                <div className="hero-figure-box hero-figure-box-09" data-rotation="-52deg"></div>
                <div className="hero-figure-box hero-figure-box-10" data-rotation="-50deg"></div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default LandingPage;
