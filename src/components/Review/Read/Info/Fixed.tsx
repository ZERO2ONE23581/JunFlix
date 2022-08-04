import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ConfirmModal } from '../../../Tools/Modal';
import { IconBtn } from '../../../Tools/Button/Icon';
import useUser from '../../../../libs/client/useUser';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';

export const Fixed = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, review_id } = router.query;
  const [onSetting, setOnSetting] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const isMyReview = String(loggedInUser?.id) === user_id;
  const [deleteReview, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/review/${review_id}/delete`
  );
  const clickDelReview = () => {
    if (!isMyReview) alert('삭제권한이 없습니다.');
    deleteReview({});
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.replace('/all/reviews');
    }
  }, [data, router]);
  return (
    <Cont>
      <IconBtn
        size="2.5rem"
        type="button"
        svgType="compass"
        onClick={() => router.push(`/all/reviews`)}
      />
      {isMyReview && (
        <>
          <IconBtn
            size="2.5rem"
            type="button"
            svgType="setting"
            onClick={() => setOnSetting((p) => !p)}
          />
          {onSetting && (
            <>
              <Wrap>
                <IconBtn
                  type="button"
                  size="2.5rem"
                  svgType="edit-board"
                  onClick={() =>
                    router.push(`/user/${user_id}/review/${review_id}/edit`)
                  }
                />
                <IconBtn
                  type="button"
                  size="2.5rem"
                  svgType="trash"
                  onClick={() => setDelModal(true)}
                />
              </Wrap>
            </>
          )}
          {delModal && (
            <ConfirmModal
              loading={loading}
              type="delete-review"
              closeModal={setDelModal}
              clickDelReview={clickDelReview}
            />
          )}
        </>
      )}
    </Cont>
  );
};
const Cont = styled.div`
  top: 100px;
  right: -80px;
  position: absolute;
  gap: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Wrap = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
