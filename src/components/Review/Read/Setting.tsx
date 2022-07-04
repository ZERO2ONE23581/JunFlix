import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Btn } from '../../Style/Button';
import { IconBtn } from '../../Style/Button/IconBtn';
import { DeleteReivew } from '../Delete/DeleteReview';
import { DimBackground, Modal } from '../../../../styles/global';

interface IReviewBtnsProps {}
export const Setting = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const [onSetting, setOnSetting] = useState(false);
  const [delReview, setDelReivew] = useState(false);
  //
  return (
    <>
      <Cont>
        <IconBtn
          type="button"
          svgType="setting"
          onClick={() => setOnSetting((p) => !p)}
        />
        {onSetting && (
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
              onClick={() => setDelReivew(true)}
            />
          </Wrap>
        )}
      </Cont>
      {onSetting && (
        <DimBackground zIndex={99} onClick={() => setOnSetting(false)} />
      )}
      {delReview && <DeleteReivew setDelReivew={setDelReivew} />}
    </>
  );
};
const Cont = styled.article``;
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
