import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../../../../../styles/global';
import { useUser } from '../../../../libs/client/useUser';
import { Avatar } from '../../../../Tools/Avatar';

import { InputWrap } from '../../../../Tools/Input';
import { Svg } from '../../../../Tools/Svg';

interface ICommentBox {
  theme: boolean;
}

export const CommentBox = ({ theme }: ICommentBox) => {
  const { loggedInUser } = useUser();
  const host_id = loggedInUser?.id!;
  const avatar = loggedInUser?.avatar!;
  const _avatar = {
    theme,
    host_id,
    size: '3rem',
    isRound: true,
    preview: null,
  };
  //
  return (
    <Cont className="comment_box">
      <Flex className="icon-text-wrap">
        <Svg type="unsolid-comment" theme={theme} />
        <motion.h3>
          <span>Leave your comments if you like this post.</span>
          <span>이 포스트가 마음에 드셨다면 댓글을 작성해주세요.</span>
        </motion.h3>
      </Flex>
      <Flex className="wrap">
        <Avatar _data={{ ..._avatar }} />
        <InputWrap
          _data={{
            id: 'comment',
            type: 'text',
            theme,
            label: '',
            error: '',
            placeholder: 'write comment...',
          }}
        />
      </Flex>
    </Cont>
  );
};
const Cont = styled.form`
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0.8;
  padding: 20px;
  font-style: italic;
  position: relative;
  border-top: 1px solid ${(p) => p.theme.color.font};
  font-size: 1.1rem;
  .icon-text-wrap {
    gap: 15px;
    padding-left: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    svg {
      margin-top: 5px;
      pointer-events: none;
    }
    h3 {
      //border: 2px solid yellow;
      margin-bottom: 15px;
      line-height: 22px;
      width: fit-content;
      span {
        display: block;
      }
    }
  }
  .wrap {
    gap: 15px;
    width: 100%;
    justify-content: space-between;
    .input-wrap {
      width: 100%;
      padding-right: 10px;
    }
    input {
      border-radius: 20px;
    }
  }
`;
