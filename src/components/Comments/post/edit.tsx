import { useForm } from 'react-hook-form';
import useMutation from '../../../libs/client/useMutation';
import { IPostCommentsForm } from '../../../types/comments';
import { ICreateCommentsRes } from './create';

export const EditPostComments = ({ userId, boardId, postId }: any) => {
  const [editComments, { loading: editLoading, data: editResponse }] =
    useMutation<ICreateCommentsRes>(
      `/api/user/${userId}/board/${boardId}/post/${postId}/comments/edit`
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ comments }: IPostCommentsForm) => {
    if (editLoading) return;
    editComments({ comments });
  };

  //
  return (
    <>
      <Cont>
        <Wrap>
          <IconBtn onClick={createCommentClick}>
            {data?.isComments || response?.ok ? (
              <Icons name="comments" type="solid" />
            ) : (
              <Icons name="comments" type="empty" />
            )}
          </IconBtn>
          <Counts>
            {response?.ok ? (
              <span>{commentsCount! + 1}</span>
            ) : (
              <span>{commentsCount ? commentsCount : '0'}</span>
            )}
            <span>Comments</span>
          </Counts>
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
                placeholder="Add a comment..."
                errMsg={errors.comments?.message}
              />
              <Btn type="submit" btnName="POST" loading={loading} />
            </Form>
          )}
          <CommentsWrap>
            {/* 댓글 mutation 기능 */}
            {response?.comment && (
              <article className="wrap">
                <p>{response?.comment.content}</p>
                <span className="span-wrap">
                  <span>written by</span>
                  <span className="username">
                    {response?.comment.user.username}
                  </span>
                </span>
              </article>
            )}
            {/* 댓글 리스트 */}
            {data?.post?.comments?.map((info) => (
              <article key={info.id} className="wrap">
                <p>{info.content}</p>
                <span className="span-wrap">
                  <span>{info.id}</span>
                  <span>written by</span>
                  <span className="username">{info.user.username}</span>
                </span>
                <button>수정</button>
              </article>
            ))}
          </CommentsWrap>
        </Wrap>
      </Cont>
    </>
  );
};
