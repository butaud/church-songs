import "./App.css";
import {
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {songs, seenByIndex} from "./songs";
import { isPsalm } from "./util";
import { COLORS } from "./constants";
import { Unique } from "./sections/Unique";
import { Frequency } from "./sections/Frequency";

function App() {
  const songColorer = (song: keyof (typeof songs)[0]) => {
    return songs.map((entry, index) => {
      const seen = seenByIndex[index - 1] ?? new Set();
      const currentSong = entry[song];
      let color = "";
      if (seen.has(currentSong)) {
        color = isPsalm(currentSong) ? COLORS.PSALM_SEEN : COLORS.HYMN_SEEN;
      } else {
        color = isPsalm(currentSong) ? COLORS.PSALM_NEW : COLORS.HYMN_NEW;
      }
      return <Cell key={`cell-${index}`} fill={color} />;
    });
  };

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
