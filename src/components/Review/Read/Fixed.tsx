import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Tools/Button';
import useUser from '../../../libs/client/useUser';
import { IconBtn } from '../../Tools/Button/IconBtn';
import { DeleteReivew } from '../../Tools/Modal/delete_review_modal';
import { DimBackground, Modal } from '../../../../styles/global';

export const Fixed = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, review_id } = router.query;
  const [onSetting, setOnSetting] = useState(false);
  const [delReview, setDelReivew] = useState(false);
  const isMyReview = String(loggedInUser?.id) === user_id;
  return (
    <Cont>
      <IconBtn
        size="2.5rem"
        type="button"
        svgType="compass"
        onClick={() => router.push(`/user/all/reviews`)}
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
                <Btn
                  name="리뷰수정"
                  type="button"
                  onClick={() =>
                    router.push(`/user/${user_id}/review/${review_id}/edit`)
                  }
                />
                <Btn
                  CLASSNAME="delete-review-btn"
                  name="리뷰삭제"
                  type="button"
                  onClick={() => {
                    setDelReivew(true);
                    setOnSetting(false);
                  }}
                />
              </Wrap>
              <DimBackground zIndex={99} onClick={() => setOnSetting(false)} />
            </>
          )}
          {delReview && <DeleteReivew setDelReivew={setDelReivew} />}
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
const Wrap = styled(Modal)`
  width: 40vw;
  gap: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 3px;
  button {
    width: 100%;
    border-radius: 0%;
    border-bottom: 1px solid ${(p) => p.theme.color.bg};
  }
  .delete-review-btn {
    button {
      border-bottom: none;
    }
  }
`;
