import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from './utils/ToggleColorMode';
import { fetchToken } from './utils';
import { selectGenreOrCategory, searchMovie } from './features/currentGenreOrCategory';

function useAlan() {
  const { setMode } = useContext(ColorModeContext);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    alanBtn({
      key: 'e85d8e7360b5ebb55045baf4eab3f18d2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({
        command, mode, genre, genreOrCategory, query,
      }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genre.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

          if (foundGenre) {
            history.push('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
            history.push('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          history.push('/');
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
}

export default useAlan;
