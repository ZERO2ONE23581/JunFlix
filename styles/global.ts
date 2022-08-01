import styled from '@emotion/styled';

export const Page = styled.section`
  padding: 0 5% 5%;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .board-list {
    .board {
      min-height: 440px;
    }
  }
  .post-list {
    .post {
      min-height: 400px;
    }
  }
`;
export const Layout = styled.section`
  min-width: 100vw;
  padding: 10px 8%;
`;
export const Container = styled.article`
  padding: 30px 40px;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
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
  min-width: 330px;
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
export const AnswerModal = styled(Modal)`
  gap: 8px;
  padding: 40px;
  line-height: 20px;
  border: ${(p) => p.theme.border.thin};
  span {
    opacity: 0.9;
    font-size: 1.2rem;
    font-style: italic;
  }
  .small {
    opacity: 0.5;
    font-size: 1.1rem;
  }
  .btn-wrap {
    gap: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    button {
      width: 100%;
      padding: 8px;
      min-width: 100px;
    }
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
  gap: 25px;
  display: grid;
  position: relative;
  grid-template-columns: ${(p) => p.size && `repeat(${p.size}, 1fr)`};
`;
const variant = 'public';
const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
export const AVATAR_URL = (avatar: string) => `${base}/${avatar}/${variant}`;

export const AVATAR_BG = styled.article<{ avatar: string }>`
  border: none;
  overflow: hidden;
  min-height: 440px;
  position: relative;
  background: ${(p) =>
    p.avatar && `url(${AVATAR_URL(p.avatar)}) no-repeat center center `};
  -o-background-size: cover;
  background-size: 100% 100%;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.font};
  .post-list {
    .POST {
      background-color: ${(p) => p.theme.color.bg};
      svg {
        fill: ${(p) => p.theme.color.font};
      }
    }
  }
`;
