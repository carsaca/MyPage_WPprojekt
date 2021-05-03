import React, { Component } from 'react';
import Modal from "react-responsive-modal";

import Colors from "./colors.scss";
import "./detailsModal.scss";
import PostStore from './stores/PostStore';
import InputFiled from './InputField';
import DateTimePicker from 'react-datetime-picker';
import Checkbox from './Checkbox';
import UsersDropdown from './UsersDropdown';

class AddNewPostModal extends Component {


    render() {
        return (
            <div>
                {this.props.showAddNewPost && (
                <Modal
                    open={this.props.showAddNewPost}
                    closeIconId="post-details-close-icon"
                    closeOnOverlayClick
                    closeOnEsc
                    modalId="post-details-modal"
                    onClose={() => {this.props.setAddNewPost(false); this.props.resetForm();}}
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
                            <big>Add new task</big> 
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
                                class="form-control rounded" rows="10"
                                onChange={(e) => this.props.setInputValue('description', e.target.value)}
                            />
                        </div>

                        <div>
                            <medium>Show everyone</medium>

                            <Checkbox
                            type='checkbox'
                            value={this.props.everyone}
                            onChange={() => this.props.setInputValue('everyone', !this.props.everyone)}
                        />
                        </div>

                        <div>
                            <medium>For someone</medium>
                                <Checkbox
                                    type='checkbox'
                                    onChange={() => this.props.setInputValue('haveTaskFor', !this.props.haveTaskFor)}
                                />
                            {this.props.haveTaskFor &&  (
                                <UsersDropdown 
                                
                                onChange={(val) => this.props.setInputValue('for', val)}
                                />
                            )}
                        </div>

                        
                    
                        <div>
                            <medium>Task deadline</medium>

                            <Checkbox
                                type='checkbox'
                                onChange={() => this.props.setInputValue('havedeadline', !this.props.havedeadline)}
                            />
                        </div> 

                        {this.props.havedeadline &&  (
                            <DateTimePicker
                                onChange={(val) => this.props.setInputValue('deadline', val)}
                                value={this.props.deadline}
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

export default AddNewPostModal;