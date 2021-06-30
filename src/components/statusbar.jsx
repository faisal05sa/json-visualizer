import React, { Component } from "react";
import { MdContentCopy, MdClose } from "react-icons/md";
import { VscExpandAll, VscCollapseAll } from "react-icons/vsc";
import { ImSearch } from "react-icons/im";
import { Button, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import ToolTipButton from "./tooltip_button";
import { notification } from "./utils";

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.typing_timeout = 0;
    this.searchRef = React.createRef();
  }

  handleExpandAll = () => {
    this.props.handleExpandCollapseAll("+");
  };

  handleCollapseAll = () => {
    this.props.handleExpandCollapseAll("-");
  };

  handleSearchTextChanged = (event) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onSearchTextChanged(event.target.value);
    }, 300);
  };

  clearSearchText = () => {
    this.searchRef.current.value = "";
    this.props.onSearchTextChanged(""); //reset the state
  };

  copyPathToClipboard = () => {
    const text = this.props.jsonRef.current.value;
    if (text) {
      navigator.clipboard.writeText(text);
      notification.success("Copied to the Clipboard.");
    } else {
      notification.warning("Nothing to copy.");
    }
  };

  render() {
    return (
      <Row
        className="pt-2 pb-2"
        style={{
          backgroundColor: "#6c757d",
          zIndex: 1,
          position: "sticky",
          top: 0,
        }}
      >
        <Col sm={"auto"}>
          <InputGroup size="sm">
            <ToolTipButton
              variant={"primary"}
              tooltip={"Expand All"}
              onMouseDown={() => this.props.handleExpandCollapseAll("+")}
              onMouseUp={() => this.props.handleExpandCollapseAll("")}
            >
              <VscExpandAll />
            </ToolTipButton>
            <ToolTipButton
              variant={"warning"}
              tooltip={"Collapse All"}
              onMouseDown={() => this.props.handleExpandCollapseAll("-")}
              onMouseUp={() => this.props.handleExpandCollapseAll("")}
            >
              <VscCollapseAll />
            </ToolTipButton>
          </InputGroup>
        </Col>
        <Col sm={9}>
          <InputGroup size="sm">
            <InputGroup.Text style={this.props.style}>
              Clicked JSON Path:
            </InputGroup.Text>
            <FormControl
              className="text-center font-weight-bold"
              disabled
              style={{
                backgroundColor: "white",
                color: "#198754",
              }}
              value={this.props.json_path}
              ref={this.props.jsonRef}
            />
            <ToolTipButton
              variant={"success"}
              tooltip={"Copy this path"}
              onClick={this.copyPathToClipboard}
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
              onChange={this.handleSearchTextChanged}
              style={{
                backgroundColor: "white",
              }}
              ref={this.searchRef}
            />
            <InputGroup.Append>
              <Button
                variant="info"
                onClick={
                  this.props.searchText ? this.clearSearchText : () => {}
                }
              >
                {this.props.searchText ? <MdClose /> : <ImSearch />}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    );
  }
}

export default StatusBar;
