import { Cont, Delete, Logout, Theme, Toggle } from '../../styles/btnStyle';

interface IBtnProps {
  onClick?: any;
  btnName?: string;
  type?: string;
  loading?: boolean;
}

export const Btn = ({ loading, onClick, btnName, type }: IBtnProps) => {
  return (
    <>
      {type === 'submit' && (
        <Cont onClick={onClick} type="submit">
          {loading ? 'Loading...' : btnName}
        </Cont>
      )}
      {type === 'button' && (
        <Cont type="button" onClick={onClick}>
          {btnName}
        </Cont>
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
        <Delete type="button" onClick={onClick}>
          {btnName}
        </Delete>
      )}
      {type === 'toggle' && (
        <Toggle type="button" onClick={onClick}>
          {btnName}
        </Toggle>
      )}
    </>
  );
};
