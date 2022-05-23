import {
  BtnCont,
  BtnContDel,
  BtnContInv,
  BtnContInvDel,
  BtnContRevSetup,
  CreateBtn,
  EditBoardBtn,
  IdCheck,
  Logout,
  Theme,
  Toggle,
  YesOrNo,
} from '../../styles/components/btn';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IBtnProps {
  onClick?: any;
  btnName?: string;
  type?: string;
  loading?: boolean;
}

export const Btn = ({ loading, onClick, btnName, type }: IBtnProps) => {
  //
  return (
    <>
      {type === 'submit' && (
        <BtnCont onClick={onClick} type="submit">
          {loading ? 'Loading...' : btnName}
        </BtnCont>
      )}
      {type === 'edit-setting' && (
        <BtnContRevSetup onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </BtnContRevSetup>
      )}
      {type === 'edit-review' && (
        <BtnContInv onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </BtnContInv>
      )}
      {type === 'delete-review' && (
        <BtnContInvDel onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </BtnContInvDel>
      )}
      {type === 'move-to-created-board' && (
        <CreateBtn onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </CreateBtn>
      )}
      {(type === 'board-setting' ||
        type === 'board-edit' ||
        type === 'board-delete' ||
        type === 'post-setting' ||
        type === 'post-edit' ||
        type === 'post-delete') && (
        <EditBoardBtn onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </EditBoardBtn>
      )}
      {type === 'create' && (
        <CreateBtn onClick={onClick} type="button">
          {loading ? 'Loading...' : btnName}
        </CreateBtn>
      )}
      {type === 'button' && (
        <BtnCont type="button" onClick={onClick}>
          {btnName}
        </BtnCont>
      )}
      {type === 'idCheck' && (
        <IdCheck type="button" onClick={onClick}>
          {btnName}
        </IdCheck>
      )}
      {type === 'yesOrno' && (
        <YesOrNo type="button" onClick={onClick}>
          {btnName}
        </YesOrNo>
      )}
      {type === 'logout' && (
        <Logout type="button" onClick={onClick}>
          {btnName}
        </Logout>
      )}
      {type === 'theme' && (
        <Theme type="button" onClick={onClick}>
          {btnName}
        </Theme>
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
