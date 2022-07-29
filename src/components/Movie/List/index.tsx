import { Info } from './Info';
import styled from '@emotion/styled';
import { Grid } from '../../../../styles/global';

interface IList {
  array: [];
}
export const List = ({ array }: IList) => {
  console.log(array);
  return (
    <Cont size={5}>
      {array?.map((item: any) => (
        <Item key={item.id}>
          <img
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt="영화포스터1"
          />
          {/* <img
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt="영화포스터1"
          /> */}
          <Info item={item} />
        </Item>
      ))}
    </Cont>
  );
};
const Cont = styled(Grid)``;
const Item = styled.article`
  img {
    width: 100%;
    min-height: 130px;
  }
  .red {
    color: ${(p) => p.theme.color.logo};
  }
`;
