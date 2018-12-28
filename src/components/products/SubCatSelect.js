import React, { Component } from 'react'

class SubCatSelect extends Component {
    state = {
        sub: ''
    }
    render() {

        return (
            <div className="input-field col s12">
                <div className="row">
                    <select value={this.state.sub} id="sub" className="capitalize col m6 s12" onChange={this.handleChange}>
                        sub cat
                    </select>
                </div>       
            </div>
        )
    }
}

export default SubCatSelect
