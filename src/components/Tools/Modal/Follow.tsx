import { Btn } from '../Button';
import styled from '@emotion/styled';
import { IconBtn } from '../Button/Icon';
import { Dispatch, SetStateAction } from 'react';
import { DimBackground, SmallModal } from '../../../../styles/global';

interface IFollowModal {
  type: string;
  onClick: any;
  closeModal?: Dispatch<SetStateAction<boolean>>;
}
export const FollowModal = ({ type, closeModal, onClick }: IFollowModal) => {
  return (
    <>
      <Cont>
        <IconBtn
          size="2rem"
          type="button"
          svgType="close"
          onClick={() => closeModal!(false)}
        />
        {type === 'follow' && (
          <>
            <span>이 보드를 팔로우 하겠습니까?</span>
            <span>Would you like to follow this board?</span>
          </>
        )}
        {type === 'unfollow' && (
          <>
            <span>이 보드를 팔로우를 취소 하겠습니까?</span>
            <span className="small">
              팔로우를 취소하면 이 보드의 포스트를 더이상 볼 수 없습니다.
            </span>
            <span>Would you like to unfollow this board?</span>
            <span className="small">
              You are no longer able to see the posts of this board if you
              unfollow.
            </span>
          </>
        )}
        {type === 'follow' && (
          <Btn
            name="Follow"
            type="button"
            CLASSNAME="follow"
            onClick={onClick}
          />
        )}
        {type === 'unfollow' && (
          <Btn
            type="button"
            name="Unfollow"
            CLASSNAME="follow"
            onClick={onClick}
          />
        )}
      </Cont>
      <DimBackground zIndex={1} onClick={() => closeModal!(false)} />
    </>
  );
};
const Cont = styled(SmallModal)`
  align-items: center;
  .follow {
    width: 200px;
    margin-top: 12px;
  }
`;
