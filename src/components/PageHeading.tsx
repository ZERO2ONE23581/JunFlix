import { Svg } from '../Tools/Svg';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { Ropes } from '../Tools/Title/ropes';
import { useUser } from '../libs/client/useUser';
import { Flex, FlexCol } from '../../styles/global';
import { useCapLetter } from '../libs/client/useTools';

interface IBoardPageHeading extends ITheme {
  type: string | any;
}
export const PageHeading = ({ type, theme }: IBoardPageHeading) => {
  console.log(type, '??');
  const { username, userId } = useUser();
  const USERNAME = useCapLetter(username ? username : userId);
  const [txt, setTxt] = useState({ eng: '', kor: '' });
  useEffect(() => {
    if (type) {
      if (type === 'users') return setTxt({ eng: 'HALL of FAME', kor: '' });
      if (type === 'movie') return setTxt({ eng: 'Movies', kor: '영화' });
      if (type === 'all_board') return setTxt({ eng: 'All Boards', kor: '' });
      if (type === 'user_board')
        return setTxt({ eng: `${USERNAME}'s Boards`, kor: '' });
      if (type === 'user_board')
        return setTxt({ eng: `${USERNAME}'s Board`, kor: `` });
      if (type === 'tv') return setTxt({ eng: `TV Shows`, kor: `` });
      if (type === 'top') return setTxt({ eng: `Classics`, kor: `` });
      if (type === 'now') return setTxt({ eng: `Now Playing`, kor: `` });
      if (type === 'upcoming')
        return setTxt({ eng: `Upcoming Movies`, kor: `` });
      if (type === 'trending') return setTxt({ eng: `Trending`, kor: `` });
    }
  }, [type, setTxt, USERNAME]);
  const svg = (txt: string) => {
    if (txt === 'users') return 'crown';
    if (txt === 'all_board' || txt === 'user_board') return 'grid';
    else return 'film';
  };
  return (
    <Cont className="page-title">
      <Wrap>
        <Ropes theme={theme} />
        <Txt>
          <span>
            <span>{txt.eng}</span>
            <span className="kor">{txt.kor}</span>
          </span>
          <Svg theme={theme} type={svg(type)!} />
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
  font-size: 1.8rem;
  width: fit-content;
  border-radius: 5px;
  padding: 0.5rem 2rem;
  border: 4px solid ${(p) => p.theme.color.logo};
  .kor {
    margin-left: 0.5rem;
  }
`;
