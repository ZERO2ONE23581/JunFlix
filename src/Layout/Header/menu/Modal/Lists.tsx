import {
  TweenTrans,
  SpringTrans,
  hoverBgColor,
} from '../../../../../styles/variants';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useUser } from '../../../../libs/client/useUser';
import { useCapLetter } from '../../../../libs/client/useTools';

interface IMainMenuModal {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  setCreatePost: Dispatch<SetStateAction<boolean>>;
}
export const Lists = ({
  selected,
  setSelected,
  setCreatePost,
}: IMainMenuModal) => {
  const router = useRouter();
  const { isLoggedIn, loggedInUser } = useUser();
  const onClick = (btnType: string, detail?: string) => {
    setSelected('');
    if (btnType === 'all') router.push(`/all/${selected}s/`);
    if (btnType === 'my') {
      if (!isLoggedIn) return;
      router.push(`/user/${loggedInUser?.id!}/${selected}s/`);
    }
    if (btnType && detail === 'genre') router.push(`/board/${btnType}`);
    if (btnType === 'create') {
      if (!isLoggedIn) return;
      if (selected === 'post') {
        return setCreatePost(true);
      } else return router.push(`/${selected}/create`);
    }
    if (btnType && detail === 'movietype') {
      if (btnType === 'all') router.push(`/movies`);
      else router.push(`/movies/${btnType}`);
    }
  };
  const unLogArr = () => {
    if (!isLoggedIn) return ['all'];
    if (isLoggedIn) return ['all', 'my'];
  };
  //
  return (
    <>
      {unLogArr()?.map((i: any) => (
        <motion.li
          whileHover={'hover'}
          variants={hoverBgColor}
          transition={SpringTrans}
          onClick={() => onClick(i)}
          key={unLogArr()?.indexOf(i)}
        >
          <span>{useCapLetter(i)}</span>
          <span>{useCapLetter(selected)}s</span>
        </motion.li>
      ))}
      {selected === 'board' && (
        <>
          {Genre.map((i) => (
            <motion.li
              whileHover={'hover'}
              key={Genre.indexOf(i)}
              variants={hoverBgColor}
              transition={TweenTrans}
              onClick={() => onClick(i, 'genre')}
            >
              <span>{useCapLetter(i)}</span>
            </motion.li>
          ))}
        </>
      )}
      {isLoggedIn && (
        <motion.li
          whileHover={'hover'}
          variants={hoverBgColor}
          transition={TweenTrans}
          onClick={() => onClick('create')}
        >
          <span>Create</span>
        </motion.li>
      )}
    </>
  );
};

const Genre = [
  'sf',
  'drama',
  'comedy',
  'action',
  'horror',
  'mystery',
  'thriller',
];
