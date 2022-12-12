import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Btn } from '../../../../../Tools/Button';
import { BtnWrap } from '../../../../../../styles/global';
import { useCapLetter } from '../../../../../libs/client/useTools';
import { color, redColor } from '../../../../../../styles/variants';

interface IUserBtns {
  _data: {
    theme: boolean;
    clicked: string;
    setClicked: Dispatch<SetStateAction<string>>;
  };
}
export const UserBtns = ({ _data }: IUserBtns) => {
  const { theme, setClicked, clicked } = _data;
  const Array = ['posts', 'likes', 'boards', 'saved'];
  return (
    <Cont>
      {Array.map((element) => (
        <Btn
          type="button"
          _vars={vars}
          key={Array.indexOf(element)}
          onClick={() => setClicked(element)}
          item={{
            theme,
            name: useCapLetter(element),
            isClicked: Boolean(clicked === element),
          }}
        />
      ))}
    </Cont>
  );
};
export const Cont = styled(BtnWrap)`
  gap: 3rem;
  button {
    width: 10rem;
    border-radius: 0;
  }
`;
const vars = {
  animate: ({ theme, isClicked }: any) => ({
    scale: 1,
    transition: { duration: 0.4 },
    backgroundColor: color(!theme),
    color: isClicked ? redColor : color(theme),
    borderBottom: isClicked ? '4px solid red' : '4px solid transparent',
  }),
  hover: ({ theme }: any) => ({
    color: redColor,
    scale: 1.1,
    borderBottom: '4px solid red',
    transition: { duration: 0.4 },
    backgroundColor: color(!theme),
  }),
};
