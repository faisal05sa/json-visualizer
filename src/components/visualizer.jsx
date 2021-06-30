import React, { Component, lazy, Suspense } from "react";
import Toolbar from "./toolbar";
import { Spinner } from "react-bootstrap";
import memoize from "memoize-one";

import makeTable, { join_path, filterObj, truncateStrings } from "./utils";

const Table = lazy(() => import("react-bootstrap/Table"));

// There are the css classes used by Monaco Editor for different data types. e.g;
// mtk4, mtk5, mtk6, mtk7, ...
// We are using the same classes.
const THEMES = {
  light: {
    key: "mtk20",
    str: "text-info",
    num: "mtk7",
    null: "text-danger",
    boolean: "mtk5",
  },
  dark: {
    key: "mtk4",
    str: "text-info",
    num: "mtk6",
    null: "text-danger",
    boolean: "mtk5",
  },
};

function getColorFromTheme(props, value_type) {
  const theme = props.darkMode ? THEMES.dark : THEMES.light;
  return theme[value_type];
}

export default class Visualizer extends Component {
  state = {
    expand: false,
    expand_signal: "",
    deleted: false,
  };

  TRUNCATE_LIMIT = 50;

  constructor(props) {
    super(props);
    this.setStateDelegation = this.setState.bind(this);
  }

  filter = memoize((obj, filterText) => {
    return filterObj(obj, filterText);
  });

  static getDerivedStateFromProps(props, state) {
    if (props.expand_signal === "+") {
      const new_state = { ...state, expand: true };
      return new_state;
    } else if (props.expand_signal === "-") {
      const new_state = { ...state, expand: false };
      return new_state;
    }
    return null;
  }

  render() {
    // render undo delete button
    if (this.state.deleted) {
      return this.renderExpandButton();
    }

    const data = this.props.data;

    // visualize simple data within a cell
    if (!this.isExpandable()) {
      if (this.props.truncateStrings) {
        return this.visualizeSimpleContents(
          truncateStrings(this.props.data, this.TRUNCATE_LIMIT)
        );
      }
      return this.visualizeSimpleContents(data);
    }

    const filteredData = this.filter(data, this.props.searchText);
    const { headings, table } = makeTable(filteredData);
    if (table.length < 1) {
      if (this.props.root) {
        return this.visualizeHeadings("NO RESULTS");
      }
      return null;
    }

    if (this.state.expand || this.props.root || this.props.searchText) {
      // Visualize data along with a expand/collapse button
      return (
        <React.Fragment>
          {this.renderExpandButton()}
          {this.renderTable(headings, table)}
        </React.Fragment>
      );
    }

    // The data is collapsed, just render the button
    return this.renderExpandButton();
  }

  renderExpandButton = () => {
    return (
      <Toolbar
        data={this.props.data}
        state={this.state}
        setState={this.setStateDelegation}
        hide_controls={this.props.root === true}
        root={this.props.root === true}
      />
    );
  };

  isExpandable = () => {
    const data = this.props.data;

    if (data === null) {
      return false;
    }
    if (Array.isArray(data)) {
      return data.length > 0;
    } else if (typeof data === "object") {
      return Object.keys(data).length > 0;
    }
    return false;
  };

  visualizeSimpleContents(data) {
    if (data === null) {
      return this.visualizeNull();
    } else if (this.props.is_heading) {
      return this.visualizeHeadings(data);
    } else if (typeof data === "string") {
      return this.visualizeString(data);
    } else if (typeof data === "number") {
      return this.visualizeNumber(data);
    } else if (data === false || data === true) {
      return this.visualizeBoolean(data);
    } else if (Array.isArray(data)) {
      // An "Empty" Array found
      if (data.length < 1) {
        return "[]";
      }
    } else if (typeof data === "object") {
      // An "Empty" Object found
      if (Object.keys(data).length < 1) {
        return "{}";
      }
    }
    if (typeof data === "symbol") {
      // any React symbol that is ready to render
      return data;
    }

    console.log("Unknown Type to be displayed", typeof data);
    return <p>Some Data of type {typeof data}</p>;
  }

  visualizeNull() {
    return <span className={getColorFromTheme(this.props, "null")}>null</span>;
  }

  visualizeHeadings(data) {
    return <span className={getColorFromTheme(this.props, "key")}>{data}</span>;
  }

  visualizeString(s) {
    return (
      <span className={getColorFromTheme(this.props, "str")}>
        {s ? s : '""'}
      </span>
    );
  }

  visualizeNumber(num) {
    return <span className={getColorFromTheme(this.props, "num")}>{num}</span>;
  }

  visualizeBoolean(b) {
    return (
      <span className={getColorFromTheme(this.props, "boolean")}>
        {b ? "true" : "false"}
      </span>
    );
  }

  renderTable(headings, rows) {
    return (
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <Table
          bordered
          responsive={this.props.root ? true : false}
          size="sm"
          variant={this.props.darkMode && "dark"}
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
              const row_path = join_path(this.props.json_path, cell.path_key);
              return (
                <tr key={rowIndex}>
                  <MyCell
                    key={cell.path_key}
                    value={cell.value}
                    th={true}
                    json_path={row_path}
                    showJsonPath={this.props.showJsonPath}
                    truncateStrings={this.props.truncateStrings}
                    expand_signal={this.props.expand_signal}
                    darkMode={this.props.darkMode}
                  />
                  {row.slice(1).map((cell, colIndex) => {
                    if (cell) {
                      return (
                        <MyCell
                          key={cell.path_key}
                          value={cell.value}
                          json_path={join_path(row_path, cell.path_key)}
                          showJsonPath={this.props.showJsonPath}
                          truncateStrings={this.props.truncateStrings}
                          searchText={this.props.searchText}
                          expand_signal={this.props.expand_signal}
                          darkMode={this.props.darkMode}
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
}

class MyCell extends Component {
  handleClick = (event) => {
    event.stopPropagation();
    if (
      ["TD", "TH", "SPAN"].includes(event.target.nodeName) &&
      event.target.innerHTML
    ) {
      // handle the event

      this.props.showJsonPath(this.props.json_path);
    } else {
      // ignore the event
      event.preventDefault();
    }
  };

  render() {
    const Tag = this.props.th ? "th" : "td";
    return (
      <Tag onClick={this.handleClick}>
        <Visualizer
          is_heading={this.props.th}
          data={this.props.value}
          json_path={this.props.json_path}
          showJsonPath={this.props.showJsonPath}
          truncateStrings={this.props.truncateStrings}
          searchText={this.props.searchText}
          expand_signal={this.props.expand_signal}
          darkMode={this.props.darkMode}
        />
      </Tag>
    );
  }
}
