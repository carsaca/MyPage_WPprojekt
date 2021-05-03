import React from 'react';

class Checkbox extends React.Component{
    

  render() {
    console.log(this.props);
    return (
      <div className="checkboxcontainer">
         
        <input className='checkbox'
                type={this.props.type}
           
                checked={this.props.checked}
                onChange={ (e) => this.props.onChange(e.target.value) }
         />

         

      </div>
    );
  }
  
}

export default Checkbox;
