import { Svg } from '../Svg';
import { Ropes } from './Ropes';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ITheme } from '../../../styles/theme';
import { useUser } from '../../libs/client/useUser';
import { Flex, FlexCol } from '../../../styles/global';
import {
  useCapLetter,
  useCapLetters,
  useResponsive,
} from '../../libs/client/useTools';

interface IPageTitle extends ITheme {
  _genre?: string;
  type?: string | any;
}
export const PageTitle = ({ type, theme, _genre }: IPageTitle) => {
  const { username, userId } = useUser();
  const [txt, setTxt] = useState({ eng: '', kor: '' });
  const USERNAME = useCapLetter(username ? username : userId);
  useEffect(() => {
    if (_genre) {
      return setTxt({ eng: `${useCapLetters(_genre)} Boards`, kor: '' });
    } else if (type) {
      if (type === 'qs') return setTxt({ eng: 'Quick Saved', kor: '' });
      if (type === 'users') return setTxt({ eng: 'HALL of FAME', kor: '' });
      if (type === 'movie') return setTxt({ eng: 'Movies', kor: '영화' });
      if (type === 'all_board') return setTxt({ eng: 'All Boards', kor: '' });
      if (type === 'user_posts')
        return setTxt({ eng: `${USERNAME}'s Posts`, kor: '' });
      if (type === 'user_board')
        return setTxt({ eng: `${USERNAME}'s Board`, kor: `` });
      if (type === 'tv') return setTxt({ eng: `TV Shows`, kor: `` });
      if (type === 'top') return setTxt({ eng: `Classics`, kor: `` });
      if (type === 'now') return setTxt({ eng: `Now Playing`, kor: `` });
      if (type === 'upcoming')
        return setTxt({ eng: `Upcoming Movies`, kor: `` });
      if (type === 'trending') return setTxt({ eng: `Trending`, kor: `` });
    }
  }, [type, setTxt, USERNAME, _genre, useCapLetters]);

  const svg = () => {
    if (type === 'users') return 'crown';
    else if (type === 'qs' || type === 'user_posts') return 'posts';
    else if (type === 'all_board' || type === 'user_board') return 'grid';
    else return 'film';
  };
  return (
    <Cont className="page-title">
      <Wrap>
        <Ropes theme={theme} />
        <Txt className="txt">
          <span>
            <span>{txt.eng}</span>
            <span className="kor">{txt.kor}</span>
          </span>
          {!_genre && <Svg theme={theme} type={svg()!} />}
          {_genre === 'drama' && <Svg theme={theme} type={'drama'} />}
          {_genre === 'action' && <Svg theme={theme} type={'action'} />}
          {_genre === 'horror' && <Svg theme={theme} type={'horror'} />}
          {_genre === 'comedy' && <Svg theme={theme} type={'comedy'} />}
          {_genre === 'romance' && <Svg theme={theme} type={'romance'} />}
          {_genre === 'fantasy' && <Svg theme={theme} type={'fantasy'} />}
          {_genre === 'mystery' && <Svg theme={theme} type={'mystery'} />}
          {_genre === 'thriller' && <Svg theme={theme} type={'thriller'} />}
          {_genre === 'adventure' && <Svg theme={theme} type={'adventure'} />}
        </Txt>
      </Wrap>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  width: fit-content;
  pointer-events: none;
`;
const Wrap = styled(FlexCol)`
  position: relative;
  justify-content: center;
`;
const Txt = styled(Flex)`
  gap: 1rem;
  width: fit-content;
  border-radius: 5px;
  border: 4px solid ${(p) => p.theme.color.logo};
  .kor {
    margin-left: 0.5rem;
  }
`;
