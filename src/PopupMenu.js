import React, { Component } from 'react';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

class PopupMenu extends Component {
    constructor() {
        super(...arguments);
        this.items = [
            {
                text: 'Edit',
                id: this.props.id
            },
            {
                text: 'Delete',
                id: this.props.id
            }
        ];
    }
    render() {
        return (
        <div className = "editButton">
            <DropDownButtonComponent items={this.items} cssClass='e-caret-hide'>
                <div className="dots"></div>
            </DropDownButtonComponent>
        </div>);
    }
}

export default PopupMenu;