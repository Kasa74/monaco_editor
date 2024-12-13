import React, { useRef, useState } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import { Languages } from "./constants";
import { mockApiRequest } from "./api";

function App() {
  const editorRef = useRef();
  const [value, setValue] = useState<undefined | string>("");
  const [status, setStatus] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");

  const [fontSize, setFontSize] = useState<number>(16);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const executeCode = async () => {
    // убираю комменты, в случае с полноценным бэком это было бы не нужно делать, но с учетом нашего мок апи, будет возвращать не те данные
    // сплитом делю код на строки, потом удаляю строки начинающиеся на // и объединяю обратно в строку
    let clearValue = value
      ?.split("\n")
      .filter((line) => !line.startsWith("//"))
      .join();

    if (clearValue) {
      setLoading(true);
      setError(null);
      setResult("");

      try {
        const response = await mockApiRequest(selectedLanguage, clearValue);

        if (response.status === "success") {
          setResult(response.output || "");
          setStatus(response.status);
          setError(null);
        } else {
          setError(response.error || "");
          setStatus(response.status);
          setResult("");
        }
      } catch (err) {
        setError("Server problems");
        setStatus("Error");
        setResult("");
      } finally {
        setLoading(false);
      }
    } else {
      setStatus("error");
      setError("Код не может быть пустым.");
    }
  };
  return (
    <div className="App">
      <header className="header">
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
          <div className="settings__right">
            <button className="run__btn" onClick={() => executeCode()}>
              Run
            </button>
          </div>
        </div>
      </header>
      <main className="page">
        <div className="container">
          <div className="page__content">
            <div className="task__block">
              <div className="task__title">
                2593. Find Score of an Array After Marking All Elements
              </div>
              <div className="task__text">
                You are given an array nums consisting of positive integers.
                Starting with score = 0, apply the following algorithm: Choose
                the smallest integer of the array that is not marked. If there
                is a tie, choose the one with the smallest index. Add the value
                of the chosen integer to score. Mark the chosen element and its
                two adjacent elements if they exist. Repeat until all the array
                elements are marked. Return the score you get after applying the
                above algorithm.
              </div>
            </div>
            <Editor
              height={"60vh"}
              defaultValue="// write there"
              language={selectedLanguage}
              onChange={(value: string | undefined) => setValue(value)}
              onMount={onMount}
              options={{
                fontSize: fontSize,
              }}
              value={value}
            />
            <div className="result__block">
              <div className="result__title">Run result:</div>
              {loading && <>Code calculating...</>}
              {!loading && status && (
                <>
                  <div
                    className={`result__status ${
                      status === "error" ? "red" : "green"
                    }`}
                  >
                    {status}
                  </div>
                  {error ? (
                    <div className="result__error">{error}</div>
                  ) : (
                    <div className="result__output">{result}</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
