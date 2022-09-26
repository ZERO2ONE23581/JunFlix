import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import { motion } from 'framer-motion';
import { useCapLetters } from '../../../../../libs/client/useTools';

interface IHoverBox {
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
export const HoverBox = ({ data }: IHoverBox) => {
  const handleLongLetters = (type: string) => {
    const maxTitle = 15;
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
  return (
    <Cont
      variants={containerVars}
      transition={{ type: 'spring', stiffness: 60 }}
    >
      <TitleWrap
        variants={{
          hover: {
            fontSize: '22px',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            ...Trans,
          },
        }}
      >
        <Title
          variants={{
            initial: { fontSize: '2em' },
            hover: { fontSize: '1em', color: '#ffffff', ...Trans },
          }}
        >
          <span>{handleLongLetters('title')}</span>
          {data.isOwner && <Svg type="isOwner" size="1.4rem" />}
        </Title>
        <Username
          initial="initial"
          variants={{
            initial: { fontSize: '1rem' },
            hover: { fontSize: '1em', color: '#ffffff', ...Trans },
          }}
        >
          <span className="madeBy">made by</span>
          <span className="data">{data?.username}</span>
        </Username>

        <Detail
          variants={{ hover: { fontSize: '1rem', opacity: 1, ...Trans } }}
        >
          <li className="genre">
            <span>Genre: </span>
            <span>{data?.genre}</span>
            <Svg type={data?.genre!} size="1.5em" />
          </li>
          <li className="intro">
            {data.intro && <p>"{handleLongLetters('intro')}"</p>}
          </li>
        </Detail>
      </TitleWrap>
    </Cont>
  );
};
const Trans = {
  transition: {
    delay: 0.3,
    duration: 0.3,
  },
};
const containerVars = {
  hover: {
    backgroundColor: '#E50914',
    ...Trans,
  },
};
const Cont = styled(motion.div)`
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;
  min-height: 140px;
  padding: 1.5em 2em;
  ul {
    li {
      display: flex;
      align-items: center;
    }
  }
`;
const TitleWrap = styled(motion.ul)`
  width: 100%;
  position: relative;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Title = styled(motion.li)`
  position: relative;
  span {
    opacity: 1;
    font-weight: 400;
    font-style: normal;
  }
  .isOwner {
    top: -10px;
    right: -20px;
    position: absolute;
    fill: ${(p) => p.theme.color.green};
  }
`;
const Username = styled(motion.li)`
  span {
    font-weight: 500;
    font-style: italic;
    margin-right: 5px;
  }
  .madeBy {
    opacity: 0.7;
  }
  .data {
    opacity: 1;
  }
`;
const Detail = styled(motion.ul)`
  opacity: 0;
  top: 2.2em;
  left: 0;
  position: absolute;
  gap: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  .genre {
    span {
      margin-right: 5px;
    }
    svg {
      pointer-events: none;
    }
  }
  .intro {
    opacity: 0.9;
    font-style: italic;
  }
`;
