// TODO: Move IStyle into a separate typing library
import {
  PartialTheme,
  Theme,
  IStyle,
  useTheme,
  useWindow,
  useStyleRenderer,
  StyleRenderer,
} from "@fluentui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphGet = (graphNode: Map<any, any>, path: any[]): any | undefined => {
  for (const key of path) {
    graphNode = graphNode.get(key);

    if (!graphNode) {
      return;
    }
  }

  return graphNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphSet = (graphNode: Map<any, any>, path: any[], value: any) => {
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    let current = graphNode.get(key);

    if (!current) {
      current = new Map();

      graphNode.set(key, current);
    }

    graphNode = current;
  }

  graphNode.set(path[path.length - 1], value);
};

export type MakeStylesOptions = {
  /**
   * Class map which should override existing classes.
   */
  classes?: Record<string, string | undefined>;
  theme?: PartialTheme | Theme;
  renderer?: StyleRenderer;
};

/**
 * Registers a css object, optionally as a function of the theme.
 *
 * @param styleOrFunction - Either a css javascript object, or a function which takes in `ITheme`
 * and returns a css javascript object.
 */
export function makeStyles<TStyleSet extends { [key: string]: IStyle }>(
  styleOrFunction: TStyleSet | ((theme: Theme) => TStyleSet)
): (options?: MakeStylesOptions) => { [key in keyof TStyleSet]: string } {
  // Create graph of inputs to map to output.
  const graph = new Map();

  return (options: MakeStylesOptions = {}) => {
    let { theme, renderer } = options;
    const { classes = [] } = options;
    const win = useWindow();
    const contextualTheme = useTheme();
    const contextualRenderer = useStyleRenderer();

    theme = theme || contextualTheme || ({} as PartialTheme);
    renderer = (renderer || contextualRenderer) as StyleRenderer;

    const id = renderer.getId();
    const isStyleFunction = typeof styleOrFunction === "function";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const path: any[] = [id, win, theme];

    if (classes) {
      path.push(...Object.keys(classes));
    }

    let value = graphGet(graph, path);

    if (!value) {
      const styles = isStyleFunction
        ? (styleOrFunction as (theme: Theme) => TStyleSet)(theme!)
        : styleOrFunction;

      value = renderer.renderStyles([styles, classes], {
        targetWindow: win,
        rtl: !!theme!.rtl,
      });
      graphSet(graph, path, value);
    }

    return value;
  };
}
