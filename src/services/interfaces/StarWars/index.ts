export interface StarWarCharacter {
  name: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  films: object[];
}

export interface StarWarFilmList {
  results: object[];
}

export interface StarWarFilm {
  title: string;
  characters: object[];
}

export interface StarWarPeopleHomeLand {
  data: object;
}
