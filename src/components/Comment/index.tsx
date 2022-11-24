import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { Avatar } from '../../Tools/Avatar';
import { useUser } from '../../libs/client/useUser';
import { Flex, Modal } from '../../../styles/global';
import { OverlayBg } from '../../Tools/overlay';
import { CreateModal } from './Create/Modal';

interface IPostComment {
  theme: boolean;
}
export const PostComment = ({ theme }: IPostComment) => {
  const { user_id: host_id } = useUser();
  const [create, setCreate] = useState(false);
  const openCreate = () => setCreate(true);
  return (
    <>
      <Cont>
        <h1>Comments</h1>
        <span>
          <span>댓글을 남겨 피드백을 공유 하세요!</span>
          <span>Share feedbacks by leaving comments on this post!</span>
        </span>
        <Flex className="wrap">
          <Avatar _data={{ size: '4rem', isRound: true, theme, host_id }} />
          <Input
            //disabled
            type="text"
            onClick={openCreate}
            placeholder="Leave comments on this post..."
          />
          <Svg
            type="reply"
            theme={theme}
            onClick={openCreate}
            item={{ size: '1.8rem' }}
          />
        </Flex>
      </Cont>
      <CreateModal theme={theme} _data={{ create, setCreate }} />
    </>
  );
};
const Cont = styled.article`
  width: 100%;
  height: 100%;
  border: 2px solid red;
  padding: 1rem 2rem;
  h1 {
    font-size: 1.5rem;
  }
  > span {
    span {
      display: block;
      font-style: italic;
    }
  }
  .wrap {
    gap: 1rem;
    width: 100%;
    justify-content: flex-start;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  cursor: pointer;
  max-width: 300px;
  font-size: 1.1rem;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  background-color: inherit;
  outline: 1px solid ${(p) => p.theme.color.font};
  ::placeholder {
    color: inherit;
    color: ${(p) => p.theme.color.font};
  }
`;
