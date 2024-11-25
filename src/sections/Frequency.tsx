import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { seenByIndex, songs } from "../songs";
import { isPsalm } from "../util";
import { COLORS } from "../constants";

const lastSeen = Array.from(seenByIndex[seenByIndex.length - 1]);
const frequencyData = lastSeen
    .filter(maybeSongNumber => typeof(maybeSongNumber) === "number")
    .map(songNumber => {
        const timesSung = songs.reduce((prev, current) => {
            return prev + Object.values(current).filter(v => v === songNumber).length
        }, 0);
        console.log(timesSung);
        return {
            song: songNumber,
            timesSung
        };
    })
    .sort((a, b) => a.song - b.song);

    
const songColorer = () => {
    return frequencyData.map((entry, index) => {
      const color = isPsalm(entry.song) ? COLORS.PSALM_NEW : COLORS.HYMN_NEW;
      return <Cell key={`cell-${index}`} fill={color} />;
    });
  };

export const Frequency = () => {
    return <ResponsiveContainer height={500}>
        <BarChart data={frequencyData}>
            <Bar dataKey="timesSung">
                {songColorer()}
                </Bar>
                <Tooltip />
            <XAxis dataKey="song" />
            <YAxis />
        </BarChart>
    </ResponsiveContainer>
};