import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { seenByIndex, songs } from "../songs"
import { isPsalm } from "../util";
import { COLORS } from "../constants";


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

export const Unique = () => {
    return <section className="unique">
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
      <Statistics />
    </section>
};


const Statistics = () => {
    const lastSeen = Array.from(seenByIndex[seenByIndex.length - 1]);
    const seenPsalms = lastSeen.filter(isPsalm).length;
    const seenHymns = lastSeen.length - seenPsalms;
  
    return <div>
      <h3>Unique songs</h3>
      <div className="stats">
        <p className="hymns">Hymns: {seenHymns}</p>
        <p className="psalms">Psalms: {seenPsalms}</p>
        <p>Total: {lastSeen.length}</p>
      </div>
    </div>;
  };