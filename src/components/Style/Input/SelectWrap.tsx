import styled from '@emotion/styled';
import { Genre } from '../../Board/Read/Page/Board/Info/Genre';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ISelectWrap {
  id: string;
  genre: string;
  disabled?: boolean;
  register: UseFormRegisterReturn;
}

export const SelectWrap = ({ id, register, disabled, genre }: ISelectWrap) => {
  return (
    <Cont className="select-wrap">
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
      {id === 'genre' && <Genre genre={genre} />}
    </Cont>
  );
};
const Cont = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: ${(p) => p.theme.border.thin};
  box-shadow: ${(p) => p.theme.boxShadow.input};
`;
const Select = styled.select`
  border: none;
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  background-color: inherit;
  color: ${(p) => p.theme.color.font};
  outline: none;
`;
