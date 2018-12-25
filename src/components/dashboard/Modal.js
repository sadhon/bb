import React from 'react'

class Modal extends React.Component {

    handleClick =()=>{
        this.props.hideModal();
    }





    render(){
        return (
            <div>
              This is modal
              <button onClick={this.handleClick}> Hide Modal </button>
            </div>
          )
    }

}

export default Modal
