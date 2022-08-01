import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { LoadingModal } from '../../LoadingModal';
import useUser from '../../../libs/client/useUser';
import { IconBtn } from '../../Style/Button/IconBtn';
import { TitleInput } from '../../Style/Input/Title';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, DimBackground, AnswerModal } from '../../../../styles/global';

interface IDeleteBoard {
  setDelBoard: Dispatch<SetStateAction<boolean>>;
}
interface IVerifyID {
  userId: string;
}
export const DeleteBoard = ({ setDelBoard }: IDeleteBoard) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { loggedInUser } = useUser();
  const [confirm, setConfirm] = useState(false);
  const isMyPost = Boolean(loggedInUser?.id === Number(user_id));
  const clickYes = () => {
    if (!isMyPost) alert('삭제권한이 없습니다.');
    setConfirm(true);
  };
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVerifyID>({ mode: 'onSubmit' });
  const isTyped = Boolean(watch('userId'));
  const [DeletePost, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/delete`
  );
  const onValid = async ({ userId }: IVerifyID) => {
    if (loading) return;
    return DeletePost({ userId });
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.push('/user/all/boards');
    }
  }, [data, router]);
  return (
    <>
      {!loading && (
        <Cont>
          {!confirm && (
            <>
              <IconBtn
                size="1.8rem"
                type="button"
                svgType="close"
                onClick={() => setDelBoard(false)}
              />
              <span>이 포스트를 삭제 하시겠습니까?</span>
              <span className="small">* 포스트 삭제후 복구가 불가합니다.</span>
              <span>Are you sure to delete this post?</span>
              <span className="small">
                You cant' recover the post once it is deleted.
              </span>
              <div className="btn-wrap">
                <Btn name="YES" type="button" onClick={clickYes} />
                <Btn
                  name="NO"
                  type="button"
                  onClick={() => setDelBoard(false)}
                />
              </div>
            </>
          )}
          {confirm && (
            <>
              <IconBtn
                size="1.8rem"
                type="button"
                svgType="close"
                onClick={() => setDelBoard(false)}
              />
              <span>삭제확인을 위해 회원님의 아이디를 입력해주세요.</span>
              <span>Please type the your ID to confirm delete.</span>
              <Form onSubmit={handleSubmit(onValid)}>
                <TitleInput
                  id="userId"
                  type="text"
                  error={errors.userId?.message}
                  register={register('userId', {
                    required: '아이디를 입력해주세요.',
                  })}
                  placeholder="아이디를 입력해주세요."
                />
                {isTyped && (
                  <IconBtn type="submit" svgType="trash" size="2rem" />
                )}
              </Form>
            </>
          )}
          {data?.error && <ErrorMsg error={data?.error} />}
        </Cont>
      )}
      {loading && (
        <LoadingModal
          zIndex={103}
          text={{
            kor: `${loggedInUser?.username}님의 보드 삭제중...`,
            eng: `Deleting ${loggedInUser?.username}'s board...`,
          }}
        />
      )}
      <DimBackground zIndex={102} onClick={() => setDelBoard(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  z-index: 103;
  align-items: center;
  border: ${(p) => p.theme.border.thin};
  .close {
    top: 5px;
    right: 5px;
    position: absolute;
  }
  svg {
    fill: ${(p) => p.theme.color.font};
    :hover {
      fill: ${(p) => p.theme.color.logo};
    }
  }
  input {
    margin: 0 auto;
  }
`;
