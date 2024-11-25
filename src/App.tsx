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
import songs from "./songs.json";

const seenByIndex = new Array<Set<number | string | null>>();
songs.forEach((week, index) => {
  const prev: Set<number | string | null> =
    index === 0 ? new Set() : seenByIndex[index - 1];
  const current = new Set(prev);
  current.add(week.praise_song);
  current.add(week.confession_song);
  current.add(week.assurance_song);
  current.add(week.offertory_song);
  current.add(week.bread_song);
  current.add(week.wine_song);
  seenByIndex.push(current);
});

const COLORS = {
  PSALM_NEW: "hsl(0 68% 50%)",
  PSALM_SEEN: "hsl(0 40% 75%)",
  HYMN_NEW: "hsl(234 46.7% 50%)",
  HYMN_SEEN: "hsl(234 35% 75%)"
};

const isPsalm = (songNumber: number | string | null) => {
  return (typeof (songNumber) === "number" && songNumber <= 300);
}

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
      <p>
        The color of the dot indicates whether it had been sung before in this time period.
      </p>
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
      <ResponsiveContainer height={500}>
        <ScatterChart data={songs}>
          <Scatter dataKey="praise_song" isAnimationActive={false}>
            {songColorer("praise_song")}
          </Scatter>
          <Scatter dataKey="confession_song" isAnimationActive={false}>
            {songColorer("confession_song")}
          </Scatter>
          <Scatter dataKey="assurance_song" isAnimationActive={false}>
            {songColorer("assurance_song")}
          </Scatter>
          <Scatter dataKey="offertory_song" isAnimationActive={false}>
            {songColorer("offertory_song")}
          </Scatter>
          <Scatter dataKey="bread_song" isAnimationActive={false}>
            {songColorer("bread_song")}
          </Scatter>
          <Scatter dataKey="wine_song" isAnimationActive={false}>
            {songColorer("wine_song")}
          </Scatter>
          <XAxis dataKey="date" />
          <YAxis
            ticks={[100, 200, 300, 400, 500, 600, 700]}
          />
          <Tooltip />
        </ScatterChart>
      </ResponsiveContainer>
      {isPortrait && <p>(Landscape orientation recommended for better viewing.)</p>}
      <p>Note: Starting date chosen because it was the week we changed over to the 2020 Cantus numbering.</p>
    </div>
  );
}

export default App;
