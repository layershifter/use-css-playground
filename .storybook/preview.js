import * as React from "react";
import { ThemeProvider } from "@fluentui/react";
import { Provider, teamsTheme } from "@fluentui/react-northstar";

export const decorators = [
  (Story) => (
    <Provider theme={teamsTheme}>
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
