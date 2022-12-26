import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Avatar } from '../../../Tools/Avatar';
import { Flex, Flex_ } from '../../../../styles/global';
import { color } from '../../../../styles/variants';
import { Dispatch, SetStateAction } from 'react';

interface ICreateCmtBox {
  _data: {
    theme: boolean;
    host_id: number;
    isDesk: boolean;
    setCreate: Dispatch<SetStateAction<boolean>>;
  };
}
export const Box = ({ _data }: ICreateCmtBox) => {
  const { isDesk, theme, host_id, setCreate } = _data;
  const openCreate = () => setCreate(true);
  const size = isDesk ? '3.5rem' : '7rem';
  const svg_size = isDesk ? '1.8rem' : '4rem';
  return (
    <Cont isDesk={isDesk}>
      <Avatar _data={{ size, isRound: true, theme, host_id }} />
      <Inp
        variants={vars}
        custom={{ theme }}
        onClick={openCreate}
        animate="animate"
        whileHover="hover"
        className="input_box"
      >
        <span>Leave comments...</span>
      </Inp>
      <Svg
        type="reply"
        theme={theme}
        onClick={openCreate}
        item={{ size: svg_size }}
      />
    </Cont>
  );
};
const Cont = styled(Flex_)`
  gap: 1rem;
  justify-content: flex-start;
  .input_box {
    max-width: 70%;
    font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.5rem')};
    padding: ${(p) => (p.isDesk ? '0.8rem 1rem' : '1.5rem')};
  }
`;
const Inp = styled(Flex)`
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  outline: 1px solid ${(p) => p.theme.color.font};
  span {
    width: 100%;
  }
`;
const vars = {
  hover: () => ({
    scale: 1.05,
    color: '#E50914',
    transition: { duration: 0.5 },
    outline: `3px solid #E50914`,
  }),
  animate: ({ theme }: any) => ({
    scale: 1,
    opacity: 0.8,
    color: color(theme),
    transition: { duration: 0.3 },
    outline: `1px solid ${color(theme)}`,
  }),
};
