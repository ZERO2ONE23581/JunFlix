import { Svg } from '../../../../Style/Svg/Svg';

interface IGenre {
  genre: string;
  size: string;
}
export const Genre = ({ genre, size }: IGenre) => {
  return (
    <>
      {genre === 'SF' && <Svg size={size} type="ufo" />}
      {genre === 'Action' && <Svg size={size} type="glove" />}
      {genre === 'Drama' && <Svg size={size} type="mask" />}
      {genre === 'Horror' && <Svg size={size} type="ghost" />}
      {genre === 'Mystery' && <Svg size={size} type="secret-agent" />}
      {genre === 'Thriller' && <Svg size={size} type="icy" />}
      {genre === 'Comedy' && <Svg size={size} type="laugh" />}
      {genre === 'Fantasy' && <Svg size={size} type="wizard" />}
    </>
  );
};
