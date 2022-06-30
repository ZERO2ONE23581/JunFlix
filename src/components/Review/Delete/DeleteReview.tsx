import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Svg } from '../../Style/Svg/Svg';
import useUser from '../../../libs/client/useUser';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Info, Modal, DimBackground } from '../../../../styles/global';

interface IDeleteReviewProps {
  setDelReivew: Dispatch<SetStateAction<boolean>>;
}
export const DeleteReivew = ({ setDelReivew }: IDeleteReviewProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const isMyBoard = Boolean(String(loggedInUser?.id) === user_id);
  const [DeleteBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/delete`
  );
  const clickYes = () => {
    if (!isMyBoard) alert('삭제권한이 없습니다.');
    DeleteBoard({});
  };
  useEffect(() => {
    if (data?.ok) {
      alert('리뷰가 삭제되었습니다.');
      router.replace('/user/all/reviews');
    }
  }, [data, router]);
  return (
    <>
      <Cont>
        {!loading && (
          <>
            <h1>이 리뷰를 삭제 하시겠습니까?</h1>
            <h2>삭제시 복구가 불가합니다.</h2>
            <Notice>
              <span>Are you sure to delete this board?</span>
              <span>You cant' recover the board once it is deleted.</span>
            </Notice>
            <div className="btn-wrap">
              <Btn name="YES" type="button" onClick={clickYes} />
              <Btn
                name="NO"
                type="button"
                onClick={() => setDelReivew(false)}
              />
            </div>
          </>
        )}
        {loading && (
          <>
            <h1>리뷰 삭제중...</h1>
            <h2>Deleting Review...</h2>
            <Svg type="loading" />
          </>
        )}
      </Cont>
      <DimBackground zIndex={202} onClick={() => setDelReivew(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  gap: 12px;
  width: 60%;
  z-index: 203;
  min-height: 240px;
  padding: 20px;
  border: 1px solid #353b48;
`;
const Notice = styled(Info)`
  font-size: 1.2rem;
  text-align: center;
`;
