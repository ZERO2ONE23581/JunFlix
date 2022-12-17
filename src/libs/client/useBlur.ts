import { useUser, useUserPrivate } from './useUser';
import { useBoardPrivate } from './useBoards';
import useFollowUser from './useFollowing/User';
import useFollowingBoard from './useFollowing/Board';

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
