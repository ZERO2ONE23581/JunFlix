import styled from '@emotion/styled';
import { FollowCounts } from '../Follow/counts';
import { IBoardInfosProps } from './Board';
import { TextArea } from '../../../Style/Input/TextArea';

export const BottomLayer = ({ board, onEdit, register }: IBoardInfosProps) => {
  return (
    <>
      <Cont>
        <FollowCounts counts={board?._count} />
        <TextArea
          disabled={!onEdit}
          {...register('intro', {
            maxLength: {
              value: 100,
              message: '소개글은 100자 이내여야 합니다.',
            },
          })}
        />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  textarea {
    padding: 10px 20px;
    width: 90%;
    font-size: 1.2rem;
  }
`;
