import {
  BtnCont,
  BtnContBig,
  BtnContDel,
  BtnContInv,
  BtnContInvDel,
  ReviewSetupBtn,
  BtnContSmall,
  Logout,
  Toggle,
  ReviewBackBtn,
} from '../../../styles/btn';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

interface IBtnProps {
  onClick?: any;
  btnName?: string;
  className?: string;
  type?: string;
  loading?: boolean;
}

export const Btn = ({ loading, onClick, btnName, type }: IBtnProps) => {
  //
  return (
    <>
      {type === 'small' && (
        <PostCmtsBtn onClick={onClick} type="button">
          {btnName}
        </PostCmtsBtn>
      )}
      {type === 'submit' && (
        <BtnCont onClick={onClick} type="submit">
          {loading ? 'Loading...' : btnName}
        </BtnCont>
      )}
      {type === 'register' && (
        <BtnContBig onClick={onClick} type="submit">
          {loading ? 'Loading...' : btnName}
        </BtnContBig>
      )}
      {type === 'idCheck' && (
        <BtnContBig type="button" onClick={onClick}>
          {btnName}
        </BtnContBig>
      )}
      {type === 'edit-setting' && (
        <ReviewSetupBtn onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </ReviewSetupBtn>
      )}
      {(type === 'edit-review' || type === 'edit-post') && (
        <BtnContInv onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </BtnContInv>
      )}
      {(type === 'delete-review' || type === 'delete-post') && (
        <BtnContInvDel onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </BtnContInvDel>
      )}
      {(type === 'back' || type === 'login') && (
        <BtnContSmall onClick={onClick} type="button">
          {btnName}
        </BtnContSmall>
      )}
      {type === 'review-back-btn' && (
        <ReviewBackBtn onClick={onClick} type="button">
          {btnName}
        </ReviewBackBtn>
      )}
      {(type === 'move-to-created-board' ||
        type === 'board-setting' ||
        type === 'board-edit' ||
        type === 'board-delete' ||
        type === 'post-setting' ||
        type === 'post-edit' ||
        type === 'post-delete' ||
        type === 'create' ||
        type === 'yesOrno') && (
        <BtnContSmall onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </BtnContSmall>
      )}
      {type === 'button' && (
        <BtnCont type="button" onClick={onClick}>
          {btnName}
        </BtnCont>
      )}
      {type === 'logout' && (
        <Logout type="button" onClick={onClick}>
          {btnName}
        </Logout>
      )}
      {type === 'theme' && (
        <BtnContSmall type="button" onClick={onClick}>
          {btnName}
        </BtnContSmall>
      )}
      {type === 'delete' && (
        <BtnContDel type="button" onClick={onClick}>
          {loading ? 'Loading...' : btnName}
        </BtnContDel>
      )}
      {type === 'toggle' && (
        <Toggle type="button" onClick={onClick}>
          <FontAwesomeIcon style={{ fontSize: 30 }} icon={faXmark} />
        </Toggle>
      )}
    </>
  );
};
const PostCmtsBtn = styled(BtnCont)`
  width: 60px;
`;
