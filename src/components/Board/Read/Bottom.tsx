import styled from '@emotion/styled';
import { FollowCounts } from '../Follow/counts';
import { UseFormRegister } from 'react-hook-form';
import { TextArea } from '../../Style/Input/TextArea';
import { IBoardForm, IBoardWithAttrs } from '../../../types/board';
import { ErrorMsg } from '../../Style/ErrMsg';

interface IBottomProps {
  onEdit: boolean;
  ERR_INTRO?: string;
  BOARD_COUNT: {
    posts: number;
    followers: number;
  };
  register: UseFormRegister<IBoardForm>;
}
export const Bottom = ({
  BOARD_COUNT,
  onEdit,
  register,
  ERR_INTRO,
}: IBottomProps) => {
  return (
    <>
      <Cont>
        <FollowCounts counts={BOARD_COUNT} />
        <TextArea
          rows={4}
          autoCapitalize="sentences"
          disabled={!onEdit}
          {...register('intro', {
            maxLength: {
              value: 100,
              message: '소개글은 100자 이내여야 합니다.',
            },
          })}
        />
        {ERR_INTRO && <ErrorMsg error={ERR_INTRO} />}
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
        padding: 0;
        min-width: 100%;
        font-size: 1.1rem;
      }
    }
    button {
      width: 60px;
    }
  }
`;
