import React, { useEffect, useState } from "react";
import "./IDE.css";
import Editor, { useMonaco } from "@monaco-editor/react";
import { languages } from "./constants";

const defaultLanguage = "cpp";

function IDE() {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [codeContent, setCodeContent] = useState(
    languages[selectedLanguage].defaultCode
  );

  const monaco = useMonaco();

  useEffect(() => {
    console.log(monaco);
    if (monaco) {
      monaco.editor.defineTheme("custom-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#2b2b2b",
          "editor.foreground": "#f8f8f8",
        },
      });

      monaco.editor.setTheme("custom-theme");
    }
  }, [monaco]);

  useEffect(() => {
    setCodeContent(languages[selectedLanguage].defaultCode);
  }, [selectedLanguage]);

  return (
    <div className="IDE">
      <div className="editor">
        <div className="header">
          <select
            name="languages"
            id="languages"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            defaultValue={defaultLanguage}
          >
            {Object.keys(languages).map((lang) => (
              <option key={lang} value={lang}>
                {languages[lang].label}
              </option>
            ))}
          </select>

          <button className="playButton">Play</button>
        </div>
        <Editor
          height="100%"
          language={selectedLanguage}
          value={codeContent}
          onChange={(e) => setCodeContent(e)}
          theme="custom-theme"
        />
      </div>
      <div className="out"></div>
    </div>
  );
}

export default IDE;
