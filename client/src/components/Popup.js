/*
Popup: creates a button that when pressed displays a popup with info
    popup has a close button to close it.

Format:
<Popup display="Second Button" info = {modalV3Contents2}/>
    -- display is what the button shows
    -- info is what the popup shows

<Popup width="25%" height="25%" display="Second Button" info = {modalV3Contents2}/>
    -- default is the window is half the size of the screen
    -- but you can specify what you want to change that. (still working out how)
*/


import React from 'react'
import './Popup.css'

class Popup extends React.Component {

    // Count Popups to give them unique IDs
    static PopupCount = 0;

    constructor(props) {
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleSpanClick = this.handleSpanClick.bind(this);
    }

    handleBtnClick(PopupCount) {
        var popup = document.getElementById("myPopup" + PopupCount)
        var btn = document.getElementById("myPopupBtn" + PopupCount)
        popup.style.display = "block" 
        //btn.style.display = "none"
        //btn.style.visibility = "hidden"
        btn.disabled = true;
    }

    handleSpanClick(PopupCount) {
        var popup = document.getElementById("myPopup" + PopupCount)
        var btn = document.getElementById("myPopupBtn" + PopupCount)
        popup.style.display = "none"
        //btn.style.display = "block"
        //btn.style.visibility = "visible"
        btn.disabled = false;
    }

    render() {
        var PopupCount = Popup.PopupCount++;
        var popupStyle = {
            width: this.props.width ? this.props.width : "50%",
            height: this.props.height ? this.props.height : "50%",
        }

        return (
            <div>
                <button onClick={() => this.handleBtnClick(PopupCount)} id={"myPopupBtn" + PopupCount}>
                    {this.props.display}
                </button>
                <div style={popupStyle} id={"myPopup" + PopupCount} class="popup"> 
                    <span onClick={() => this.handleSpanClick(PopupCount)} class="popup-close">
                        &times;
                    </span>
                    <div class="popup-container">
                        <div class="popup-content">
                            {this.props.info}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Popup;