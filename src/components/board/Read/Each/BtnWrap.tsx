import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { hoverBgVars } from '../../../../../styles/variants';
import { Flex, FlexCol } from '../../../../../styles/global';
import { useCapLetter } from '../../../../libs/client/useTools';

interface IBtnWrap {
  _follow: {
    name: string;
    onClick: () => void;
    isFollowing: boolean;
  };
  _data: {
    theme: boolean;
    genre: string;
    isMyBoard: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const BtnWrap = ({ _data, _follow }: IBtnWrap) => {
  const { name, onClick, isFollowing } = _follow;
  const { theme, genre, isMyBoard, setFixed, setCreatePost } = _data;
  const router = useRouter();
  const handleClick = () => {
    if (isMyBoard) return setCreatePost(true);
    else return onClick();
  };
  const clickGen = () => {
    if (genre) router.push(`/all/${genre}/boards`);
    else router.push(`/all/boards`);
  };
  return (
    <Cont className="box-btns">
      <Btn className="box-btn" onClick={() => router.push(`/all/boards`)}>
        <Box
          animate="animate"
          whileHover="hover"
          custom={!theme}
          variants={boxBtnVar}
        >
          <Svg theme={!theme} type="compass" />
        </Box>
        <Name className="name">All Boards</Name>
      </Btn>

      <Btn className="box-btn" onClick={clickGen}>
        <Box
          animate="animate"
          whileHover="hover"
          custom={!theme}
          variants={boxBtnVar}
        >
          <Svg theme={!theme} type={genre ? genre : 'film'} />
        </Box>
        <Name className="name"> {useCapLetter(genre ? genre : 'genre')}</Name>
      </Btn>

      <Btn className="box-btn" onClick={handleClick}>
        <Box
          animate="animate"
          whileHover="hover"
          custom={!theme}
          variants={boxBtnVar}
        >
          {isFollowing && <Svg theme={!theme} type="check" />}
          {!isFollowing && <Svg theme={!theme} type="plus" />}
        </Box>
        <Name className="name">{isMyBoard ? 'Create Post' : name}</Name>
      </Btn>
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 1rem;
  width: fit-content;
`;
const Btn = styled(FlexCol)`
  gap: 0.5rem;
  width: fit-content;
`;
const Box = styled(Flex)`
  cursor: pointer;
  width: 4.4rem;
  height: 4.4rem;
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
