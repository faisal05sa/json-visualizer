import React, { Component } from "react";

class Visualizer extends Component {
  render() {
    const arr = this.props.data;
    if (arr.length === 0) {
      return <React.Fragment>[]</React.Fragment>;
    }

    return (
      <table className="table table-responsive table-bordered table-hover">
        <thead>
          <th>#</th> <th></th>
        </thead>
        <tbody>
          Please display here
          {/* {numbers.forEach((value, index, arr) => {
            return (
              <tr>
                <td>{element}</td>
                <td>{element}</td>
              </tr>
            );
          })}
          ]
          {list.forEach((element) => {
            <tr>
              <td>{element}</td>
              <td>{element}</td>
            </tr>;
          })} */}
        </tbody>
      </table>
    );
  }

  visualizeContents(data) {
    if (Array.isArray(data)) {
      return <Visualizer data={data} />;
    } else if (typeof data === "object") {
      return "Object he hai";
    } else if (typeof data === "string") {
      return "String he hai";
    } else if (typeof data === "number") {
      return "number he hai";
    }
  }

  visualizeList(data) {}
  visualizeObject(data) {}
  visualizeString(data) {}
  visualizeNumber(data) {}
}

export default Visualizer;
