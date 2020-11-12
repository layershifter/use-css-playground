import { Button, useStyleRenderer } from "@fluentui/react";
import * as React from "react";
import { useCSS } from "../src/useCSS";
// import { makeStyles } from '../src/makeStyles';
import { makeStyles } from '@fluentui/react';

export default {
  title: "Button v8 (makeStyles)",
};

export const DefaultButton = () => <Button content="I am a default button"/>;
export const PrimaryButton = () => <Button primary content="I am a primary button"/>;

/** 
 * Create a stylesheet for this collection of scenarios; containing all of the class definitions applicable. Upon using
 * this scenario, they will all be registered exactly one time per unique configuration. The simpler the cache key, the
 * faster runtime evaluation becomes.
 */
const useStyles = makeStyles({
  padding: { padding: 20 },
  paddingExpanded: { padding: "20px", paddingBottom: "0px" },
  hover: { color: "red", ":hover": { color: "green" } },
  nesting: {
    color: "blue",
    paddingLeft: "0px",
  },
  nestingOuter: { color: "orange", padding: "20px" }
});

export const Padding = () => {
  const renderer = useStyleRenderer();
  const className = useStyles().padding;

  return <Button className={className} content="An override for padding" />;
};

// ---

export const PaddingExpanded = () => {
  const className = useStyles().paddingExpanded;

  return <Button className={className} content="An override for padding" />;
};

export const Hover = () => {
  const className = useStyles().hover;

  return (
    <Button
      className={className}
      content="An override for color & :hover pseudo"
    />
  );
};

// ---

// const NestingInnerButton: React.FC<{ className: string }> = (props) => {
//   const className = useStyles({ overrideClasses: { nesting: className }).nesting;

//   return (
//     <Button content="Should be blue text" {...props } className={className}  />
//   );
// };

// const NestingOuterButton: React.FC = () => {
//   const className = useStyles().nestingOuter;
  
//   return <NestingInnerButton className={className} content="Should be orange text" />;
// };

// export const Nesting = () => <NestingOuterButton />;
