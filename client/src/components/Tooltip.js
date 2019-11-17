/* Tooltip.js - A tooltip is an info icon with info that appears on hover.
*       IMPORTANT: The Tooltip REQUIRES a UNIQUE ID as the ID is how it
*            links the message to the icon.
*       Tooltip uses the module "react-tooltip" which may need to be installed.
*       Info can be declared elsewhere or injected directly.
* Example use case:
*---ExampleFile.js---
*       import Tooltip from "./Tooltip"
*
*       ... (inside JSX)
*
*           var ExampleInfo = <div>
*                   <p>First line of text.</p>
*                   <p>Second line of text.</p>
*               </div>
*           <Tooltip id="UniqueTooltipID" info = {ExampleInfo}/>
*---ExampleFile.css---
*       .UniqueTooltipID {
*           color: blue
*       }
*/

import React from "react"
import ReactTooltip from "react-tooltip"
import "./Tooltip.css"

class Tooltip extends React.Component {

    // Counter used to form unique IDs for Tooltips

    static tooltipCount = 0

    /*var popupStyle = {
        width: this.props.width ? this.props.width : "50%",
        height: this.props.height ? this.props.height : "50%",
        top: this.props.y ? this.props.y : "25%",
        left: this.props.x ? this.props.x : "25%",
    }*/

    render() {

        // Place tooltip info in stylable Div
        var tooltipInfo = <div className = "tooltipInfo">
            {this.props.info}
            </div>

        var tooltipStyle =
            this.props.arrowColor ?
                {
                "--background-color": this.props.backgroundColor ? this.props.backgroundColor : "#888888",
                "--arrow-color": this.props.arrowColor
                }
            :
                {
                "--background-color": this.props.backgroundColor ? this.props.backgroundColor : "#888888",
                }

        // Create new Tooltip
        Tooltip.tooltipCount++

        return (
            <div className="tooltipDiv">
                {/* Tooltip Icon */}
                <svg>
                    {/* Circle Background */}
                    <circle
                        data-tip data-for={"Tooltip#" + Tooltip.tooltipCount}
                        cx = "14" cy="14" r="10"
                    />
                    {/* Question Mark */}
                    <text
                        data-tip data-for={"Tooltip#" + Tooltip.tooltipCount}
                        textAnchor="middle"
                        x="14" y="19"
                    >
                        ?
                    </text>
                </svg>
                {/* Tooltip Container */}
                <div className="tooltipContent" style={tooltipStyle}>
                    <ReactTooltip
                        id={"Tooltip#" + Tooltip.tooltipCount}
                        className="tooltip"
                        effect="solid"
                    >
                        {/* Tooltip Info */}
                        {tooltipInfo}
                    </ReactTooltip>
                </div>
            </div>
        )
    }
}
export default Tooltip