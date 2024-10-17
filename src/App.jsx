import { useCallback, useState, useEffect } from "react";
import ServerState from "./ServerState";
import "./styles.css";
import getChanges from "./utils/getChanges";
import { clear as ClearDb, save as saveToDb } from "./utils/async";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState(textInput);

  // implement debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      save(textInput); // textInput is newStr, atm, debouncedInput is still oldStr
      setDebouncedInput(textInput);
    }, 500); // 500ms

    return () => clearTimeout(timeoutId);
  }, [textInput]);

  const save = useCallback(
    async (value) => {
      console.log(`debouncedInput = ${debouncedInput}, value = ${value}`);
      const changes = getChanges(debouncedInput, value);
      console.log("changes: ", changes);

      if (!changes) {
        return;
      }
      const data = await saveToDb(changes);
    },
    [debouncedInput]
  );

  const handleClear = useCallback(async () => {
    await ClearDb();
    setTextInput("");
    setDebouncedInput("");
  }, []);

  return (
    <div className="App">
      <form>
        <div>
          <h4>Document</h4>
          <textarea
            onChange={(e) => setTextInput(e.target.value)}
            value={textInput}
          />
          <ServerState />
        </div>
        <div className="actions">
          <button type="reset" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}