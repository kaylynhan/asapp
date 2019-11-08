/* Tooltip.js - A tooltip is an info icon with info that appears on hover.
* Example use case:
*
*---ExampleFile.js---
*       import Tooltip from './Tooltip'
*
*       // IMPORTANT: The tooltip REQUIRES a UNIQUE ID as the ID is how it
*       //      links the message to the icon.
*       // Declare the info elsewhere to format it.  If no formatting is needed,
*       // the info can be injected directly without declaring it elsewhere.
*
*       ... (inside JSX)
*
*           var ExampleInfo = <div id=ExampleInfoID>
*                   <p>First line of text.</p>
*                   <p>Second line of text.</p>
*               </div>
*           <Tooltip id="UniqueTooltipID" info = {ExampleInfo}/>
*
*---ExampleFile.css---
*       .ExampleInfoID {
*           color: blue;
*       }
*/

import React from 'react';
import ReactTooltip from 'react-tooltip'
import './Tooltip.css'

class Tooltip extends React.Component {
    render() {
        var someInfo = <div> <p> someInfo </p><p> somemore </p> </div>
        return (
            <div className="TooltipDiv">
                <svg>
                    <circle data-tip data-for={this.props.id} data-multiline="true" cx = "14" cy="14" r="10"/>
                    <text data-tip data-for={this.props.id} textAnchor="middle" x="14" y="19">?</text>
                </svg>
                <div className="Tooltip">
                    <ReactTooltip id={this.props.id}>
                        {this.props.info}
                    </ReactTooltip>
                </div>
            </div>
        )
    }
}
export default Tooltip;