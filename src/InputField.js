import React from 'react';

class InputFiled extends React.Component{
  render() {
    return (
      <div className="inputFiled">
         
         <input 
                className={this.props.className}
                type={this.props.type}
                placeholder ={this.props.placeholder}
                value={this.props.value}
                onChange={ (e) => this.props.onChange(e.target.value) }
         />

         

      </div>
    );
  }
  
}

export default InputFiled;
