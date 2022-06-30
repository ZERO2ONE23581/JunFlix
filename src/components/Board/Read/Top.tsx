import styled from '@emotion/styled';
import { Input } from '../../Style/Input';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { IBoardForm } from '../../../types/board';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import { ErrorMsg } from '../../Style/ErrMsg';

interface ITopProps {
  onEdit: boolean;
  register: UseFormRegister<IBoardForm>;
  ERR_TITLE?: string;
  ERR_GENRE?: string;
}
export const Top = ({ onEdit, register, ERR_TITLE, ERR_GENRE }: ITopProps) => {
  return (
    <Cont isEdit={onEdit}>
      <Title>
        <Input
          disabled={!onEdit}
          type="text"
          {...register('title', {
            required: '보드의 제목을 입력하세요.',
            maxLength: {
              value: 25,
              message: '보드제목은 25자 이내여야 합니다.',
            },
          })}
        />
        {ERR_TITLE && <ErrorMsg error={ERR_TITLE} />}
      </Title>

      {onEdit && (
        <>
          <SelectWrap
            id="genre"
            inputErrMsg={ERR_GENRE}
            register={register('genre', {
              required: '보드 장르를 선택해주세요.',
            })}
          />
          {ERR_GENRE && <ErrorMsg error={ERR_GENRE} />}
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article<{ isEdit: boolean }>`
  gap: 20px;
  display: flex;
  align-items: center;
  input {
    box-shadow: none;
    font-size: 1.6rem;
    padding-left: 20px;
    :disabled {
      padding: 0;
    }
  }
  select {
    font-size: 1.2rem;
    max-width: 100px;
  }
  input,
  select {
    height: 50px;
    font-weight: 700;
  }
`;
const Title = styled.div`
  position: relative;
`;
