import styled from '@emotion/styled';

export const LayoutPage = styled.section`
  font-weight: 600;
  padding: 10px 10%;
`;
export const Page = styled.section`
  padding: 0 10%;
  font-size: 1.2rem;
  padding-bottom: 20px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;

export const FormCont = styled.article`
  padding: 30px 40px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  h1 {
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
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

export const ModalSchema = styled.article`
  top: 50%;
  left: 50%;
  z-index: 994;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Modal = styled(ModalSchema)`
  padding: 40px;
  border: none;
  border-radius: 10px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-weight: 700;
    font-size: 1.4rem;
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
export const ModalClose = styled.article`
  top: 0;
  left: 0;
  z-index: 992;
  position: absolute;
  width: 100%;
  height: 130vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  background-color: red;
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
export const Grid = styled.article`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
export const ThumnAvatarCont = styled.article`
  overflow: hidden;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;

//
export const PageWithBg = styled(Page)<{
  bg?: string | boolean | null;
}>`
  height: 100vh;
  background-color: black;
  background: ${(p) => p.bg && `url(${p.bg})   center / cover no-repeat`};
`;
