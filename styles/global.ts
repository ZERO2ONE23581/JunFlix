import styled from '@emotion/styled';

export const LayoutPage = styled.section`
  font-weight: 600;
  padding: 1% 12%;
`;
export const Page = styled.section`
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  padding: 0% 10%;
  padding-bottom: 5%;
  font-size: 1.2rem;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Container = styled.article`
  border: none;
  padding: 30px 40px;
  border-radius: 3px;
  color: ${(p) => p.theme.color.font};
  /* border: ${(p) => p.theme.border.thin}; */
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
export const JoinCont = styled(Container)`
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
export const Form = styled.form`
  gap: 20px;
  display: flex;
  flex-direction: column;
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
  font-size: 1rem;
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
  span {
    display: block;
    margin-bottom: 5px;
  }
`;
export const Modal = styled.article`
  min-width: 330px;
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  //
  padding: 30px;
  overflow: hidden;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  .btn-wrap {
    gap: 1em;
    display: flex;
    align-items: center;
    width: 100%;
    button {
      min-width: 100px;
      width: 100%;
      padding: 5px;
    }
  }
  .wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
export const AnswerModal = styled(Modal)`
  gap: 8px;
  padding: 40px;
  line-height: 22px;
  text-align: center;
  align-items: flex-start;
  li {
    span {
      opacity: 0.8;
      font-size: 1.2rem;
      font-style: italic;
    }
  }
  .eng {
    margin-bottom: 10px;
  }
`;

export const DimBackground = styled.article<{ zIndex: number }>`
  z-index: ${(p) => (p.zIndex ? p.zIndex : '99')};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #ffeaa7;
  background-color: rgba(0, 0, 0, 0.8);
`;
export const Grid = styled.article<{ size: number }>`
  gap: 25px;
  display: grid;
  position: relative;
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
const variant = 'public';
const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
export const AVATAR_URL = (avatar: string) => `${base}/${avatar}/${variant}`;
export const AVATAR_BG = styled.article<{ avatar: string }>`
  overflow: hidden;
  position: relative;
  background-color: black;
  border-right: ${(p) => !p.avatar && p.theme.border.thin};
  border-bottom: ${(p) => !p.avatar && p.theme.border.thin};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background: ${(p) =>
    p.avatar && `url(${AVATAR_URL(p.avatar)}) no-repeat center center `};
  background-size: 100% 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  /* background-size: cover; */
`;
