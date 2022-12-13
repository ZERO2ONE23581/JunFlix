import { Svg } from '../Tools/Svg';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { Ropes } from '../Tools/Title/ropes';
import { useUser } from '../libs/client/useUser';
import { Flex, FlexCol } from '../../styles/global';
import { useCapLetter } from '../libs/client/useTools';

interface IBoardPageHeading extends ITheme {
  type: string;
}
export const PageHeading = ({ type, theme }: IBoardPageHeading) => {
  const { username, userId } = useUser();
  const USERNAME = useCapLetter(username ? username : userId);
  const [txt, setTxt] = useState({ eng: '', kor: '' });
  useEffect(() => {
    if (type) {
      if (type === 'movie') return setTxt({ eng: 'Movies', kor: '영화' });
      if (type === 'all_board') return setTxt({ eng: 'Boards', kor: '' });
      if (type === 'user_board')
        return setTxt({ eng: `${USERNAME}'s Board`, kor: `` });
    }
  }, [type, setTxt, USERNAME]);
  const svg = type === 'movie' ? 'film' : '';
  return (
    <Cont className="page-title">
      <Wrap>
        <Ropes theme={theme} />
        <Txt>
          <span>
            <span>{txt.eng}</span>
            <span className="kor">{txt.kor}</span>
          </span>
          <Svg theme={theme} type={svg} />
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
