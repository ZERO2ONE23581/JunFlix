import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { FollowCounts } from '../Follow/counts';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { TextArea } from '../../../Style/Input/TextArea';
import { IBoardForm, IBoardWithAttrs } from '../../../../types/board';

interface IBottomProps {
  onEdit: boolean;
  board: IBoardWithAttrs;
  register: UseFormRegister<IBoardForm>;
  setSaveEdit: Dispatch<SetStateAction<boolean>>;
}
export const Bottom = ({
  board,
  onEdit,
  register,
  setSaveEdit,
}: IBottomProps) => {
  return (
    <>
      <Cont>
        <FollowCounts counts={board?._count} />
        <div className="flex">
          <TextArea
            disabled={!onEdit}
            {...register('intro', {
              maxLength: {
                value: 100,
                message: '소개글은 100자 이내여야 합니다.',
              },
            })}
          />
          {onEdit && (
            <Btn type="button" name="SAVE" onClick={() => setSaveEdit(true)} />
          )}
        </div>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
    textarea {
      min-width: 83%;
      padding: 10px 20px;
      font-size: 1.1rem;
      :disabled {
        min-width: 100%;
        padding: 10px 20px;
        font-size: 1.1rem;
      }
    }
    button {
      width: 60px;
    }
  }
`;
