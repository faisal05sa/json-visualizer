import React, { useEffect } from "react";
import { MdContentCopy, MdClose } from "react-icons/md";
import { VscExpandAll, VscCollapseAll } from "react-icons/vsc";
import { ImSearch } from "react-icons/im";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import ToolTipButton from "../tooltip_button";
import { copyPathToClipboard } from "../../app/utils";

import { useSelector, useDispatch } from "react-redux";
import {
  updateSearchText,
  removeSearchText,
  setExpandAll,
  setCollapseAll,
  resetExpandCollapseAll,
} from "./statusbarSlice";

// Create a Custom Hook on top of useEffect
export function useCtrlF(onSearchF) {
  function handleKeyDown(e) {
    // Check if CTRL+F, Command+F on mac
    if (e.keyCode === 114 || ((e.ctrlKey || e.metaKey) && e.keyCode === 70)) {
      e.preventDefault();
      onSearchF();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

console.log("Redering Statur bar");

function StatusBar(props) {
  let timeout = 0;
  const JsonPathRef = React.createRef();

  const searchBoxRef = React.createRef();
  useCtrlF(() => {
    searchBoxRef.current.focus();
  });

  const dispatch = useDispatch();
  const { searchText, jsonPath } = useSelector((state) => state.statusbar);
  const { darkMode } = useSelector((state) => state.input.settings);

  function handleSearchTextChanged(event) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(updateSearchText(event.target.value.toLowerCase()));
    }, 300);
  }

  function clearSearchText() {
    searchBoxRef.current.value = "";
    dispatch(removeSearchText());
  }

  return (
    <Row
      className="pt-2 pb-2"
      style={{
        backgroundColor: "#6c757d",
        zIndex: 100,
        position: "sticky",
        top: 0,
        height: 50,
      }}
    >
      <Col sm={"auto"}>
        <InputGroup size="sm">
          <ToolTipButton
            variant={"primary"}
            tooltip={"Expand All"}
            TooltipPlacement="bottom"
            onMouseDown={() => dispatch(setExpandAll())}
            onMouseUp={() => dispatch(resetExpandCollapseAll())}
          >
            <VscExpandAll />
          </ToolTipButton>
          <ToolTipButton
            variant={"warning"}
            tooltip={"Collapse All"}
            TooltipPlacement="bottom"
            onMouseDown={() => dispatch(setCollapseAll())}
            onMouseUp={() => dispatch(resetExpandCollapseAll())}
          >
            <VscCollapseAll />
          </ToolTipButton>
        </InputGroup>
      </Col>
      <Col sm={9}>
        <InputGroup size="sm">
          <InputGroup.Text style={props.style}>
            Clicked JSON Path:
          </InputGroup.Text>
          <FormControl
            className="text-center font-weight-bold"
            disabled
            style={{
              backgroundColor: "white",
              color: "#198754",
            }}
            value={jsonPath}
            ref={JsonPathRef}
          />
          <ToolTipButton
            variant={"success"}
            tooltip={"Copy this path"}
            TooltipPlacement="bottom"
            onClick={copyPathToClipboard}
          >
            <MdContentCopy />
          </ToolTipButton>
        </InputGroup>
      </Col>
      <Col sm={2}>
        <InputGroup className="mb-3 text-center" size="sm">
          <FormControl
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={handleSearchTextChanged}
            style={{
              backgroundColor: "white",
            }}
            ref={searchBoxRef}
          />
          <ToolTipButton
            variant={darkMode ? "dark" : "light"}
            TooltipPlacement="bottom"
            tooltip={searchText ? "Clear Search" : "Search"}
            onClick={searchText ? clearSearchText : () => {}}
          >
            {searchText ? <MdClose /> : <ImSearch />}
          </ToolTipButton>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default StatusBar;
