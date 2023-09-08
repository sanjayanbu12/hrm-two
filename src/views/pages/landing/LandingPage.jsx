import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom';
  
const LandingPage = () => {
  return (
    <div className="body-wrap">
      <div className="site-header">
            <div className="container">
                <div className="site-header-inner">
                    <div className="brand header-brand">
                        <h2 className="m-0">
							
								{/* <img className="header-logo-image" src="./logo.svg" alt="Logo" /> */}
                <div className="header-logo-image">
                  Square
                </div>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">Human Resource Management</h1>
                <p className="hero-paragraph">
                Your gateway to seamless HR operations. Embark on a journey of streamlined processes, team empowerment, and elevated organizational efficiency with us</p>
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
