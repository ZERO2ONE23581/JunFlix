import styled from '@emotion/styled';

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  font-style: italic;
`;
export const H2 = styled.h2`
  margin: 20px auto;
  font-weight: 500;
  font-size: 1.4rem;
  text-align: center;
  color: blue;
`;

export const BodyBg = styled.div`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  position: absolute;
  top: 0;
  left: 0;
  z-index: -999;
  width: 100vw;
  height: 100vh;
`;
export const Fullheight = styled.section`
  height: 100vh;
`;
export const PageCont = styled.section`
  padding: 20px 70px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  section {
    margin: 0 auto;
  }
  .create-post-cont {
    width: 500px;
  }
  .read-post-cont {
    width: 500px;
    .btn-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 13px;
      width: 200px;
    }
  }
`;
export const BoardPageCont = styled(PageCont)`
  .wrap {
    gap: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      font-weight: 700;
      font-size: 1.5rem;
      text-align: center;
      font-style: italic;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
export const MoviePageCont = styled(PageCont)`
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 12px;
  }
`;
export const PageSection = styled.section`
  padding: 100px 200px;
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
  .form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

export const PageSectionWide = styled(PageCont)`
  padding: 10px;
`;

export const Article = styled.article`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  justify-content: center;
  align-content: center;
  border-radius: 8px;
  display: flex;
  padding: 20px;
`;
export const ReviewArticle = styled(Article)`
  position: relative;
`;
export const HomeArticle = styled(Article)`
  flex-direction: column;
  gap: 20px;
  h1 {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }
`;

export const Form = styled.form`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px 25px;
  display: flex;
  width: 330px;
`;
export const ReviewForm = styled(Form)`
  width: 100%;
`;
export const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  width: 200px;
`;
export const FlexAbsolute = styled(Flex)`
  position: absolute;
  top: 60px;
  right: 90px;
`;
export const FlexAbsPost = styled(Flex)`
  position: absolute;
  top: 0;
  left: 190px;
`;

export const ErrMsg = styled.span`
  background-color: inherit;
  text-align: center;
  color: red;
  font-style: italic;
  font-size: 0.8rem;
  margin: 10px auto;
`;
export const OkMsg = styled(ErrMsg)`
  color: #2ecc71;
`;
export const DataResult = styled.div`
  background-color: inherit;
  text-align: center;
  margin-bottom: 5px;
`;

export const InputCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-size: 0.8em;
    margin-bottom: 5px;
  }
  select,
  input {
    background-color: ${(p) => p.theme.color.bg};
    box-shadow: ${(p) => p.theme.boxShadow.input};
    color: ${(p) => p.theme.color.font};
    border: ${(p) => p.theme.border};
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    &::placeholder {
      color: ${(p) => p.theme.color.font};
      font-style: italic;
    }
    &:focus {
      outline: 2px solid ${(p) => p.theme.color.font};
    }
  }
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Layer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
