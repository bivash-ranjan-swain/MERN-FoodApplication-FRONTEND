import "./WeProvide.css"
import Food from "../assets/Food.jpg"
import { useNavigate } from "react-router-dom"

const WeProvide = () => {
  const navigate = useNavigate();

  return (
    <div className="weprovide-main">
      <div className="left">
        <img className="food-img" src={Food} alt="food" />
      </div>
      <div className="right">
        <p className="heading">We provide healthy food for your family.</p>
        <p className="f-para">Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city's rich culinary culture, we aim to honor our local roots while infusing a global palate.</p>
        <p className="s-para">At place, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.</p>
        <button className="btn" onClick={() => navigate("/facilities")}>More About Us</button>
      </div>
    </div>
  )
}

export default WeProvide