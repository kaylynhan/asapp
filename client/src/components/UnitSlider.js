import "rc-slider/assets/index.css"
import "rc-tooltip/assets/bootstrap.css"
import React from "react"
import ReactDOM from "react-dom"
import Tooltip from "rc-tooltip"
import Slider from "rc-slider"

const createSliderWithTooltip = Slider.createSliderWithTooltip
const Range = createSliderWithTooltip(Slider.Range)
const Handle = Slider.Handle

class UnitSlider extends React.Component {
  constructor(props) {
    super(props)
    this.handle = this.handle.bind(this)
  }

  handle = (props) => {

    const { value, dragging, index, ...restProps } = props
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    )
  }



  render() {
    var marks = {
      4: 4,
      8: 8,
      12: 12,
      16: 16,
      20: 20,
      24: 24
    }
    return (
      <div style={{width:"100%"}}>
        <p> #Unit </p>
        <Range marks={marks} min={4} max={24} defaultValue={[4, 16]} tipFormatter={value => `${value}`} />
      </div>
    )
  }
}
export default UnitSlider