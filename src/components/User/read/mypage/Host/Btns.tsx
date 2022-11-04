import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Btn } from '../../../../../Tools/Button';
import { Avatar } from '../../../../../Tools/Avatar';
import { IUserType } from '../../../../../types/user';
import { ITheme } from '../../../../../../styles/theme';
import { BtnWrap } from '../../../../../../styles/global';
import useFollow from '../../../../../libs/client/useFollow';

interface IBtns {
  _data: {
    host_id: number;
    theme: boolean;
    isMyAcct: boolean;
    onEdit: () => void;
  };
}
export const Btns = ({ _data }: IBtns) => {
  const { theme, host_id, isMyAcct, onEdit } = _data;
  const { onClick, name, isFollowing } = useFollow(host_id, 'user');
  return (
    <Cont className="btn-wrap">
      {isMyAcct && (
        <Btn type="button" onClick={onEdit} item={{ theme, name: 'Edit' }} />
      )}
      {!isMyAcct && (
        <Btn
          type="button"
          onClick={onClick}
          item={{ theme, name, isFollowing, className: 'follow-btn' }}
        />
      )}
      <Btn
        type="button"
        onClick={() => alert('sns!')}
        item={{ theme, name: 'Share' }}
      />
    </Cont>
  );
};
const Cont = styled(BtnWrap)`
  width: fit-content;
  button {
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
  }
`;
