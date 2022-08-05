import styled from '@emotion/styled';

export const Page = styled.section`
  padding: 0 6% 10%;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Layout = styled.section`
  min-width: 100vw;
  padding: 10px 8%;
`;
export const Container = styled.article`
  gap: 20px;
  display: flex;
  padding: 30px 40px;
  border-radius: 5px;
  flex-direction: column;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
export const FormCont = styled(Container)`
  gap: 15px;
  display: flex;
  flex-direction: column;
  select,
  input {
    padding: 15px;
  }
`;
export const Form = styled.form`
  gap: 23px;
  display: flex;
  flex-direction: column;
  .flex {
    gap: 12px;
    display: flex;
    align-items: center;
  }
`;
export const Modal = styled.article`
  top: 50%;
  left: 50%;
  z-index: 100;
  position: fixed;
  transform: translate(-50%, -50%);
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: none;
  padding: 30px;
  overflow: hidden;
  font-size: 1.2rem;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
export const SmallModal = styled(Modal)`
  gap: 8px;
  padding: 40px;
  padding-top: 55px;
  line-height: 20px;
  align-items: flex-start;
  border: ${(p) => p.theme.border.thick};
  span {
    font-size: 1.25rem;
    font-style: italic;
  }
  .close {
    top: 7px;
    right: 10px;
    position: absolute;
  }
  .small {
    opacity: 0.7;
    font-size: 1.1rem;
  }
  .red {
    margin-left: 10px;
    color: ${(p) => p.theme.color.logo};
  }
`;
export const BtnWrap = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    width: 100%;
    padding: 5px;
    min-width: 80px;
  }
`;
export const DimBackground = styled.article<{ zIndex: number }>`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #ffeaa7;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: ${(p) => (p.zIndex ? p.zIndex : '99')};
`;
export const Grid = styled.article<{ size: number }>`
  gap: 20px;
  display: grid;
  position: relative;
  grid-template-columns: ${(p) => p.size && `repeat(${p.size}, 1fr)`};
`;
