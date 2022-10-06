import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IData } from '../../../../types/global';
import { ConfirmModal } from '../../../../Tools/Modal';
import useUser from '../../../../libs/client/useUser';
import useMutation from '../../../../libs/client/useMutation';
import { Svg } from '../../../../Tools/Svg';

export const Fixed = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, review_id } = router.query;
  const [onSetting, setOnSetting] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const isMyReview = String(loggedInUser?.id) === user_id;
  const [deleteReview, { data, loading }] = useMutation<IData>(
    `/api/user/${user_id}/review/${review_id}/delete`
  );
  const clickDelReview = () => {
    if (!isMyReview) alert('삭제권한이 없습니다.');
    deleteReview({});
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.replace('/reviews');
    }
  }, [data, router]);
  return (
    <Cont>
      <Svg
        size="2.5rem"
        type="compass"
        onClick={() => router.push(`/reviews`)}
      />
      {isMyReview && (
        <>
          <Svg
            size="2.5rem"
            type="setting"
            onClick={() => setOnSetting((p) => !p)}
          />
          {onSetting && (
            <>
              <Wrap>
                <Svg
                  size="2.5rem"
                  type="edit-board"
                  onClick={() =>
                    router.push(`/user/${user_id}/review/${review_id}/edit`)
                  }
                />
                <Svg
                  size="2.5rem"
                  type="trash"
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
