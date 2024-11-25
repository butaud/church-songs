import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { seenByIndex, songs } from "../songs";
import { isPsalm } from "../util";
import { COLORS } from "../constants";
import { useMemo, useState } from "react";

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
    });

    

export const Frequency = () => {
    const [sortByFrequency, setSortByFrequency] = useState(false);

    const data = useMemo(() => {
        if (sortByFrequency) {
            return frequencyData.sort((a, b) => b.timesSung - a.timesSung)
        } else {
            return frequencyData.sort((a, b) => a.song - b.song);
        }
    }, [sortByFrequency]);

    const songColorer = () => {
        return data.map((entry, index) => {
          const color = isPsalm(entry.song) ? COLORS.PSALM_NEW : COLORS.HYMN_NEW;
          return <Cell key={`cell-${index}`} fill={color} />;
        });
      };
    
    return <section>
        <input type="checkbox" checked={sortByFrequency} onChange={event => {
            if (event.currentTarget.checked) {
                setSortByFrequency(true);
            } else {
                setSortByFrequency(false);
            }
        }} />
        <label>Sort by frequency</label>
        <ResponsiveContainer height={500}>
        <BarChart data={data}>
            <Bar dataKey="timesSung">
                {songColorer()}
                </Bar>
                <Tooltip />
            <XAxis dataKey="song" />
            <YAxis />
        </BarChart>
    </ResponsiveContainer>
        </section>
};