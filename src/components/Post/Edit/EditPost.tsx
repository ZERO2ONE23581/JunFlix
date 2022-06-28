import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Input } from '../../Style/Input';
import { SubmitEdit } from './SubmitEdit';
import { useForm } from 'react-hook-form';
import { Author } from '../../../../Author';
import { IconBtn } from '../../Style/Button/IconBtn';
import { TextArea } from '../../Style/Input/TextArea';
import { AvatarInput } from '../../Avatar/AvatarInput';
import useMutation from '../../../libs/client/useMutation';
import { IEditPostForm, IGetPost } from '../../../types/post';
import { ModalClose, ModalSchema } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreatePostModalProps {
  post_id: number;
  setEditPost: Dispatch<SetStateAction<boolean>>;
}
export const EditPost = ({ post_id, setEditPost }: ICreatePostModalProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const QueryId = user_id && board_id;
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const [maxCnt] = useState(700);
  const [maxTitle] = useState(20);
  const [avatarLoading, setAvatarLoading] = useState(false);

  //get
  const { data: givenData } = useSWR<IGetPost>(
    QueryId && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const post = givenData?.post;
  useEffect(() => {
    if (post) {
      if (post.title) setValue('title', post.title.toUpperCase());
      if (post.content) setValue('content', post.content);
    }
  }, [givenData, setValue, post]);

  //post
  const [EditPost, { data, loading }] = useMutation(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/edit`
  );
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  const onValid = async ({ avatar, title, content }: IEditPostForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      setAvatarLoading((p) => !p);
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      setAvatarLoading((p) => !p);
      return EditPost({ title, content, avatar: id });
    } else {
      return EditPost({ title, content });
    }
  };
  const [preview, setPreview] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      alert('게시물을 수정했습니다.');
      setEditPost(false);
    }
  }, [avatar, data, router, setEditPost]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <AvatarInput
            disabled={false}
            preview={preview}
            avatar={post?.avatar}
            register={register('avatar')}
          />
          <EditInfo>
            <Top>
              <span>게시물 수정하기</span>
              <IconBtn
                type="button"
                svgType="close-btn"
                onClick={() => setEditPost(false)}
              />
            </Top>
            <Title>
              <label htmlFor="title" />
              <Input
                {...register('title', {
                  required: '게시물 제목을 입력해주세요.',
                  maxLength: {
                    value: maxTitle,
                    message: '게시물 제목은 20자 이내여야 합니다.',
                  },
                })}
                id="title"
                name="title"
                type="text"
              />
            </Title>
            <Content>
              <Author post={post!} />
              <label htmlFor="content" />
              <TextArea
                {...register('content', {
                  maxLength: {
                    value: maxCnt,
                    message: '게시물 내용은 1000자 이내여야 합니다.',
                  },
                })}
                id="content"
                name="content"
              />
            </Content>
            <div className="submit-btn">
              <Btn
                type="button"
                name="수정완료"
                onClick={() => setOnSubmit(true)}
              />
            </div>
            <Notice>
              <span>* Click the picture if you'd like to pick a new one.</span>
              <span>
                * 새로운 사진을 업로드 하시길 원하면 왼쪽 사진을 클릭하세요.
              </span>
            </Notice>
          </EditInfo>
        </Cont>
        {onSubmit && (
          <SubmitEdit
            loading={Loading}
            closeModal={setOnSubmit}
            errors={{
              data: data?.error,
              title: errors.title?.message,
              content: errors.content?.message,
            }}
          />
        )}
      </form>
      <ModalClose zIndex={201} onClick={() => setEditPost(false)} />
    </>
  );
};
const Cont = styled(ModalSchema)`
  width: 70vw;
  height: 70vh;
  z-index: 202;
  display: flex;
  overflow: hidden;
`;

const EditInfo = styled.article`
  gap: 5%;
  width: 45%;
  display: flex;
  flex-direction: column;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.bold};
  background-color: ${(p) => p.theme.color.bg};
  input,
  textarea {
    border: 2px solid #c0392b;
    border: 2px solid #2ecc71;
  }
  .submit-btn {
    display: flex;
    padding-right: 20px;
    justify-content: end;
  }
`;
const Top = styled.div`
  position: relative;
  padding: 14px 10px;
  font-size: 1.1rem;
  text-align: center;
  border-bottom: ${(p) => p.theme.border.bold};
  button {
    top: 15%;
    right: 2%;
    position: absolute;
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;
const Title = styled.article`
  padding: 0 15px;
  input {
    padding: 10px;
    box-shadow: none;
    border-radius: 3px;
  }
`;
const Content = styled.article`
  padding: 0 20px;
  textarea {
    /* height: 220px; */
    padding: 15px;
    margin: 20px auto;
  }
`;
const Notice = styled.div`
  padding-left: 10px;
  font-size: 0.9rem;
  span {
    opacity: 0.6;
    display: block;
    font-style: italic;
    margin-bottom: 5px;
  }
`;
