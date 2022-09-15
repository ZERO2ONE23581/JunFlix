import styled from '@emotion/styled';
import { useRouter } from 'next/router';

export const Texts = () => {
  const router = useRouter();
  return (
    <>
      <Big>
        <span>"Place for people who love movies."</span>
        <span className="kor">"영화를 사랑하는 사람들을 위한 공간."</span>
      </Big>
      <Small>
        <span>
          JUNFLIX is a social media platform for movie fans. Make your own movie
          <span className="red" onClick={() => router.push(`/boards`)}>
            Board
          </span>
          and share your
          <span className="red" onClick={() => router.push(`/posts`)}>
            Posts
          </span>
          with others!
        </span>
        <span>
          JUNFLIX는 영화인을 위한 소셜미디어 입니다. 여러분만의 영화
          <span className="red" onClick={() => router.push(`/boards`)}>
            보드를
          </span>
          만들고 영화와 관련된 일상
          <span className="red" onClick={() => router.push(`/posts`)}>
            포스트
          </span>
          를 공유하세요!
        </span>
      </Small>
    </>
  );
};

const Big = styled.h1`
  gap: 15px;
  display: flex;
  font-style: italic;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 2.5rem;
  .kor {
    font-size: 2rem;
  }
`;
const Small = styled(Big)`
  gap: 5px;
  margin-top: 30px;
  font-size: 1.4rem;
  span {
    opacity: 1;
  }
  .red {
    opacity: 1;
    margin: 0 10px;
    font-weight: 500;
    font-size: 1.5rem;
    :hover {
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;
      color: ${(p) => p.theme.color.logo};
    }
  }
  .kor {
    font-size: 1.3rem;
  }
  .unspace {
    margin: 0;
  }
`;
