import React, { Component } from "react";
import { FaUndo } from "react-icons/fa";
import { MdContentCopy, MdDelete } from "react-icons/md";
import { BiCollapse, BiExpand } from "react-icons/bi";
import ToolTipButton from "./tooltip_button";
import { notification } from "../app/utils";

import { Badge, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

class Toolbar extends Component {
  copyToClipBoard = () => {
    const text = JSON.stringify(this.props.data);
    navigator.clipboard.writeText(text);
    notification.success("JSON copied to the clipboard.");
  };

  toggleExpand = () => {
    if (!this.props.root) {
      let state = { ...this.props.state };
      state.expanded = !state.expanded;
      this.props.setState(state);
    }
  };

  toggleDelete = () => {
    let state = { ...this.props.state };
    state.deleted = !state.deleted;
    this.props.setState(state);
  };

  getDataDescription() {
    const obj = this.props.data;
    if (Array.isArray(obj)) {
      const length = obj.length;
      return `Array, [${length} item${length > 1 ? "s" : ""}]`;
    }
    if (typeof obj === "object") {
      const length = Object.keys(obj).length;
      return `Object, [${length} ${length > 1 ? "Properties" : "Property"}]`;
    }
    return typeof this.props.data;
  }

  render() {
    if (this.props.state.deleted) {
      return (
        <ToolTipButton
          variant="danger"
          tooltip="Undo Delete"
          onClick={this.toggleDelete}
        >
          <FaUndo />
        </ToolTipButton>
      );
    }

    const expanded = this.props.state.expanded || this.props.root;

    return (
      <ButtonToolbar aria-label="Toolbar with Button groups">
        <ButtonGroup className="me-2" aria-label="First group">
          <Button variant="primary" disabled>
            <Badge variant="light">{this.getDataDescription()}</Badge>
          </Button>

          {!this.props.root && (
            <React.Fragment>
              {expanded ? (
                <ToolTipButton
                  variant="warning"
                  tooltip="Collapse"
                  onClick={this.toggleExpand}
                >
                  <BiCollapse />
                </ToolTipButton>
              ) : (
                <ToolTipButton
                  variant="primary"
                  tooltip="Expand"
                  onClick={this.toggleExpand}
                >
                  <BiExpand />
                </ToolTipButton>
              )}
              <ToolTipButton
                variant="success"
                tooltip="Copy JSON"
                onClick={this.copyToClipBoard}
              >
                <MdContentCopy />
              </ToolTipButton>
              <ToolTipButton
                variant="danger"
                tooltip="Delete from DOM"
                onClick={this.toggleDelete}
              >
                <MdDelete />
              </ToolTipButton>
            </React.Fragment>
          )}
        </ButtonGroup>
      </ButtonToolbar>
    );
  }
}

export default Toolbar;
