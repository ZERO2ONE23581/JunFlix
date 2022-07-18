import Head from 'next/head';
import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';

interface ITitleProps {
  title: string;
}
export const Title = ({ title }: ITitleProps) => {
  return (
    <>
      <Head>
        <title>{title} | JUNFLIX</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
    </>
  );
};

interface ITitleSign {
  type: string;
  svg?: string;
  width: string;
  name?: string;
  svgSize?: string;
}
export const TitleSign = ({ name, type, svg, svgSize, width }: ITitleSign) => {
  return (
    <>
      <Cont width={width}>
        <div className="flex">
          <Svg type="ellipsis-v" fill="#e50914" size="1.6rem" />
          <Svg type="ellipsis-v" fill="#e50914" size="1.6rem" />
        </div>
        <h1>
          {name && (
            <>
              {name}님의 {type}
            </>
          )}
          {!name && (
            <>
              {type !== 'Movie Reviews' && <span>All</span>} {type}
            </>
          )}
          {svg && <Svg type={svg!} size={svgSize!} />}
        </h1>
      </Cont>
    </>
  );
};
const Cont = styled.article<{ width: string }>`
  margin-left: 30px;
  margin-bottom: 15px;
  max-width: ${(p) => p.width && p.width};
  .flex {
    display: flex;
    justify-content: space-between;
  }
  h1 {
    padding: 10px;
    font-size: 1.6rem;
    text-align: center;
    border-radius: 5px;
    border: 4px solid ${(p) => p.theme.color.logo};
    position: relative;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      pointer-events: none;
    }
  }
`;
