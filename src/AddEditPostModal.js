import React, { Component } from 'react';
import Modal from "react-responsive-modal";

import Colors from "./colors.scss";
import "./detailsModal.scss";
import PostStore from './stores/PostStore';
import InputFiled from './InputField';
import DateTimePicker from 'react-datetime-picker';
import Checkbox from './Checkbox';
import UsersDropdown from './UsersDropdown';


function dateMySQL_toUTC(date){
    const splitDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    
    var newDate = new Date(splitDate);
    console.log(newDate);
    return newDate;
    //return Date.parse(newDate.toUTCString());
  }

class EditPostModal extends Component {


    render() {
        return (
            <div>
                {this.props.showEditPost && (
                <Modal
                    open={this.props.showEditPost}
                    closeIconId="post-details-close-icon"
                    closeOnOverlayClick
                    closeOnEsc
                    modalId="post-details-modal"
                    onClose={() => {this.props.setEditPost(false); this.props.resetForm();}}
                    styles={{
                    overlay: {
                        background: Colors.overlay,
                        display: "flex",
                        alignItems: "flex-start",
                        position: "fixed",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        overflowY: "auto",
                        overflowX: "hidden",
                        padding: "1.2rem",
                    },
                    }}
                >
                    <div className="detail-card container-xl-1" id="fadein">
                        <div>
                            <big>Edit task</big> 
                        </div>

                        <div>
                            <medium>Title</medium> 
                        </div>
        
                        <InputFiled
                            className="form-control form-control-lg"
                            type='text'
                            value={this.props.title ? this.props.title : ''}
                            onChange={(val) => this.props.setInputValue('title', val)}
                        />

                        <div>
                            <medium>Description</medium> 
                        </div>
                    
                        <div>
                            <textarea 
                                className="form-control rounded" rows="10"
                                value={this.props.description}
                                onChange={(e) => this.props.setInputValue('description', e.target.value)}
                            />
                        </div>

                        <div>
                            <medium>Show everyone</medium>

                            <Checkbox
                            type='checkbox'
                            checked={this.props.everyone}
                            onChange={() => this.props.setInputValue('everyone', !this.props.everyone)}
                        />
                        </div>

                        <div>
                            <medium>For someone</medium>
                                <Checkbox
                                    type='checkbox'
                                    checked={this.props.haveTaskFor}
                                    onChange={() => this.props.setInputValue('haveTaskFor', !this.props.haveTaskFor)}
                                />
                            {this.props.haveTaskFor &&  (
                                <UsersDropdown 
                                    value={this.props.for}
                                    onChange={(val) => this.props.setInputValue('for', val)}
                                />
                            )}
                        </div>

                        
                    
                        <div>
                            <medium>Task deadline</medium>

                            <Checkbox
                                type='checkbox'
                                checked={this.props.haveDeadline}
                                onChange={() => this.props.setInputValue('havedeadline', !this.props.havedeadline)}
                            />
                        </div> 

                        {this.props.haveDeadline &&  (
                            <DateTimePicker
                                onChange={(val) => this.props.setInputValue('deadline', val)}
                                value={  dateMySQL_toUTC(this.props.deadline) }
                            />
                        )}
                        
                        <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => this.props.Post()}>
                            Save
                        </button>


                    </div>
                </Modal>
                )} 
            </div>
        );
    }
}

export default EditPostModal;