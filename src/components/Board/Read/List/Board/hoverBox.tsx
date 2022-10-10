import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { motion } from 'framer-motion';
import { useCapLetters } from '../../../../../libs/client/useTools';
import { ITheme } from '../../../../../../styles/theme';

interface IHoverBox extends ITheme {
  data: {
    isOwner: boolean;
    title?: string;
    genre?: string;
    avatar?: string;
    userId: number;
    intro?: string;
    username?: string;
  };
}
export const HoverBox = ({ data, theme }: IHoverBox) => {
  const handleLongLetters = (type: string) => {
    const maxTitle = 20;
    const maxIntro = 20;
    const Title = useCapLetters(data?.title!);
    const Intro = useCapLetters(data?.intro!);

    if (type === 'title') {
      const isLong = Boolean(data?.title?.length! > maxTitle);
      if (isLong) return Title.slice(0, maxTitle) + '...';
      if (!isLong) return Title;
    }
    if (type === 'intro') {
      const isLong = Boolean(data?.intro?.length! > maxIntro);
      if (isLong) return Intro.slice(0, maxIntro) + '...';
      if (!isLong) return Intro;
    }
  };
  const isAvatar = Boolean(data.avatar);
  const variants = {
    initial: ({ theme, isAvatar }: any) => ({
      color: isAvatar ? '#ffffff' : theme ? '#ffffff' : '#000000',
    }),
    animate: ({ theme, isAvatar }: any) => ({
      transition: { duration: 0.4 },
      color: isAvatar ? '#ffffff' : theme ? '#ffffff' : '#000000',
    }),
    hover: ({ theme, isAvatar }: any) => ({
      color: '#ffffff',
      backgroundColor: '#E50914',
    }),
  };
  //
  return (
    <Cont
      exit="exit"
      initial="initial"
      animate="animate"
      whileHover="hover"
      custom={{ theme, isAvatar }}
      variants={variants}
    >
      <h2>
        <span>{handleLongLetters('title')}</span>
        {data?.isOwner && (
          <Svg fill={'#2ecc71'} theme={theme} type="isOwner" size="1rem" />
        )}
      </h2>
      <ul className="board-info">
        <li>
          <label>Host:</label>
          <span>{data?.username}</span>
        </li>
        <li className="genre">
          <label>Genre: </label>
          <span>{data?.genre ? data?.genre : 'N.A.'}</span>
          <Svg theme={theme} type={data?.genre!} size="1.5em" />
        </li>
        <li>
          {data?.intro && (
            <p className="intro">"{handleLongLetters('intro')}"</p>
          )}
        </li>
      </ul>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  min-height: 150px;
  h2 {
    font-size: 2rem;
    width: fit-content;
    position: relative;
    margin-bottom: 20px;
    svg {
      top: -10px;
      right: -15px;
      position: absolute;
    }
  }
  ul {
    font-size: 1.1em;
    width: 100%;
    height: 100%;
    position: relative;
    height: fit-content;
    li {
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 5px;
      label {
        opacity: 0.8;
        margin-right: 10px;
      }
      .intro {
        font-size: 1.1em;
      }
      span {
        opacity: 1;
        font-weight: 400;
        font-style: normal;
      }
    }
  }
`;
