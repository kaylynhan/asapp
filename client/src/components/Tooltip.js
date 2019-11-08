/* Tooltip.js - A tooltip is an info icon with info that appears on hover.
*       IMPORTANT: The Tooltip REQUIRES a UNIQUE ID as the ID is how it
*            links the message to the icon.
*       Tooltip uses the module 'react-tooltip' which may need to be installed.
*       Info can be declared elsewhere or injected directly.
* Example use case:
*---ExampleFile.js---
*       import Tooltip from './Tooltip'
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
                    <circle data-tip data-for={this.props.id} cx = "14" cy="14" r="10"/>
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