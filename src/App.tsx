import "./App.css";
import {
  CartesianGrid,
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

function App() {
  const songColorer = (song: keyof (typeof songs)[0]) => {
    return songs.map((entry, index) => {
      const seen = seenByIndex[index - 1] ?? new Set();
      const currentSong = entry[song];
      const color = seen.has(currentSong) ? "gray" : "green";
      return <Cell key={`cell-${index}`} fill={color} />;
    });
  };

  return (
    <div className="App">
      <h1>Songs sung by Emmanuel since March 21, 2021</h1>
      <p>
        The color of the dots represents the first time a song was sung.
        <ul>
          <li className="new">First time (during this period)</li>
          <li className="seen">Sung before</li>
        </ul>
      </p>
      <div className="chart">
        <ResponsiveContainer minWidth={800} height={500}>
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
              ticks={[300]}
              tickFormatter={(value) => {
                return "Hymns ^ v Psalms";
              }}
            />
            <Tooltip />
            <CartesianGrid syncWithTicks vertical={false} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
