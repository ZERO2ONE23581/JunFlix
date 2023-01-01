import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useUser } from '../../../../libs/client/useUser';
import { UseCapLetters } from '../../../../libs/client/useTools';
import { SpringTrans, hoverBgColor } from '../../../../../styles/variants';

interface IListModal {
  _data: {
    type?: string;
    theme: boolean;
    isMovie: boolean;
    isBoard: boolean;
    selected?: string;
    setSelected: Dispatch<SetStateAction<string>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const ListModal = ({ _data }: IListModal) => {
  const router = useRouter();
  const { user_id, isLoggedIn } = useUser();
  const {
    type,
    theme,
    isMovie,
    isBoard,
    selected,
    setSelected,
    setCreatePost,
  } = _data;
  const Text = (txt: string) => {
    const isHideTxt =
      isBoard && !Boolean(txt === 'all' || txt === 'my' || txt === 'create');
    if (isMovie) {
      if (txt === 'tv') return `TV Shows`;
      if (txt === 'top') return `Classics`;
      if (txt === 'all') return `All Movies`;
      if (txt === 'now') return `Now Playing`;
      if (txt === 'upcoming') return `Upcoming`;
      if (txt === 'trending') return `Trending`;
    } else if (txt === 'quick') return UseCapLetters(`Quick Saved`);
    else if (isHideTxt) return UseCapLetters(`${txt} `);
    else if (txt === 'create') return 'Create';
    else return UseCapLetters(`${txt} ${selected}`);
  };
  const isGenre = Boolean(
    type === 'drama' ||
      type === 'action' ||
      type === 'horror' ||
      type === 'comedy' ||
      type === 'romance' ||
      type === 'fantasy' ||
      type === 'mystery' ||
      type === 'thriller' ||
      type === 'adventure'
  );
  const onClick = () => {
    setSelected('');
    const noNeedToLogin = Boolean(type === 'all' || isMovie);
    if (!isLoggedIn && !noNeedToLogin) return router.push('/login');
    if (Boolean(isMovie)) return router.push(`/movie/${type}`);
    else if (isBoard) {
      if (isGenre) return router.push(`/board/all/${type}`);
      if (type === 'all') return router.push(`/board/all`);
      if (type === 'create') return router.push(`/board/create`);
      if (type === 'my') return router.push(`/user/${user_id}/boards`);
    } else {
      if (type === 'create') return setCreatePost(true);
      if (type === 'all') return router.push(`/post/all`);
      if (type === 'my') return router.push(`/user/${user_id}/posts`);
      if (type === 'quick')
        return router.push(`/user/${user_id}/posts/quick_saved`);
    }
  };
  return (
    <Cont
      custom={theme}
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      variants={hoverBgColor}
      transition={SpringTrans}
    >
      <span>{Text(type!)}</span>
    </Cont>
  );
};
const Cont = styled(motion.li)`
  padding: 8px;
  color: inherit;
  cursor: pointer;
  font-size: 0.9em;
  text-align: center;
  span {
    :nth-of-type(2) {
      margin-left: 5px;
    }
  }
`;
