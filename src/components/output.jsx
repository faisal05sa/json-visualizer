import React, { Component } from "react";
import Visualizer from "./visualizer";

class OutputComponent extends Component {
  render() {
    if (!this.props.data) {
      return <React.Fragment />;
    }

    return (
      <div className="p-3 border bg-light">
        <Visualizer data={this.props.data} />
      </div>
    );
  }

  // return (
  //   <table className="table">
  //     <thead>
  //       <th>Hello</th>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>Hello</td>
  //       </tr>
  //     </tbody>
  //   </table>
  // );
  // let json = JSON.parse(this.state.input);
  // if (Array.isArray(json)) {
  //   return <p>"This is a list"</p>;
  // } else {
  //   return <p>"Hahaha"</p>;
  // }
}
export default OutputComponent;
