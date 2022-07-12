import styled from '@emotion/styled';
import Head from 'next/head';
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
  name?: string;
  type: string;
}
export const TitleSign = ({ name, type }: ITitleSign) => {
  return (
    <>
      <Cont>
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
          {!name && <>All {type}</>}
        </h1>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  max-width: 250px;
  margin-left: 30px;
  margin-bottom: 15px;
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
  }
`;
