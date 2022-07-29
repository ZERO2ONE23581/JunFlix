import { Info } from './Info';
import styled from '@emotion/styled';
import { Grid } from '../../../../styles/global';

interface IList {
  array: [];
}
export const List = ({ array }: IList) => {
  return (
    <Cont size={4}>
      {array?.map((item: any) => (
        <Item key={item.id}>
          <img
            src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
            alt="영화포스터1"
          />
          <Info item={item} />
        </Item>
      ))}
    </Cont>
  );
};
const Cont = styled(Grid)``;
const Item = styled.article`
  padding: 20px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border: ${(p) => p.theme.border.thin};
  img {
    width: 100%;
    height: 330px;
  }
  .red {
    color: ${(p) => p.theme.color.logo};
  }
`;
