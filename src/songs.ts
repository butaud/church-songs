import songs_raw from "./songs.json";

export const songs = songs_raw;

export const seenByIndex = new Array<Set<number | string | null>>();
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