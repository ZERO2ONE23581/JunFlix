import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ModalClose } from '../../../../../styles/global';
import useUser from '../../../../libs/client/useUser';
import { Btn } from '../../../Style/Button';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { DeleteReivew } from '../Delete/DeleteReview';

interface IReviewBtnsProps {}
export const Setting = ({}: IReviewBtnsProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
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
              name="리뷰삭제"
              type="button"
              onClick={() =>
                router.push(`/user/${user_id}/review/${review_id}/edit`)
              }
            />
          </Wrap>
        )}
      </Cont>
      {onSetting && <ModalClose onClick={() => setOnSetting(false)} />}
      {delReview && <DeleteReivew setDelReivew={setDelReivew} />}
    </>
  );
};
const Cont = styled.article`
  position: relative;
`;
const Wrap = styled.article`
  position: absolute;
  z-index: 201;
  right: -70%;
  top: 110%;
  //
  display: flex;
  align-items: center;
  flex-direction: column;
  //
  width: 250%;
  overflow: hidden;
  border-radius: 3px;
  button {
    width: 100%;
    border-radius: 0%;
    border-bottom: 1px solid ${(p) => p.theme.color.bg};
  }
`;

const Button = styled.button`
  border: 3px solid blue;
  font-size: 1rem;
  width: 90px;
  height: 40px;
`;
