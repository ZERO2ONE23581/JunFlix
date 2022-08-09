import { Btn } from '../Button';
import styled from '@emotion/styled';
import { IconBtn } from '../Button/Icon';
import { Dispatch, SetStateAction } from 'react';
import { DimBackground, SmallModal } from '../../../../styles/global';

interface IFollowModal {
  type: {
    board?: {
      follow?: boolean;
      unfollow?: boolean;
    };
    user?: {
      name: string;
      follow?: boolean;
      unfollow?: boolean;
    };
  };
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
        {type.board?.follow && (
          <>
            <span>이 보드를 팔로우 하겠습니까?</span>
            <span>Would you like to follow this board?</span>
          </>
        )}
        {type.board?.unfollow && (
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
        {type.user?.follow && (
          <>
            <span>유저를 팔로우 하면 콘텐츠를 열람할 수 있습니다.</span>
            <span>
              <span className="red">{type.user.name}</span> 님을 팔로우
              하겠습니까?
            </span>
            <span>You can see contents by following user.</span>
            <span>
              Would you like to follow
              <span className="red">{type.user.name}</span> ?
            </span>
          </>
        )}
        {type.user?.unfollow && (
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
        {(type.board?.follow || type.user?.follow) && (
          <Btn
            name="Follow"
            type="button"
            CLASSNAME="follow"
            onClick={onClick}
          />
        )}
        {(type.board?.unfollow || type.user?.unfollow) && (
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
  z-index: 2;
  align-items: center;
  .follow {
    width: 200px;
    margin-top: 12px;
  }
`;
