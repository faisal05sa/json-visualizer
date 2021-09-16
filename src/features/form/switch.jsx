import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class Switch extends Component {
  constructor(props) {
    super(props);
    const name = props.name;
    this.id = "flexSwitch" + name[0].toUpperCase() + name.substring(1);
  }

  render() {
    return (
      <div
        style={{
          paddingLeft: 10,
          marginTop: 15,
          textAlign: "left",
        }}
      >
        <Form.Check
          type="switch"
          id={this.id}
          label={this.props.text}
          name={this.props.name}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
export default Switch;
