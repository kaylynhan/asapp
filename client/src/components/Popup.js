/*
Popup: creates a button that when pressed displays a popup with info
    -- the popup has a close button to close it.
    
FORMAT:
    <Popup display="ButtonText" info = {PopupContents}/>
        -- display: what the button shows
        -- info: what the popup shows
WITH PROPERTIES:
    <Popup x="25%" y="25%" width="25%" height="25%" display="ButtonText" info = {PopupContents}/>
        -- Properties:
            x,y: the location of the top left corner
            width,height: the dimensions of the window
        -- Default Property Values: the window is centered and half the size of the screen
                ie, x="25%", y="25%", width="50%", height="50%"
*/

import React from "react"
import "./Popup.css"

class Popup extends React.Component {

    // Count Popups to give them unique IDs
    static PopupCount = 0

    constructor(props) {
        super(props)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleSpanClick = this.handleSpanClick.bind(this)
    }

    // Opens Popup
    handleBtnClick(PopupCount) {
        var popup = document.getElementById("myPopup" + PopupCount)
        var btn = document.getElementById("myPopupBtn" + PopupCount)
        popup.style.display = "block"
        btn.disabled = true
    }



    // Closes Popup
    handleSpanClick(PopupCount) {
        var popup = document.getElementById("myPopup" + PopupCount)
        var btn = document.getElementById("myPopupBtn" + PopupCount)
        popup.style.display = "none"
        btn.disabled = false
    }

    render() {
        // New popup
        var PopupCount = ++Popup.PopupCount

        // Process Popup properties
        var popupStyle = {
            width: this.props.width ? this.props.width : "50%",
            height: this.props.height ? this.props.height : "50%",
            top: this.props.y ? this.props.y : "25%",
            left: this.props.x ? this.props.x : "25%",
        }

        return (
            <div>
                {/* Popup Button */}
                <button className="popupBtn"
                    onClick={() => this.handleBtnClick(PopupCount)}
                    id={"myPopupBtn" + PopupCount}
                    >
                    {this.props.display}
                </button>
                {/* Popup Window */}
                <div className="popup"
                    style={popupStyle}
                    id={"myPopup" + PopupCount}
                    >
                    {/* Close Button */}
                    <span className="popupClose"
                        onClick={() => this.handleSpanClick(PopupCount)}
                        >
                        &times
                    </span>
                    {/* Popup Content Container */}
                    <div className="popupContainer">
                        <div className="popupContent">
                            {/* Popup Content (Property passed in)*/}
                            {this.props.info}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup
