/* 
* Challenge: https://www.typescript-training.com/course/making-typescript-stick/04-data-layer-challenge
*/

export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

export type DataStoreMap = {
  [K in keyof DataEntityMap as `${K}s`]: DataEntityMap[K][];
};

export type IDataStore = 
{
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (element: DataEntityMap[K]) => DataEntityMap[K];
} &
{
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (id: string) => DataEntityMap[K] | undefined;
} &
{
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];  
} &
{
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
};



export class DataStore implements IDataStore {
  #store: DataStoreMap = {
    movies: [],
    songs: [],
  };

  addMovie(movie: Movie) {
    this.#store = {
      ...this.#store,
      movies: [
        ...this.#store.movies,
        movie,
      ]
    };

    return movie;
  }
  addSong(song: Song) {
    this.#store = {
      ...this.#store,
      songs: [
        ...this.#store.songs,
        song,
      ]
    };

    return song;
  }
  getMovie(id: string) { return this.#store.movies.find(movie => movie.id === id)};
  getSong(id: string) { return this.#store.songs.find(song => song.id === id) };
  getAllMovies(): Movie[] { return this.#store.movies }
  getAllSongs(): Song[] { return this.#store.songs }
  clearMovies() {
    this.#store = {
      ...this.#store,
      movies: []
    };
  }
  clearSongs() {
    this.#store = {
      ...this.#store,
      songs: []
    };
  }
}
