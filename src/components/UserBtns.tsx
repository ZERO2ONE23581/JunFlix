import styled from '@emotion/styled';
import { Btn } from '../Tools/Button';
import { Dispatch, SetStateAction } from 'react';
import { Flex_ } from '../../styles/global';
import { color, redColor } from '../../styles/variants';
import { UseCapLetter, useResponsive } from '../libs/client/useTools';

interface IUserBtns {
  _data: {
    theme: boolean;
    clicked: string;
    setClicked: Dispatch<SetStateAction<string>>;
  };
}
export const UserBtns = ({ _data }: IUserBtns) => {
  const { isDesk } = useResponsive();
  const { theme, setClicked, clicked } = _data;
  const Array = ['posts', 'likes', 'boards', 'saved'];
  return (
    <Cont isDesk={isDesk}>
      {Array.map((element) => (
        <Btn
          type="button"
          _vars={vars}
          key={Array.indexOf(element)}
          onClick={() => setClicked(element)}
          item={{
            theme,
            name: UseCapLetter(element),
            isClicked: Boolean(clicked === element),
          }}
        />
      ))}
    </Cont>
  );
};
export const Cont = styled(Flex_)`
  gap: 3rem;
  button {
    border-radius: 0;
    width: ${(p) => (p.isDesk ? '100px' : '200px')};
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
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
