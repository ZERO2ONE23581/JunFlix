import { useBoardPrivate } from './useBoards';
import useFollowUser from './useFollow/user';
import { useUser, useUserPrivate } from './useUser';
import useFollowingBoard from './useFollow/board';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const [desk, setDesk] = useState(false);
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery({
    query: '(min-width : 350px) and (max-width : 500px)',
  });
  const isDesk = useMediaQuery({
    query: '(min-width : 500px)',
  });
  useEffect(() => {
    if (isDesk) setDesk(true);
    if (isMobile) setMobile(true);
  }, [setMobile, isMobile, setDesk, isDesk]);
  return { isMobile: !desk && mobile, isDesk: desk && !mobile };
};

export const UseUploadImg = async (image: FileList | undefined) => {
  if (image && image.length > 0) {
    const { uploadURL } = await (await fetch(`/api/file`)).json();
    const form = new FormData();
    form.append('file', image[0]);
    const {
      result: { id },
    } = await (await fetch(uploadURL, { method: 'POST', body: form })).json();
    return id;
  }
};
export const UseCapLetters = (word: string) => {
  return word?.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
export const UseCapLetter = (word: string) => {
  return `${
    word?.toString()?.slice(0, 1).toUpperCase() + word?.toString().slice(1)
  }`;
};
export const UseLength = (text: string) =>
  String(text).replace(/\s/gi, '').length;
export interface IDate {
  createdAt: Date;
  updatedAt: Date;
}
export const useTimeDiff = ({ createdAt, updatedAt }: IDate) => {
  const today = new Date().getTime();
  const start = new Date(createdAt).getTime();
  const update = new Date(updatedAt).getTime();
  const diff =
    start === update ? Math.abs(today - start) : Math.abs(today - update);
  const getSec = (time: number) => time / 1000;
  const getMin = (time: number) => time / (1000 * 60);
  const getHour = (time: number) => time / (1000 * 60 * 60);
  const getDay = (time: number) => time / (1000 * 60 * 60 * 24);
  const getTime = () => {
    const sec = getSec(diff);
    if (sec > 60 * 60 * 24)
      return { time: Math.floor(getDay(diff)), type: 'day' };
    else if (sec > 60 * 60)
      return { time: Math.floor(getHour(diff)), type: 'hour' };
    else if (sec > 60)
      return { time: Math.floor(getMin(diff)), type: 'minute' };
    else return { time: Math.floor(sec), type: 'second' };
  };
  const { time, type } = getTime();
  const isUpdated = Boolean(
    createdAt.toString().slice(0, 20) === updatedAt.toString().slice(0, 20)
  )
    ? ''
    : '(updated)';
  return { isUpdated, time, type };
};

interface IIsBlur {
  host_id: number;
  board_id: number;
}
export const IsBlur = ({ host_id, board_id }: IIsBlur) => {
  const { user_id } = useUser();
  const isMyAcct = Boolean(user_id === host_id);
  const { isFollowing: isUserFollowing } = useFollowUser(host_id);
  const { isFollowing: isBoardFollowing } = useFollowingBoard(board_id);
  const { onPrivate: isUserPrivate } = useUserPrivate(host_id, isMyAcct);
  const { onPrivate: isBoardPrivate } = useBoardPrivate({ host_id, board_id });

  if (isMyAcct) return { isBlur: false, msg: 'my_post' };
  if (isUserPrivate) {
    if (!isUserFollowing) return { isBlur: true, msg: 'blur_user' };
    else if (isBoardPrivate && !isBoardFollowing)
      return { isBlur: true, msg: 'blur_board' };
  }
  const isPublic = !isUserPrivate;
  if (isPublic) {
    if (isBoardPrivate && !isBoardFollowing)
      return { isBlur: true, msg: 'blur_board' };
  } else return { isBlur: false, msg: '' };
};

interface IUseModalFixed {
  modal: boolean;
  restrict?: boolean;
  setFixed: Dispatch<SetStateAction<boolean>>;
}
export const useModalFixed = ({
  modal,
  setFixed,
  restrict,
}: IUseModalFixed) => {
  useEffect(() => {
    if (restrict) return;
    if (modal) setFixed(true);
  }, [modal, setFixed, restrict]);
};
