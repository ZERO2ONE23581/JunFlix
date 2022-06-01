import styled from '@emotion/styled';
import { Comments, Post, User } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Btn } from '../..';
import { Form } from '../../../../../styles/default';
import { Icons } from '../../../../../styles/svg';
import useMutation from '../../../../libs/client/useMutation';
import { Input } from '../../../Input';
import { Cont, Counts, IconBtn, Wrap } from '../../Likes/post';

interface IGetPost {
  ok: boolean;
  error?: string;
  isComments?: boolean;
  post: PostWithComments;
}
interface PostWithComments extends Post {
  comments: CommentsWithUser[];
  _count: {
    comments: number;
  };
}
interface CommentsWithUser extends Comments {
  user: User;
}
interface IPostCommentsForm {
  comments: string;
}

export const PostComments = ({ userId, boardId, postId }: any) => {
  const isQueryId = Boolean(userId && boardId && postId);
  const { data, mutate } = useSWR<IGetPost>(
    isQueryId && `/api/user/${userId}/board/${boardId}/post/${postId}`
  );
  const commentsCount = data?.post?._count.comments;
  const [createComments, { loading, data: response }] = useMutation(
    `/api/user/${userId}/board/${boardId}/post/${postId}/create/comments`
  );
  //
  const [openForm, setOpenForm] = useState(false);
  const handleClick = () => {
    setOpenForm((p) => !p);
    if (!data) return;
    // mutate(
    //   {
    //     ...data,
    //     isComments: !data.isComments,
    //     post: {
    //       ...data.post,
    //       _count: {
    //         ...data.post._count,
    //         likes: data.isComments
    //           ? data.post._count.comments - 1
    //           : data.post._count.comments + 1,
    //       },
    //     },
    //   },
    //   false
    // );
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ comments }: IPostCommentsForm) => {
    if (loading) return;
    createComments({ comments });
  };

  //
  return (
    <>
      <Cont>
        <Wrap>
          <IconBtn onClick={handleClick}>
            {!data?.isComments ? (
              <Icons name="comments" type="empty" />
            ) : (
              <Icons name="comments" type="solid" />
            )}
          </IconBtn>
          <Counts>
            <span>{commentsCount ? commentsCount : '0'}</span>
            <span>Comments</span>
          </Counts>
          <>
            <CommentsWrap>
              {data?.post.comments.map((info) => (
                <article key={info.id}>
                  <span>{info.user.username}</span>
                  <span>{info.content}</span>
                </article>
              ))}
            </CommentsWrap>
          </>
          {openForm && (
            <Form onSubmit={handleSubmit(onValid)}>
              <Input
                register={register('comments', {
                  required: '댓글을 입력해주세요.',
                })}
                type="text"
                disabled={false}
                label="Comments"
                name="comments"
                placeholder="Add a commnet..."
                errMsg={errors.comments?.message}
              />
              <Btn type="submit" btnName="POST" loading={loading} />
            </Form>
          )}
        </Wrap>
      </Cont>
    </>
  );
};
const CommentsWrap = styled.article`
  border: 2px solid blueviolet;
  display: flex;
  flex-direction: column;
  gap: 5px;
  span {
    border: 2px solid red;
  }
`;
