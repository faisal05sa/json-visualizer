import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function ToolTipButton(props) {
  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>{props.tooltip}</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <Button
            ref={ref}
            size="sm"
            onClick={props.onClick}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            variant={props.variant}
            {...triggerHandler}
          >
            {props.children}
          </Button>
        )}
      </OverlayTrigger>
    </>
  );

  function renderTooltip(tooltipProps) {
    return <Tooltip {...tooltipProps}>{props.tooltip}</Tooltip>;
  }

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 200, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button
        size="sm"
        variant={props.variant}
        onClick={props.onClick}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        ref={props.RefHolder}
      >
        {props.children}
      </Button>
    </OverlayTrigger>
  );
}

export default ToolTipButton;
