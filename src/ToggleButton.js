import React          from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default class ToggleButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Display: this.props.done ? true : false,
        }


    }

    ToggleButton(){
        this.setState((currentState) => ({
            Display: !this.state.Display, 
        }));
    }

    componentDidMount(){
        console.log(this.props.done);
        if(this.props.done){
            this.state.Display = true;
        }
        else{
            this.state.Display = false;
        }
    }


    

    render(){
        return(
            <div>
                
                
                
                <BootstrapSwitchButton 
                    onChange={() => {
                        this.ToggleButton();
                        this.props.SaveState(this.props.id);
                    }}
                    
                    size="sm"
                    checked={this.state.Display ? true : false} 
                    onlabel='Done!'
                    offlabel='Do'
                    width={80}
                    onstyle="dark"
                />

                
            </div>
        )
    }
}