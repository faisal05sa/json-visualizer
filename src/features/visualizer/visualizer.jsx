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
                  />
                  {row.slice(1).map((cell, colIndex) => {
                    if (cell) {
                      return (
                        <MyCell
                          key={cell.path_key}
                          value={cell.value}
                          json_path={join_path(row_path, cell.path_key)}
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
  //   console.log("Rendering root visualizer...");
  // } else {
  //   console.log("Rendering child visualizer...", state);
  // }

  const filteredData = filter(data, searchText);
  const { headings, table } = makeTable(filteredData);
  if (table.length < 1) {
    if (props.root) {
      return visualizeSimpleContents("NO RESULTS", isDarkMode, true);
    }
    return null;
  }

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
      />
    </Tag>
  );
}

export default Visualizer;
