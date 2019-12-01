import React from "react";
import OptionalTag from "./OptionalTag";
import RequiredTag from "./RequiredTag";
import "./CoursePlan.css";
import axios from "axios";

class CoursePlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requiredClasses: this.props.requiredClasses,
      optionalClasses: this.props.optionalClasses
    };
  }

  requiredCallBack = item => {
    this.setState(state => {
      let obj = this.props.requiredClasses.find(o => o.name === item);
      const requiredClasses = this.props.requiredClasses.filter(function(
        value
      ) {
        return value.name !== item;
      });

      const optionalClasses = this.props.optionalClasses.concat(obj);
      this.props.callBack(requiredClasses, optionalClasses);
      return {
        optionalClasses,
        requiredClasses
      };
    });
  };

  optionalCallBack = item => {
    this.setState(state => {
      let obj = this.props.optionalClasses.find(o => o.name === item);
      const optionalClasses = this.props.optionalClasses.filter(function(
        value
      ) {
        return value.name !== item;
      });

      const requiredClasses = this.props.requiredClasses.concat(obj);
      this.props.callBack(requiredClasses, optionalClasses);
      return {
        optionalClasses,
        requiredClasses
      };
    });
  };

  removeCallBack = item => {
    this.setState(state => {
      const optionalClasses = this.props.optionalClasses.filter(function(
        value
      ) {
        return value.name !== item;
      });
      const requiredClasses = this.props.requiredClasses.filter(function(
        value
      ) {
        return value.name !== item;
      });
      this.props.callBack(requiredClasses, optionalClasses);
      return {
        optionalClasses,
        requiredClasses
      };
    });
  };

  render() {
    return (
      <div id="courseTagContainer">
        <div id="optionalArea">
          <h6>Optional</h6>
          {this.props.optionalClasses.map(item => (
            <div key={item.name}>
              <OptionalTag
                name={item.name}
                parentCallback={this.optionalCallBack}
                removeCallback={this.removeCallBack}
              />
            </div>
          ))}
        </div>
        <div id="requiredArea">
          <h6>Required</h6>
          {this.props.requiredClasses.map(item => (
            <div key={item.name}>
              <RequiredTag
                name={item.name}
                parentCallback={this.requiredCallBack}
                removeCallback={this.removeCallBack}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CoursePlan;
