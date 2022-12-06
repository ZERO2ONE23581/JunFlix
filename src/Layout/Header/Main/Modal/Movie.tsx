import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { hoverBgColor, TweenTrans } from '../../../../../styles/variants';

interface IMovie {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
export const Movie = ({ selected, setSelected }: IMovie) => {
  const router = useRouter();
  const onClick = (btnType: string, detail?: string) => {
    setSelected('');
    if (btnType === 'all') router.push(`/${selected}s`);
    if (btnType && detail === 'movietype') {
      if (btnType === 'all') router.push(`/movies`);
      else router.push(`/movies/${btnType}`);
    }
  };
  const array = ['all', 'trending', 'now', 'tv', 'upcoming', 'top'];
  return (
    <>
      {array.map((e) => (
        <motion.li
          whileHover={'hover'}
          variants={hoverBgColor}
          transition={TweenTrans}
          key={array.indexOf(e)}
          onClick={() => onClick(e, 'movietype')}
        >
          <span>
            {e === 'all' && 'All Movies'}
            {e === 'tv' && 'TV Shows'}
            {e === 'top' && 'Classics'}
            {e === 'now' && 'Now Playing'}
            {e === 'upcoming' && 'Upcoming'}
            {e === 'trending' && 'Trending Now'}
          </span>
        </motion.li>
      ))}
    </>
  );
};
