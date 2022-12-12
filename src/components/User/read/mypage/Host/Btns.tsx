import styled from '@emotion/styled';
import { Btn } from '../../../../../Tools/Button';
import { BtnWrap } from '../../../../../../styles/global';

interface IBtns {
  _data: {
    name?: string;
    theme: boolean;
    isMyAcct: boolean;
    onClick: () => void;
    onSetting: () => void;
    isFollowing?: boolean;
  };
}
export const Btns = ({ _data }: IBtns) => {
  const { name, theme, isMyAcct, onClick, onSetting, isFollowing } = _data;
  return (
    <Cont className="btn-wrap">
      {isMyAcct && (
        <Btn type="button" onClick={onSetting} item={{ theme, name: 'Edit' }} />
      )}
      {!isMyAcct && (
        <Btn
          type="button"
          onClick={onClick}
          item={{ theme, name, isFollowing }}
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
