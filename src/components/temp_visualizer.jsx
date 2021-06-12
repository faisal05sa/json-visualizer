// import React, { Component } from "react";

// class Visualizer extends Component {
//   state = {
//     count: 0,
//     tags: ["tag1", "tag2", "tag3"],
//   };

//   styles = {
//     fontSize: 50,
//   };

//   //   constructor() {
//   //     super();
//   //     this.handleIncrement = this.handleIncrement.bind(this);
//   //   }

//   handleIncrement = () => {
//     //deference
//     let { count } = this.state;
//     //change
//     count += 1;

//     //update the changes
//     this.setState({ count: count });
//     console.log(count);
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
//         <button
//           //onClick={this.handleIncrement}
//           onClick={() => this.handleIncrement()}
//           className="btn btn-secondary btn-sm"
//         >
//           +
//         </button>
//         <ul>
//           {this.state.tags.map((tag) => (
//             <li key={tag}>{tag}</li>
//           ))}
//         </ul>
//       </React.Fragment>
//     );
//   }

//   getBadgeClasses() {
//     let classes = "badge m-2 bg-";
//     classes += this.state.count === 0 ? "warning" : "primary";
//     return classes;
//   }

//   formatCount() {
//     const { count } = this.state;
//     return count === 0 ? "Zero" : count;
//   }
// }

// export default Visualizer;
