import React, { lazy, Suspense, useState } from "react";
import Toolbar from "../toolbar";
import { Spinner } from "react-bootstrap";
import memoize from "memoize-one";
import { useSelector, useDispatch } from "react-redux";

import makeTable, {
  join_path,
  filterObj,
  truncateStrings,
} from "../../app/utils";

import { isExpandable, visualizeSimpleContents } from "./helper";
import { updateJsonPath } from "../statusbar/statusbarSlice";

const Table = lazy(() => import("react-bootstrap/Table"));

const filter = memoize((obj, filterText) => {
  return filterObj(obj, filterText);
});

function Visualizer(props) {
  const { searchText, expandAll, collapseAll } = useSelector(
    (state) => state.statusbar
  );
  const { settings } = useSelector((state) => state.input);
  const isDarkMode = settings.darkMode;
  const TRUNCATE_LIMIT = settings.truncateLimit;

  const [state, setState] = useState({
    expanded: false,
    deleted: false,
  });

  function renderTable(headings, rows) {
    return (
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <Table
          bordered
          responsive={props.root ? true : false}
          size="sm"
          variant={isDarkMode && "dark"}
          style={{ marginBottom: 0 }}
        >
          <thead>
            <tr>
              {headings.map((heading) => (
                <th key={heading} className="fit-contents">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const cell = row[0];
              const row_path = join_path(props.json_path, cell.path_key);
              return (
                <tr key={rowIndex}>
                  <MyCell
                    key={cell.path_key}
                    value={cell.value}
                    th={true}
                    json_path={row_path}
                    // expand_signal={this.props.expand_signal}
                  />
                  {row.slice(1).map((cell, colIndex) => {
                    if (cell) {
                      return (
                        <MyCell
                          key={cell.path_key}
                          value={cell.value}
                          json_path={join_path(row_path, cell.path_key)}
                          // searchText={this.props.searchText}
                          // expand_signal={this.props.expand_signal}
                        />
                      );
                    }
                    return <td key={colIndex}></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Suspense>
    );
  }

  function renderExpandButton() {
    return (
      <Toolbar
        data={props.data}
        state={state}
        setState={setState}
        root={props.root}
      />
    );
  }

  if (state.deleted) {
    return renderExpandButton();
  }

  const data = props.data;

  // visualize simple data within a cell
  if (!isExpandable(data)) {
    if (settings.truncateStrings) {
      const truncatedData = truncateStrings(data, TRUNCATE_LIMIT);
      return visualizeSimpleContents(
        truncatedData,
        isDarkMode,
        props.is_heading
      );
    }
    return visualizeSimpleContents(data, isDarkMode, props.is_heading);
  }

  // if (props.root) {
  //   console.log("Root Render...", state);
  // } else {
  //   console.log("Child Render...", state);
  // }

  const filteredData = filter(data, searchText);
  const { headings, table } = makeTable(filteredData);
  if (table.length < 1) {
    if (props.root) {
      return visualizeSimpleContents("NO RESULTS", isDarkMode, true);
    }
    return null;
  }

  // if (this.props.root) {
  //   console.log("Root Render...", this.state);
  // } else {
  //   console.log("Child Render...", this.state);
  // }

  if (collapseAll) {
    state.expanded = false;
  } else if (expandAll) {
    state.expanded = true;
  }

  if (props.root || searchText || state.expanded) {
    // Visualize data along with a expand/collapse button
    return (
      <React.Fragment>
        {renderExpandButton()}
        {renderTable(headings, table)}
      </React.Fragment>
    );
  }

  // The data is collapsed, just render the button
  return renderExpandButton();
}

// class Visualizer2 extends Component {
//   state = {
//     expand: false,
//     deleted: false,
//   };

//   TRUNCATE_LIMIT = 50;

//   constructor(props) {
//     super(props);
//     this.setStateDelegation = this.setState.bind(this);
//   }

//   static getDerivedStateFromProps(props, state) {
//     if (props.expand_signal === "+") {
//       const new_state = { ...state, expand: true };
//       return new_state;
//     } else if (props.expand_signal === "-") {
//       const new_state = { ...state, expand: false };
//       return new_state;
//     }
//     return state;
//   }

//   // shouldComponentUpdate(state, props) {
//   //   // if (state.expand_signal) {
//   //   //   return false;
//   //   // }
//   //   return true;
//   // }

//   render() {
//     // render undo delete button
//     if (this.state.deleted) {
//       return this.renderExpandButton();
//     }

//     const data = this.props.data;

//     // visualize simple data within a cell
//     if (!this.isExpandable()) {
//       if (this.props.truncateStrings) {
//         const truncatedData = truncateStrings(
//           this.props.data,
//           this.TRUNCATE_LIMIT
//         );
//         return this.visualizeSimpleContents(truncatedData);
//       }
//       return this.visualizeSimpleContents(data);
//     }

//     const filteredData = filter(data, this.props.searchText);
//     const { headings, table } = makeTable(filteredData);
//     if (table.length < 1) {
//       if (this.props.root) {
//         return this.visualizeHeadings("NO RESULTS");
//       }
//       return null;
//     }

//     if (this.state.expand || this.props.root || this.props.searchText) {
//       // Visualize data along with a expand/collapse button
//       return (
//         <React.Fragment>
//           {this.renderExpandButton()}
//           {this.renderTable(headings, table)}
//         </React.Fragment>
//       );
//     }

//     // The data is collapsed, just render the button
//     return this.renderExpandButton();
//   }

//   renderExpandButton = () => {
//     return (
//       <Toolbar
//         data={this.props.data}
//         state={this.state}
//         setState={this.setStateDelegation}
//         hide_controls={this.props.root === true}
//         root={this.props.root === true}
//       />
//     );
//   };

//   isExpandable = () => {
//     const data = this.props.data;

//     if (data === null) {
//       return false;
//     }
//     if (Array.isArray(data)) {
//       return data.length > 0;
//     } else if (typeof data === "object") {
//       return Object.keys(data).length > 0;
//     }
//     return false;
//   };
// }

function MyCell(props) {
  const dispatch = useDispatch();

  function handleClick(event) {
    event.stopPropagation();
    if (
      ["TD", "TH", "SPAN"].includes(event.target.nodeName) &&
      event.target.innerHTML
    ) {
      // handle the event
      dispatch(updateJsonPath(props.json_path));
    } else {
      // ignore the event
      event.preventDefault();
    }
  }

  const Tag = props.th ? "th" : "td";
  return (
    <Tag onClick={handleClick}>
      <Visualizer
        is_heading={props.th}
        data={props.value}
        json_path={props.json_path}
        // expand_signal={this.props.expand_signal}
      />
    </Tag>
  );
}

export default Visualizer;
