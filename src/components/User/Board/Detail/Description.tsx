import styled from '@emotion/styled';
import { Input } from '../../../Style/Input';
import { TextArea } from '../../../Style/Input/TextArea';
import { FollowCounts } from '../Follow/counts';
import { IBoardInfosProps } from './ReadBoard';

export const Description = ({ board, onEdit, register }: IBoardInfosProps) => {
  return (
    <>
      <Cont>
        <FollowCounts counts={board?._count} />
        <ListWrap>
          <li className="genre">
            <span>보드 장르:</span>
            <Input disabled={!onEdit} type="text" {...register('genre')} />
          </li>
          <li className="intro">
            <span>소개글:</span>
            <TextArea disabled={!onEdit} {...register('intro')} />
          </li>
        </ListWrap>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  .follow-counts {
    margin: 10px auto;
  }
  input,
  textarea {
    box-shadow: none;
    font-style: italic;
    color: ${(p) => p.theme.color.logo};
    border: 2px solid ${(p) => p.theme.color.logo};
    :disabled {
      padding: 0;
      opacity: 0.7;
      border: none;
      color: inherit;
    }
  }
`;
const ListWrap = styled.ul`
  li {
    gap: 5px;
    margin-bottom: 8px;
    padding-bottom: 1px;
    span {
      font-size: 1.1rem;
      margin-right: 5px;
    }
  }
  .genre {
    input {
      padding: 2px 5px;
      max-width: 100px;
      :disabled {
        border: none;
      }
    }
  }
  .intro {
    textarea {
      padding: 10px;
      display: block;
      min-width: 80%;
      margin-top: 10px;
      font-size: 1.2rem;
    }
  }
`;
