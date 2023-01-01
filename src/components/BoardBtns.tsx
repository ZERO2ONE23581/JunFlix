import { Svg } from '../Tools/Svg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { hoverBgVars } from '../../styles/variants';
import { UseCapLetter } from '../libs/client/useTools';
import { Flex, FlexCol_, Flex_ } from '../../styles/global';

interface IBtnWrap {
  _follow: {
    name: string;
    onClick: () => void;
    isFollowing: boolean;
  };
  _data: {
    genre: string;
    theme: boolean;
    isDesk: boolean;
    isMyBoard: boolean;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const BoardBtns = ({ _data, _follow }: IBtnWrap) => {
  const { name, onClick, isFollowing } = _follow;
  const { theme, genre, isMyBoard, setCreatePost, isDesk } = _data;
  const router = useRouter();
  const handleClick = () => {
    if (isMyBoard) return setCreatePost(true);
    else return onClick();
  };
  const clickGen = () => {
    if (genre) router.push(`/board/all/${genre}`);
    else allboard();
  };
  const allboard = () => router.push(`/board/all`);
  const size = isDesk ? '2rem' : '4rem';
  return (
    <Cont isDesk={isDesk}>
      <Btn isDesk={isDesk} onClick={allboard}>
        <Box
          className="box"
          animate="animate"
          whileHover="hover"
          custom={!theme}
          variants={boxBtnVar}
        >
          <Svg item={{ size }} theme={!theme} type="compass" />
        </Box>
        <Name className="name">All Boards</Name>
      </Btn>

      <Btn isDesk={isDesk} onClick={clickGen}>
        <Box
          className="box"
          animate="animate"
          whileHover="hover"
          custom={!theme}
          variants={boxBtnVar}
        >
          <Svg item={{ size }} theme={!theme} type={genre ? genre : 'film'} />
        </Box>
        <Name className="name"> {UseCapLetter(genre ? genre : 'genre')}</Name>
      </Btn>

      <Btn isDesk={isDesk} onClick={handleClick}>
        <Box
          className="box"
          animate="animate"
          whileHover="hover"
          custom={!theme}
          variants={boxBtnVar}
        >
          {isFollowing && <Svg item={{ size }} theme={!theme} type="check" />}
          {!isFollowing && <Svg item={{ size }} theme={!theme} type="plus" />}
        </Box>
        <Name className="name">{isMyBoard ? 'Create Post' : name}</Name>
      </Btn>
    </Cont>
  );
};
const Cont = styled(Flex_)`
  gap: 1.3rem;
  width: fit-content;
`;
const Btn = styled(FlexCol_)`
  gap: 0.5rem;
  width: fit-content;
  .name {
    text-align: center;
    width: fit-content;
    height: fit-content;
    font-size: ${(p) => (p.isDesk ? '1rem' : '1.7rem')};
  }
  .box {
    width: ${(p) => (p.isDesk ? '4.4rem' : '8rem')};
    height: ${(p) => (p.isDesk ? '4.4rem' : '8rem')};
  }
`;
const Box = styled(Flex)`
  cursor: pointer;
  border-radius: 10px;
  svg {
    pointer-events: none;
  }
`;
const Name = styled(motion.span)`
  display: block;
  font-size: 1rem;
  width: fit-content;
  text-align: center;
  height: fit-content;
`;

const boxBtnVar = {
  ...hoverBgVars,
};
