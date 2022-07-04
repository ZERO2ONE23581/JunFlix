import styled from '@emotion/styled';
import useUser from '../../libs/client/useUser';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../Style/Button/IconBtn';

interface IBtnWrap {
  id: number;
  saveId: number;
  ownerId: number;
  setSaveId: Dispatch<SetStateAction<number>>;
  setReply: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setDelComment: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  id,
  saveId,
  ownerId,
  setSaveId,
  setReply,
  setEdit,
  setDelComment,
}: IBtnWrap) => {
  const { loggedInUser } = useUser();
  const handleClick = (id: number, type: string) => {
    setSaveId(id);
    if (type === 'reply') setReply((p: boolean) => !p);
    if (type === 'edit') setEdit((p: boolean) => !p);
    if (type === 'delete') setDelComment((p: boolean) => !p);
    if (type === 'cancel') {
      setSaveId(0);
      setEdit(false);
      setReply(false);
      setDelComment(false);
    }
  };
  return (
    <Cont>
      <IconBtn
        svgType="reply"
        type="button"
        disabled={saveId !== 0}
        onClick={() => handleClick(id, 'reply')}
      />
      <IconBtn
        svgType="close"
        type="button"
        disabled={saveId === 0}
        onClick={() => handleClick(id, 'cancel')}
      />
      {ownerId === loggedInUser?.id && (
        <>
          <IconBtn
            svgType="pen"
            type="button"
            disabled={saveId !== 0}
            onClick={() => handleClick(id, 'edit')}
          />
          <IconBtn
            svgType="trash"
            type="button"
            disabled={saveId !== 0}
            onClick={() => handleClick(id, 'delete')}
          />
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    width: 20px;
    height: 20px;
    :hover {
      fill: ${(p) => p.theme.color.logo};
    }
  }
  .close {
    svg {
      width: 28px;
      height: 28px;
    }
  }
  button {
    :disabled {
      cursor: default;
      opacity: 0.4;
      svg {
        /* fill: ${(p) => p.theme.color.logo}; */
        :hover {
          fill: ${(p) => p.theme.color.font};
        }
      }
    }
  }
`;
