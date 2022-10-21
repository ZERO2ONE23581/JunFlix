import styled from '@emotion/styled';
import { ReadDate } from '../../../Tools/Date';
import { TrimText } from '../../../Tools/trimText';
import { avatarLink } from '../../../Tools/Avatar';
import { FlexCol, MotionBox } from '../../../../styles/global';
import { useCapLetters } from '../../../libs/client/useTools';
import { TweenTrans, color, TransBorder } from '../../../../styles/variants';
import { motion } from 'framer-motion';

interface IGridBox {
  key: number;
  theme: boolean;
  layoutId: string;
  onClick: () => void;
  post: {
    id: number;
    image: string | null;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export const GridBox = ({ post, theme, onClick, layoutId }: IGridBox) => {
  const id = post?.id!;
  const title = post?.title!;
  const image = post?.image!;
  const createdAt = post?.createdAt!;
  const updatedAt = post?.updatedAt!;
  return (
    <Cont
      key={id}
      custom={theme}
      variants={vars}
      onClick={onClick}
      layoutId={layoutId}
      transition={TweenTrans}
      exit="exit"
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="grid-box"
    >
      <motion.img
        alt="box img"
        custom={theme}
        variants={vars}
        animate="animate"
        src={avatarLink(image)}
      />

      <Info>
        <h2>
          <TrimText text={useCapLetters(title)} max={30} />
        </h2>
        <ul>
          <li>
            <ReadDate createdAt={createdAt} updatedAt={updatedAt} />
          </li>
        </ul>
      </Info>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  max-width: 300px;
  margin: 0 auto;
  gap: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  align-items: center;
  justify-content: flex-start;
  img {
    width: 100%;
    height: 85%;

    //height: 330px;
    border-radius: 10px;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;
const Info = styled(FlexCol)`
  gap: 10px;
  padding: 10px;
  //min-height: 100px;
  justify-content: center;
  height: 15%;
  //border: 2px solid pink;
  h2 {
    span {
      font-size: 1.3rem;
      font-weight: 400;
    }
  }
`;
const vars = {
  initial: (theme: boolean) => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.3 },
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
  }),
  hover: () => ({
    scale: 1.05,
    color: '#E50914',
    transition: { duration: 0.3 },
  }),
};
export const vars2 = {
  animate: (theme: boolean) => ({
    color: color(theme),
    border: TransBorder(!theme),
  }),
  hover: () => ({
    scale: 1.05,
    color: '#E50914',
    border: '3px solid #E50914',
    transition: { duration: 0.3 },
  }),
};
