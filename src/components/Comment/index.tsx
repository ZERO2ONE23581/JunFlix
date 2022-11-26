import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { Comments } from './Comments';
import { Avatar } from '../../Tools/Avatar';
import { Flex } from '../../../styles/global';
import { CreateModal } from './Create/Modal';
import { ITheme } from '../../../styles/theme';
import { Dispatch, SetStateAction, useState } from 'react';

export interface ISetPost extends ITheme {
  setPost: Dispatch<SetStateAction<string>>;
}
interface IPostComment extends ISetPost {
  _data: {
    post_id: number;
    host_id: number;
  };
  setPost: Dispatch<SetStateAction<string>>;
}
export const PostComment = ({ theme, _data, setPost }: IPostComment) => {
  const { post_id, host_id } = _data;
  const openCreate = () => setCreate(true);
  const [create, setCreate] = useState(false);
  return (
    <>
      <Cont>
        <Title>
          <h1>Comments</h1>
          <Svg type="comments" theme={theme} />
        </Title>

        <Comments
          theme={theme}
          setPost={setPost}
          _data={{ post_id, host_id }}
        />

        <div className="text">
          <span>댓글을 남겨 피드백을 공유 하세요!</span>
          <span>Share feedbacks by leaving comments!</span>
        </div>

        <Flex className="wrap">
          <Avatar _data={{ size: '3.8rem', isRound: true, theme, host_id }} />
          <Input
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

        <CreateModal
          theme={theme}
          setPost={setPost}
          _data={{ post_id, modal: create, closeModal: () => setCreate(false) }}
        />
      </Cont>
    </>
  );
};
const Title = styled(Flex)`
  gap: 0.5rem;
  font-size: 1.5rem;
  svg {
  }
`;
const Cont = styled.article`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;

  .text {
    //border: 2px solid red;
    //text-align: center;
    margin: 0.5rem 0;
    font-size: 1.2rem;
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
