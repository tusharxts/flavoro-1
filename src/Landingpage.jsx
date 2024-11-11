import "./components/Landingpage.css";
// import foodbg from "/src/assets/food bg.jpg";
// import group1 from "/src/assets/Group 1.png";
// import pic1 from "/src/assets/pic1.png";
import foodpic2 from "/src/assets/foodpic2.jpg";
import pic2 from "/src/assets/pic2.jpg";
import pic3 from "/src/assets/pic3.jpg";
import pic4 from "/src/assets/pic4.jpg";
import pic5 from "/src/assets/pic5.jpg";
import pic6 from "/src/assets/pic6.jpg";
import pic7 from "/src/assets/pic7.jpg";
import pic8 from "/src/assets/pic8.jpg";
import pizza from "/src/assets/pizza.png";
import chef from "/src/assets/chef.png";
import burger from "/src/assets/buger.png/";
import Navbar from "./components/Navbar";
import varity from "/src/assets/varity.jpg"
import delivery from "/src/assets/delivery.jpg";
import tasty from "/src/assets/tasty.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Flavour that speakes louder than words! </h1>
          <p>
            Enjoy delicious meals delivered right to your door, with every dish
            crafted for taste and convenience. Savor your favorites without
            leaving home just a click away.
          </p>

          <button className="cta-button">
            
            <Link to="/Home">Order Now</Link>  
          </button>
        </div>
        <div className="hero-img">
          <img src={pizza} alt="" />
        </div>
      </section>

      <div className="menu-container">
        <h2 className="menu-heading">Whats on your mind?</h2>
        <div className="lp-cards">
          <div className="cardm">
            <img src={pic2} alt="" href="http://localhost:5173/Home" />
          </div>
          <div className="cardm">
            <img src={pic3} alt="" />
          </div>
          <div className="cardm">
            <img src={pic4} alt="" />
          </div>
          <div className="cardm">
            <img src={pic5} alt="" />
          </div>
          <div className="cardm">
            <img src={pic6} alt="" />
          </div>
          <div className="cardm">
            <img src={pic7} alt="" />
          </div>
          <div className="cardm">
            <img src={pic8} alt="" />
          </div>

          {/* <div className="card">Card 5</div> */}
          {/* Add more cards as needed */}
        </div>
      </div>
      <div className="offer-container">
        <div className="text-section">
          <h2>Special offer!!!</h2>
          <h1>GOOD FOOD GOOD MOOD</h1>
          <p>
            Improve your verbal skills and prepare for the Infosys recruitment
            process with Infosys online verbal ability questions.
          </p>
        </div>
        <div className="image-section">
          <img src={burger} alt="Food Offer"></img>
        </div>
      </div>

      <div className="features">
        <h2>Why Choose Us</h2>
        <div className="feature-cards">
          <div className="card">
            <div className="card-img">
              <img src={varity} alt="" />
              </div> 
            <h3>Fresh Ingredients</h3>
            <p>We use only the freshest ingredients in our meals.</p>
          </div>
          <div className="card">
          <div className="card-img">
              <img src={delivery} alt="" />
              </div> 
            <h3>Fast Delivery</h3>
            <p>Get your food delivered quickly and hot.</p>
          </div>
          <div className="card">
          <div className="card-img">
              <img src={tasty} alt="" />
              </div>
            <h3>Wide Variety</h3>
            <p>Choose from a wide range of cuisines and dishes.</p>
          </div>
        </div>
      </div>
      {/* <div className="about">
        <div className="about-img">
          <img src={foodpic2} alt="food" />
        </div>
        <div className="about-p">
          <p>
            <b>We Crafted </b> delectable <b>and</b> flavorful food{" "}
            <b>using organic</b> ingredients
          </p>
          <img src={chef} alt="" />
        </div>
      </div> */}

      <section className="testimonials" id="testimonials">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="badge">TESTIMONIAL</span>
            <h2>Testimonials from Individuals</h2>
          </div>
          <div className="testimonials-content">
            <div className="testimonial-card">
              <span className="quote-icon">❝</span>
              <p>
                “Absolutely love this fashion website! Trendy styles, fantastic
                quality, and a breeze to shop. My closet has never looked
                better! Highly recommend!”
              </p>
              <h4>AREFIN SHUVO</h4>
              {/* <p className="designation">Product Designer</p> */}
            </div>
            <div className="testimonial-card">
              <span className="quote-icon">❝</span>
              <p>
                “Absolutely love this fashion website! Trendy styles, fantastic
                quality, and a breeze to shop. My closet has never looked
                better! Highly recommend!”
              </p>
              <h4>JOHN CARTER</h4>
              {/* <p className="designation">Product Designer</p> */}
            </div>
          </div>
        </div>
      </section>
      <div className="contact-page-wrapper">
        <h1 className="primary-heading">Have Question In Mind?</h1>
        <h1 className="primary-heading">Let Us Help You</h1>
        <div className="contact-form-container">
          <input type="text" placeholder="yourmail@gmail.com" />
          <button className="secondary-button">Submit</button>
        </div>
      </div>
    
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>About Us</h3>
            <p>
              We are passionate about delivering the best food ordering
              experience. From your favorite restaurants to your doorstep, we
              ensure fast and reliable service.
            </p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Menu</a>
              </li>
              <li>
                <a href="#">Order Now</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: support@Flavoro.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Food Street, Culinary City, FL</p>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        {/* <div className="footer-bottom">
          <p>&copy; 2024 Flavoro. All Rights Reserved.</p>
        </div> */}
      </footer>
    </div>
    </>
  );
};

export default LandingPage;
