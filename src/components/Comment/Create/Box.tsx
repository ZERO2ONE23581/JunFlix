import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Avatar } from '../../../Tools/Avatar';
import { Flex } from '../../../../styles/global';
import { color } from '../../../../styles/variants';
import { Dispatch, SetStateAction } from 'react';

interface ICreateCmtBox {
  _data: {
    theme: boolean;
    host_id: number;
    setCreate: Dispatch<SetStateAction<boolean>>;
  };
}
export const Box = ({ _data }: ICreateCmtBox) => {
  const { theme, host_id, setCreate } = _data;
  const openCreate = () => setCreate(true);
  return (
    <Cont>
      <Avatar _data={{ size: '3.5rem', isRound: true, theme, host_id }} />
      <FakeInput
        animate="animate"
        whileHover="hover"
        custom={{ theme }}
        onClick={openCreate}
        variants={fakeInputVar}
      >
        <span>Leave comments on this post...</span>
      </FakeInput>
      <Svg
        type="reply"
        theme={theme}
        onClick={openCreate}
        item={{ size: '1.8rem' }}
      />
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 1rem;
  width: 100%;
  justify-content: flex-start;
  justify-content: space-between;
`;
const FakeInput = styled(Flex)`
  max-width: 70%;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  outline: 1px solid ${(p) => p.theme.color.font};
  span {
    width: 100%;
  }
  ::placeholder {
    color: inherit;
  }
  :hover {
    ::placeholder {
      color: inherit;
      color: ${(p) => p.theme.color.font};
    }
  }
`;
const fakeInputVar = {
  hover: () => ({
    scale: 1.05,
    color: '#E50914',
    transition: { duration: 0.5 },
    outline: `3px solid #E50914`,
  }),
  animate: ({ theme }: any) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.3 },
    outline: `1px solid ${color(theme)}`,
  }),
};
