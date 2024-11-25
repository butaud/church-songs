import "./App.css";
import { Unique } from "./sections/Unique";
import { Frequency } from "./sections/Frequency";

function App() {
  const isPortrait = document.documentElement.clientWidth < document.documentElement.clientHeight;

  return (
    <div className="App">
      <h1>Songs sung by Emmanuel since March 21, 2021</h1>
      {isPortrait && <p>(Landscape orientation recommended for better viewing.)</p>}
      <div className="legend">
        <ul>
          <li className="hymn new">Hymn, first time</li>
          <li className="hymn seen">Hymn, sung before</li>
        </ul>
        <ul>
          <li className="psalm new">Psalm, new</li>
          <li className="psalm seen">Psalm, sung before</li>
        </ul>
      </div>
      <Unique />
      <Frequency />
      <p>Note: Starting date chosen because it was the week we changed over to the 2020 Cantus numbering.</p>
    </div>
  );
}

export default App;
