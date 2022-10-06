import { Svg } from './Svg';

interface IGenreIcons {
  type: string;
}
export const GenreIcons = ({ type }: IGenreIcons) => {
  return (
    <>
      {type === '' && <Svg type="" size="2rem" />}
      {type === 'Sf' && <Svg type="Sf" size="2rem" />}
      {type === 'Action' && <Svg type="Action" size="2rem" />}
      {type === 'Drama' && <Svg type="Drama" size="2rem" />}
      {type === 'Horror' && <Svg type="Horror" size="2rem" />}
      {type === 'Thriller' && <Svg type="Thriller" size="2rem" />}
      {type === 'Mystery' && <Svg type="Mystery" size="2rem" />}
      {type === 'Comedy' && <Svg type="Comedy" size="2rem" />}
      {type === 'Fantasy' && <Svg type="Fantasy" size="2rem" />}
      {type === 'Adventure' && <Svg type="Adventure" size="2rem" />}
    </>
  );
};
