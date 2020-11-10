import { Button } from "@fluentui/react-northstar";
import * as React from "react";

import { useCSS } from "../src/useCSS";

export default {
  title: "Button v0",
};

export const Padding = () => {
  const className = useCSS({ padding: "20px" });

  return <Button className={className} content="An override for padding" />;
};

// ---

export const PaddingExpanded = () => {
  const className = useCSS({ padding: "20px", paddingBottom: "0px" });

  return <Button className={className} content="An override for padding" />;
};

// ---

export const Hover = () => {
  const className = useCSS({ color: "red", ":hover": { color: "green" } });

  return (
    <Button
      className={className}
      content="An override for color & :hover preudo"
    />
  );
};

// ---

const NestingInnerButton: React.FC<{ className: string }> = (props) => {
  const className = useCSS(props.className, {
    color: "blue",
    paddingLeft: "0px",
  });

  return (
    <Button className={className} content="An override for nested components" />
  );
};

const NestingOuterButton: React.FC = () => {
  const className = useCSS({ color: "orange", padding: "20px" });

  return <NestingInnerButton className={className} />;
};

export const Nesting = () => <NestingOuterButton />;
