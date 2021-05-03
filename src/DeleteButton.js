import React from 'react';

class DeleteButton extends React.Component{
  render() {
    return (
      <div className="deleteButton">
         <button 
            className = {this.props.className}
            id={this.props.id}
            disabled = {this.props.disabled}
            onClick = {() => this.props.onClick() }
          >
            {this.props.text}
         </button>
      </div>
    );
  }
  
}

export default DeleteButton;