import React from 'react';
import {Link} from 'react-router-dom';


class Navbar extends React.Component {
    state = {
        text : ''
    }

    handleClick = () => {
        this.props.toggleCatList();
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        }, ()=>{
            this.props.fetchSearchText(this.state.text);
        })
    }

    render(){
        return (
            <nav className="navbar">
                <div className="nav-wrapper">
                    <div className="menu">
                        <i className="material-icons"  onClick={this.handleClick} >menu</i>
                    </div>
                    <div className="logo">
                        <Link to="/" >Logo</Link>
                    </div>
                    <div className="form-container">
                        <form className="search-form">
                            <input onChange={ this.handleChange } className="search-box" type="text" placeholder="Search for your product" />
                        </form>
                    </div>
                    <ul  className=" navbar-links">
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
