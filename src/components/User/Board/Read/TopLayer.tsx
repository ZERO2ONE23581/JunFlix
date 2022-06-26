import styled from '@emotion/styled';
import { IBoardInfosProps } from './Board';
import { Input } from '../../../Style/Input';
import { SelectWrap } from '../../../Style/Input/SelectWrap';

export const TopLayer = ({ onEdit, register }: IBoardInfosProps) => {
  return (
    <Cont isEdit={onEdit}>
      <Title>
        <Input
          disabled={!onEdit}
          type="text"
          {...register('title', {
            required: '보드의 제목을 입력하세요.',
            maxLength: {
              value: 15,
              message: '보드제목은 15자 이내여야 합니다.',
            },
          })}
        />
      </Title>
      {onEdit && (
        <SelectWrap
          id="genre"
          register={register('genre', {
            required: '보드 장르를 선택해주세요.',
          })}
        />
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
