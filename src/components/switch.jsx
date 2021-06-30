import React, { Component } from "react";

class Switch extends Component {
  constructor(props) {
    super(props);
    const name = props.name;
    this.id = "flexSwitch" + name[0].toUpperCase() + name.substring(1);
  }

  render() {
    return (
      <>
        <div
          className="form-switch pl-4"
          style={{
            paddingLeft: 10,
            marginBottom: 15,
          }}
        >
          <span className="bmd-form-group">
            <label>
              <input
                type="checkbox"
                className="form-check-input"
                id={this.id}
                name={this.props.name}
                checked={this.props.checked}
                onChange={this.props.onChange}
              />
              <span className="toggle"></span>
              {this.props.text}
            </label>
          </span>
        </div>
      </>
    );
  }

  render_old() {
    return (
      <>
        <div
          className={this.props.className + " form-check form-switch pl-4"}
          style={{ textAlign: "left" }}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id={this.id}
            name={this.props.name}
            checked={this.props.checked}
            onChange={this.props.onChange}
          />
          <label className="form-check-label" htmlFor={this.id}>
            {this.props.text}
          </label>
        </div>
      </>
    );
  }
}
export default Switch;
