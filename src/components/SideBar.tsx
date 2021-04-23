import { useState, useEffect } from 'react';
import { Button } from './Button';
import { api } from '../services/api';
import { GenreResponseProps } from './interfaces/interfaces';

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenre: (id: number) => void;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className='sidebar'>
      <span>
        Watch<p>Me</p>
      </span>

      <div className='buttons-container'>
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.setSelectedGenre(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
