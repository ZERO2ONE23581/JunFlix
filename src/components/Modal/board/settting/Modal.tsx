import styled from '@emotion/styled';
import { Btn } from '../../../Btn';

interface ISettingModalProps {
  editClick: () => void | any;
  deleteClick: () => void | any;
  edit: boolean;
}
export const SettingModal = ({ editClick, deleteClick, edit }: any) => {
  //
  return (
    <>
      <NavCont>
        <Wrapper>
          <li>
            <Btn
              type="yesOrno"
              onClick={editClick}
              btnName={edit ? 'Back' : 'Edit Board'}
            />
          </li>
          <li>
            <Btn type="delete" btnName="Delete" onClick={deleteClick} />
          </li>
        </Wrapper>
      </NavCont>
    </>
  );
};
const NavCont = styled.nav`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding-bottom: 3px;
  border-radius: 5px;
  position: absolute;
  z-index: 999;
  top: 200px;
  right: 200px;
  width: 100%;
`;
const Wrapper = styled.ul`
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  li {
    padding: 10px;
    width: 100%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.color.bg};
    color: ${(p) => p.theme.color.font};
    &:hover {
      background-color: ${(p) => p.theme.color.font};
      color: ${(p) => p.theme.color.bg};
      a,
      button {
        color: ${(p) => p.theme.color.logo};
      }
    }
    a,
    button {
      font-size: 1rem;
    }
  }
`;
