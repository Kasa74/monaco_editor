import React, { useRef, useState } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import { Languages } from "./constants";

function App() {
  const editorRef = useRef();
  const [value, setValue] = useState<undefined | string>("");

  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");

  const [fontSize, setFontSize] = useState<number>(16);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };
  return (
    <div className="App">
      <header className="header"></header>
      <main className="page">
        <div className="container">
          <Editor
            height={"84vh"}
            defaultValue="// write there"
            language={selectedLanguage}
            onChange={(value: string | undefined) => setValue(value)}
            onMount={onMount}
            options={{
              fontSize: fontSize,
            }}
            value={value}
          />
          <div className="settings">
            <div className="settings__left">
              <select
                className="select__language"
                onChange={(i) => setSelectedLanguage(i.target.value)}
              >
                {Languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>

              <div className="change__font__ammount">
                <input
                  type="number"
                  className="font__ammount"
                  value={fontSize.toString().replace(/^0+/, "")}
                  onChange={(i) => setFontSize(Number(i.target.value))}
                ></input>

                <div
                  onClick={() => setFontSize(fontSize - 1)}
                  className="control minus"
                >
                  -
                </div>
                <div
                  onClick={() => setFontSize(fontSize + 1)}
                  className="control plus"
                >
                  +
                </div>
              </div>
            </div>
            <div className="settings__right"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
