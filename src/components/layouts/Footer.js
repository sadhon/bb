import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-links">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about-us">About us</Link>
                </li>
                <li>
                    <Link to="/contact-us">Contact us</Link>
                </li>
                <li>
                    <Link to="/terms-of-services">Terms of Services</Link>
                </li>
                <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
            </ul>
        </div>

        <p>&copy; 2019 BaburBazar</p>
      
    </div>
  )
}

export default Footer
