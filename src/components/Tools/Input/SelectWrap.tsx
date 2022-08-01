import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Svg } from '../Svg';

interface ISelectWrap {
  id: string;
  watch: string;
  disabled?: boolean;
  register: UseFormRegisterReturn;
}

export const SelectWrap = ({ id, register, disabled, watch }: ISelectWrap) => {
  return (
    <Cont className="select-wrap" isWatch={Boolean(watch)}>
      <Select {...register} id={id} name={id} disabled={disabled}>
        {id === 'gender' && (
          <>
            <option value="">Sex (성별)</option>
            <option value="male">Male (남)</option>
            <option value="female">Female (여)</option>
          </>
        )}
        {id === 'genre' && (
          <>
            <option value="">영화장르</option>
            <option value="SF">SF (SF)</option>
            <option value="Action">Action (액션)</option>
            <option value="Drama">Drama (드라마)</option>
            <option value="Horror">Horror (공포)</option>
            <option value="Thriller">Thriller (스릴러)</option>
            <option value="Mystery">Mystery (미스터리)</option>
            <option value="Comedy">Comedy (코미디)</option>
            <option value="Fantasy">Fantasy (판타지)</option>
          </>
        )}
      </Select>

      {id === 'genre' && (
        <>
          {watch === 'SF' && <Svg type="SF" size="2rem" />}
          {watch === 'Action' && <Svg type="Action" size="2rem" />}
          {watch === 'Drama' && <Svg type="Drama" size="2rem" />}
          {watch === 'Horror' && <Svg type="Horror" size="2rem" />}
          {watch === 'Thriller' && <Svg type="Thriller" size="2rem" />}
          {watch === 'Mystery' && <Svg type="Mystery" size="2rem" />}
          {watch === 'Comedy' && <Svg type="Comedy" size="2rem" />}
          {watch === 'Fantasy' && <Svg type="Fantasy" size="2rem" />}
        </>
      )}
    </Cont>
  );
};
const Cont = styled.div<{ isWatch: boolean }>`
  gap: 5px;
  display: flex;
  padding: 0 10px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  border: ${(p) =>
    p.isWatch ? `1px solid ${p.theme.color.logo}` : p.theme.border.thin};
  svg {
    fill: ${(p) => p.theme.color.font};
  }
`;
const Select = styled.select`
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 10px 0;
  max-width: 170px;
  text-align: center;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
`;
