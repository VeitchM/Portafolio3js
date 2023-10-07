import * as React from "react";
import { ToggleButton } from "./Switch.styles";

export default function Switch(props: {
  switch: boolean;
  onClick: () => void;
}) {
  return (
    <ToggleButton  onClick={props.onClick}>
      <div
        className={`toggle-circle w-4 h-4 lg:w-5 lg:h-5 rounded-full absolute bg-background-color transition-all left-1 ${
          props.switch ? "left-5 lg:left-8" : ""
        }`}
        id="theme-button-circle"
      />
    </ToggleButton>
  );
}
