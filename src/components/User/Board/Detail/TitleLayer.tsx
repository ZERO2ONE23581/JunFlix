import styled from '@emotion/styled';
import { IBoardInfosProps } from './ReadBoard';
import { Input } from '../../../Style/Input';

export const TitleLayer = ({ onEdit, register }: IBoardInfosProps) => {
  return (
    <Cont>
      <Title isEdit={onEdit}>
        <Input disabled={!onEdit} type="text" {...register('title')} />
      </Title>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;
const Title = styled.div<{ isEdit: boolean }>`
  input {
    padding: 5px 0;
    padding-left: 20px;
    font-size: 1.8rem;
    font-weight: 700;
    box-shadow: none;
    color: ${(p) => p.theme.color.logo};
    border: 2px solid ${(p) => p.theme.color.logo};
    :disabled {
      color: inherit;
      border: none;
    }
    &:focus {
      border: 2px solid transparent;
      color: #2ecc71;
      outline: 3px solid #2ecc71;
    }
  }
`;
