import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function ToolTipButton(props) {
  function renderTooltip(internalProps) {
    return <Tooltip {...internalProps}>{props.tooltip}</Tooltip>;
  }
  return (
    <OverlayTrigger placement={props.TooltipPlacement} overlay={renderTooltip}>
      <Button
        size="sm"
        variant={props.variant}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        style={props.style}
      >
        {props.children}
      </Button>
    </OverlayTrigger>
  );
}

export default ToolTipButton;
