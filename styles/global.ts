import styled from '@emotion/styled';

export const LayoutPage = styled.section`
  font-weight: 600;
  padding: 10px 10%;
`;
export const Page = styled.section`
  min-width: 100vw;
  min-height: 100vh;
  padding: 0 10%;
  font-size: 1.2rem;
  padding-bottom: 20px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const FormCont = styled.article`
  border: none;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
export const BoardFormCont = styled(FormCont)`
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const JoinCont = styled(FormCont)`
  h2,
  h3 {
    opacity: 0.8;
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
  h3 {
    opacity: 0.6;
    font-size: 1.3rem;
  }
`;
export const FindCont = styled(JoinCont)``;

export const Form = styled.form`
  gap: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  h3 {
    opacity: 0.8;
    font-weight: 400;
    font-size: 1.2rem;
  }
  .flex {
    gap: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    button {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
`;
export const Info = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
  span {
    display: block;
    margin-bottom: 5px;
  }
`;
export const ModalSchema = styled.article<{ zIndex?: number }>`
  z-index: ${(p) => (p.zIndex ? p.zIndex : '200')};
  top: 50%;
  left: 50%;
  overflow: hidden;
  border-radius: 5px;
  position: absolute;
  transform: translate(-50%, -50%);
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Modal = styled(ModalSchema)<{ zIndex?: number }>`
  z-index: ${(p) => (p.zIndex ? p.zIndex : '200')};
  gap: 20px;
  border: none;
  display: flex;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #353b48;
  h1 {
    font-weight: 700;
    font-size: 1.3rem;
  }
  h2 {
    opacity: 0.8;
    font-weight: 600;
    font-size: 1.2rem;
  }
  .btn-wrap {
    gap: 12px;
    display: flex;
    align-items: center;
    button {
      padding: 5px;
      font-weight: 600;
      min-height: 30px;
      min-width: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export const ModalClose = styled.article<{ zIndex?: number }>`
  z-index: ${(p) => (p.zIndex ? p.zIndex : '100')};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
`;
export const ListCont = styled.section`
  h1 {
    margin: 20px;
    font-weight: 700;
    font-size: 1.4rem;
    margin-left: 20px;
    color: ${(p) => p.theme.color.logo};
  }
`;
export const Grid = styled.article<{ size: number }>`
  gap: 20px;
  display: grid;
  grid-template-columns: ${(p) => p.size && `repeat(${p.size}, 1fr)`};
`;
export const ListAvatar = styled.article<{ isAvatar?: boolean }>`
  cursor: pointer;
  overflow: hidden;
  border-radius: 3px;
  position: relative;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-right: ${(p) => !p.isAvatar && p.theme.border};
  border-bottom: ${(p) => !p.isAvatar && p.theme.border};
  .thumnail-avatar {
    height: 300px;
  }
`;

export const ListAvatarInsideBoard = styled(ListAvatar)`
  border-radius: 5px;
  .thumnail-avatar {
    /* height: 400px; */
  }
`;
export const PageWithBg = styled(Page)<{
  bg?: string | boolean | null;
}>`
  height: 100vh;
  background-color: black;
  background: ${(p) => p.bg && `url(${p.bg})   center / cover no-repeat`};
`;
