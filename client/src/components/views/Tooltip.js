import React from "react"
import ReactTooltip from "react-tooltip"
import "../../css/Tooltip.css"

class Tooltip extends React.Component {

    // Counter used to form unique IDs for Tooltips
    static tooltipCount = 0

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
                "--background-color": this.props.backgroundColor ? this.props.backgroundColor : "#f0f0f0",
                }

        // Create new Tooltip
        Tooltip.tooltipCount++

        return (
            <div className="tooltipDiv">
                {/* Tooltip Icon */}
                <svg>
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
                        delayHide={200}
                        clickable={true}
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