import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Flex, FlexCol } from '../../../../../styles/global';

interface IMovieHover {
  data: {
    title?: string;
    poster_path?: string;
    vote_average?: number;
    release_date?: string;
    original_name?: string;
    original_title?: string;
  };
}
export const MovieHover = ({ data }: IMovieHover) => {
  const date = data.release_date!;
  const rate = data.vote_average!;
  const [title, setTitle] = useState('');
  const [sliced, setSliced] = useState(title);
  useEffect(() => {
    if (data) {
      if (data.title) setTitle(data.title);
      if (data.original_title) setTitle(data.original_title);
      if (data.original_name) setTitle(data.original_name);
      if (title.length <= 10) setSliced(title);
      if (title.length > 10) setSliced(title.slice(0, 8) + '...');
    }
  }, [data, setTitle, setSliced, title]);
  const Date = date ? date : '-';
  const Rate = rate ? Math.round(rate! * 100) / 100 : '-';
  return (
    <Cont>
      <Front variants={{ hover: { opacity: 0 } }}>
        <span>{sliced}</span>
      </Front>
      <Hovered variants={{ hover: { opacity: 1 } }}>
        <Info>
          <Txt className="date">
            <span>Date:</span>
            <span className="data">{Date}</span>
          </Txt>
          <Txt>
            <span>Rate:</span>
            <span className="data">{Rate}</span>
          </Txt>
        </Info>
        <Title>{title}</Title>
      </Hovered>
    </Cont>
  );
};
const Cont = styled(Flex)`
  opacity: 1;
  font-weight: 500;
  position: relative;
`;
const Front = styled(Flex)`
  padding: 8px;
  opacity: 0.5;
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const Hovered = styled(FlexCol)`
  bottom: 0;
  opacity: 0;
  position: absolute;
  padding-bottom: 0.5rem;
  justify-content: center;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const Title = styled(Flex)`
  gap: 0.2rem;
  font-size: 1.2rem;
  width: fit-content;
  text-align: center;
`;
const Info = styled(Flex)`
  gap: 0.5rem;
  padding: 0.5rem;
`;
const Txt = styled(Flex)`
  gap: 0.2rem;
  width: fit-content;
  align-items: flex-end;
  .data {
    font-size: 0.9rem;
    color: ${(p) => p.theme.color.logo};
  }
`;
