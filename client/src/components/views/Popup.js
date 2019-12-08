import React from "react"
import "../../css/Popup.css"

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

        var popupBtn = this.props.btn
            ? <div
                onClick={() => this.handleBtnClick(PopupCount)}
                id={"myPopupBtn" + PopupCount}>
                    {this.props.btn}
                </div>
            : <button className="popupBtn"
                onClick={() => this.handleBtnClick(PopupCount)}
                id={"myPopupBtn" + PopupCount}
                >
                    {this.props.display}
                </button>


        return (
            <div>
                {/* Popup Button */}
                {popupBtn}
                {/* Popup Window */}
                <div className="popup"
                    style={popupStyle}
                    id={"myPopup" + PopupCount}
                    >
                    {/* Close Button */}
                    <span className="popupClose"
                        onClick={() => this.handleSpanClick(PopupCount)}
                        >
                        &times;
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
