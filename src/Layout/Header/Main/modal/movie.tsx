import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { ListHover } from '../../../../../styles/variants';

interface IMovieMenu {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
export const MovieMenuModal = ({ selected, setSelected }: IMovieMenu) => {
  const router = useRouter();
  const onClick = (btnType: string, detail?: string) => {
    setSelected('');
    if (btnType === 'all') router.push(`/${selected}s`);
    if (btnType && detail === 'movietype') {
      if (btnType === 'all') router.push(`/movies`);
      else router.push(`/movies/${btnType}`);
    }
  };
  const movieArr = ['all', 'trending', 'now', 'tv', 'upcoming', 'top'];
  //
  return (
    <>
      {movieArr.map((e) => (
        <motion.li
          whileHover={ListHover}
          key={movieArr.indexOf(e)}
          onClick={() => onClick(e, 'movietype')}
        >
          <span>
            {e === 'all' && 'All Movies'}
            {e === 'trending' && 'Trending Now'}
            {e === 'now' && 'Now Playing'}
            {e === 'tv' && 'TV Shows'}
            {e === 'upcoming' && 'Upcoming'}
            {e === 'top' && 'Classics'}
          </span>
        </motion.li>
      ))}
    </>
  );
};
