import styled from '@emotion/styled';
import { Icons } from '../../../../styles/svg';
import useMutation from '../../../libs/client/useMutation';

export const Likes = ({ userId, boardId, postId }: any) => {
  const [createLikes, { data, loading }] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/likes/create`
  );
  const handleClick = () => {
    createLikes({});
  };
  //
  return (
    <>
      <BtnWrap>
        <Btn onClick={handleClick}>
          <Icons name="likes" type="empty" />
        </Btn>
        <Btn>
          <Icons name="comments" type="empty" />
        </Btn>
        {/* <Icons name="likes" type="solid" />
        <Icons name="comments" type="solid" /> */}
      </BtnWrap>
    </>
  );
};
const Btn = styled.button`
  background-color: inherit;
  border: 1px solid blue;
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid red;
  width: 100px;
`;
