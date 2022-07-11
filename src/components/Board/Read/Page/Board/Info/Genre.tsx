import styled from '@emotion/styled';
import { Svg } from '../../../../../Style/Svg/Svg';

interface IGenre {
  genre: string;
}
export const Genre = ({ genre }: IGenre) => {
  return (
    <Cont>
      <span>{genre === 'SF' && <Svg type="ufo" />}</span>
      <span>{genre === 'Action' && <Svg type="glove" />}</span>
      <span>{genre === 'Drama' && <Svg type="mask" />}</span>
      <span>{genre === 'Horror' && <Svg type="ghost" />}</span>
      <span>{genre === 'Mystery' && <Svg type="secret-agent" />}</span>
      <span>{genre === 'Thriller' && <Svg type="icy" />}</span>
      <span>{genre === 'Comedy' && <Svg type="laugh" />}</span>
      <span>{genre === 'Fantasy' && <Svg type="wizard" />}</span>
    </Cont>
  );
};
const Cont = styled.div`
  svg {
    width: 36px;
    height: 36px;
  }
  .mask,
  .ufo {
    svg {
      width: 50px;
      height: 50px;
    }
  }
  .laugh {
    svg {
      /* width: 35px;
      height: 35px; */
    }
  }
`;
