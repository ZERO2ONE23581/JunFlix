import styled from '@emotion/styled';
import { Genre } from '../../Board/Read/Board/Info/Genre';
import { UseFormRegisterReturn } from 'react-hook-form';

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
            <option value="">성별을 선택해주세요.</option>
            <option value="male">남</option>
            <option value="female">여</option>
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
      {id === 'genre' && <Genre genre={watch} size="2rem" />}
    </Cont>
  );
};
const Cont = styled.div<{ isWatch: boolean }>`
  padding: 0 10px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  border: ${(p) =>
    p.isWatch ? `1px solid ${p.theme.color.logo}` : p.theme.border.thin};
`;
const Select = styled.select`
  border: none;
  outline: none;
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
`;
