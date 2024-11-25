import sys
import re
import json

def read_data(filename):
    with open(filename, 'r') as f:
        data = f.readlines()
    return data

def parse_csv(data):
    parsed_data = []
    for line in data:
        parsed_data.append(line.strip().split(','))
    return parsed_data

def get_songs(parsed_data):
    return [SongRecord(data) for data in parsed_data]

def write_songs_as_json(songs, filename):
    with open(filename, 'w') as f:
        json.dump([song.__dict__ for song in songs], f)

def normalize_song(song):
    match = re.match(r"#?([0-9]+).*", song.strip())
    if match != None:
        return int(match.group(1))
    return None
    
class SongRecord:
    def __init__(self, data):
        self.date = data[0]
        self.praise_song = normalize_song(data[1])
        self.confession_song = normalize_song(data[2])
        self.assurance_song = normalize_song(data[3])
        self.offertory_song = normalize_song(data[4])
        self.bread_song = normalize_song(data[5])
        self.wine_song = normalize_song(data[6])
    
def main():
    if len(sys.argv) != 3:
        print("Usage: python preprocess.py <input_file> <output_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    data = read_data(input_file)
    parsed_data = parse_csv(data)
    songs = get_songs(parsed_data)
    write_songs_as_json(songs, output_file)

if __name__ == "__main__":
    main()