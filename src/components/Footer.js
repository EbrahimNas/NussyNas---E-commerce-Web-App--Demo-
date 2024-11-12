import React from 'react';
import  "../CSS/Footer.css";

function Footer() {
    return (
        <>
          <div className="fourhbanner">
            <div className="mainimage">
              <div id="mainimageone">
                <img
                  src="https://www.buscopng.com/wp-content/uploads/2021/03/Facebook-logo-circular.png"
                  alt=""
                />
                <a href='https://www.instagram.com/nussyxnas/?hl=en' target="_blank" rel="noopener noreferrer"><img
                  src="https://pleiadianportal.com/wp-content/uploads/2020/06/Purple-Insta.png"
                  alt=""
                /></a>
                <img
                  src="https://th.bing.com/th/id/OIP.Hl2RYSsqub1WD29SnnL2mAHaHa?w=2047&h=2047&rs=1&pid=ImgDetMain"
                  alt=""
                />
              </div>
              <div id="mainiamgetwo">
                <img
                  src="https://images.asos-media.com/navigation/visa-png"
                  alt=""
                />
                <img
                  src="https://images.asos-media.com/navigation/mastercard-png"
                  alt=""
                />
                <img
                  src="https://images.asos-media.com/navigation/pay-pal-png"
                  alt=""
                />
                <img
                  src="https://images.asos-media.com/navigation/american-express-png"
                  alt=""
                />
                <img
                  src="https://images.asos-media.com/navigation/visa-electron-png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="firstfooter">

                <div className="stylediv"  id="countries">
                 <h4>SHOPPING FROM:</h4>
                 <div className="differfromp">
                  <p className="stylep" style={{ letterSpacing: "2px" }}>
                    We are proudly{" "}
                  </p>
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/ng.png"
                    alt=""
                  />
                </div>
    
                <p className="stylep" style={{ letterSpacing: "2px" }}>
                  Some of the countries we ship to:
                </p>
                <div className="flags">
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/es.png"
                    alt=""
                    id="tohide"
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/de.png"
                    alt=""
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/au.png"
                    alt=""
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/fr.png"
                    alt=""
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/us.png"
                    alt=""
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/dk.png"
                    alt=""
                    id="tohide"
                  />
                </div>
                <div className="flags2">
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/za.png"
                    alt=""
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/nl.png"
                    alt=""
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/gh.png"
                    alt=""
                  />
                  <img
                    src="https://assets.asosservices.com/storesa/images/flags/gb.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="stylediv" id="tohide">
                <h4>ABOUT NUSSYNAS</h4>
                <p className="stylep"> ≫ Coming Soon ≪ </p>
                <p className="stylep">About us</p>
                <p className="stylep">Careers at NussyNas</p>
                <p className="stylep">Corporate responsibility</p>
              </div>
    
              <div className="stylediv" id="tohide">
                <h4>MORE FROM NUSSYNAS</h4>
                <p className="stylep"> ≫ Coming Soon ≪ </p>
                <p className="stylep">Mobile and NussyNas apps</p>
                <p className="stylep">Gift vouchers</p>
                <p className="stylep">Black Friday</p>
                <p className="stylep">Help improve the NussyNas Website</p>
              </div>

              <div className="stylediv">
                <h4>HELP & INFORMATION</h4>
                <p className="stylep"><strong><a href="mailto:nussyxnas@gmail.com">nussyxnas@gmail.com</a></strong></p>

                <div className="footerDeveloper">
                  <h4>Contact developer:</h4>
                  <h4><a href="mailto:ibrahimnas1@yahoo.com">ibrahimnas1@yahoo.com</a></h4>
                </div>
              </div>
    
            </div>

           
    
            <div className="footersecond">
              <div className="footerlastpartone">© 2024 NUSSYNAS</div>
              <div className="footerlastpart">
                <div className="oncome">Privacy &amp; Cookies</div>
                <div className="oncome">Ts&amp;Cs</div>
                <div className="oncome">Accessibility</div>
              </div>
            </div>
          </div>
        </>
      );
};

export default Footer;