import React from 'react';
import {Link} from 'react-router-dom';


class Navbar extends React.Component {

    handleClick = () => {
        this.props.toggleCatList();
    }

    render(){
        return (
            <nav className="navbar">
                <div className="nav-wrapper">
                    <div className="menu">
                        <i className="material-icons"  onClick={this.handleClick} >menu</i>
                    </div>
                    <div className="logo">
                        <Link to="/" className="brand-logo">Logo</Link>
                    </div>
                    <div className="form-container">
                        <form className="search-form">
                            <input className="search-box" type="text" placeholder="Search for your product" />
                            <button className="search-submit">
                                <i className="material-icons">search</i>
                            </button>
                        </form>
                    </div>
                    <ul  className="right hide-on-med-and-down navbar-links">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        )
    }

}

export default Navbar
