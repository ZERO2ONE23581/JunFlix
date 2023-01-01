import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { Flex_ } from '../../../../styles/global';

interface IBtns {
  _data: {
    name?: string;
    theme: boolean;
    isDesk: boolean;
    isMyAcct: boolean;
    onClick: () => void;
    onSetting: () => void;
    isFollowing?: boolean;
  };
}
export const Btns = ({ _data }: IBtns) => {
  const { isDesk, name, theme, isMyAcct, onClick, onSetting, isFollowing } =
    _data;
  return (
    <Cont isDesk={isDesk} className="btn-wrap">
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
const Cont = styled(Flex_)`
  gap: 1.2rem;
  width: fit-content;
  button {
    width: fit-content;
    border-radius: 30px;
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.4rem')};
    padding: ${(p) => (p.isDesk ? '0.5rem 1rem' : '0.6rem 1.1rem')};
  }
`;
