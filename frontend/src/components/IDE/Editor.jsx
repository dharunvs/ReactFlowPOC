import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const MonacoEditor = ({ props }) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // Define a custom theme
      monaco.editor.defineTheme("custom-dark", {
        base: "vs", // Can be 'vs', 'vs-dark', or 'hc-black'
        inherit: true, // Inherit default styles
        rules: [
          { token: "comment", foreground: "ffa500", fontStyle: "italic" },
          { token: "keyword", foreground: "d73a49" },
          { token: "identifier", foreground: "ffffff" },
          { token: "string", foreground: "6a9955" },
        ],
        colors: {
          "editor.background": "#1e1e1e", // Custom background color
          "editor.foreground": "#111111", // Custom foreground color
          "editor.lineHighlightBackground": "#2b2b2b", // Highlighted line background
          "editorCursor.foreground": "#ffffff", // Cursor color
        },
      });

      // Set the custom theme
      monaco.editor.setTheme("custom-dark");
    }
  }, [monaco]);

  return <Editor {...props} />;
};

export default MonacoEditor;
