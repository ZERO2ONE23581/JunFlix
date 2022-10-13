import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../libs/client/useUser';
import { useCapLetter } from '../../../libs/client/useTools';
import {
  hoverBgColor,
  SpringTrans,
  TweenTrans,
} from '../../../../styles/variants';

interface IMainMenuModal {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
export const ModalLists = ({ selected, setSelected }: IMainMenuModal) => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  //
  const unLogArr = () => {
    if (!isLoggedIn) return ['all'];
    if (isLoggedIn) return ['all', 'my'];
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
  //
  const onClick = (btnType: string, detail?: string) => {
    setSelected('');
    if (btnType === 'all') router.push(`/${selected}/all`);
    if (btnType === 'my') {
      if (!isLoggedIn) return;
      router.push(`/${selected}/my`);
    }
    if (btnType && detail === 'genre') router.push(`/board/${btnType}`);
    if (btnType === 'create') {
      if (!isLoggedIn) return;
      if (selected === 'post') {
        alert('포스트를 생성할 보드를 선택해주세요.');
        router.push(`/board/my`);
      } else {
        router.push(`/${selected}/create`);
      }
    }
    if (btnType && detail === 'movietype') {
      if (btnType === 'all') router.push(`/movies`);
      else router.push(`/movies/${btnType}`);
    }
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
