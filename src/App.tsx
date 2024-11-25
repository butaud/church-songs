import "./App.css";
import {
  CartesianGrid,
  Cell,
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import songs from "./songs.json";

function App() {
  const seen = new Set<number | string | null>();

  const songColorer = (song: keyof (typeof songs)[0]) => {
    return songs.map((entry, index) => {
      const currentSong = entry[song];
      const color = seen.has(currentSong) ? "gray" : "green";
      seen.add(currentSong);
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
              <Label value="Confession" />
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
