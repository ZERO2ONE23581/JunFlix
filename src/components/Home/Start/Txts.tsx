import styled from '@emotion/styled';
import { FlexCol } from '../../../../styles/global';

interface ITxts {
  type: string;
}
export const Txts = ({ type }: ITxts) => {
  return (
    <>
      {type === 'main' && (
        <Cont>
          <Main>
            <span className="kor">"영화를 사랑하는 사람들을 위한 공간."</span>
            <span>"Place for people who love movies."</span>
          </Main>

          <span className="kor">
            <span className="red">JUNFLIX </span>는 영화인을 위한
            <span className="bold">소셜 플랫폼 </span>으로서 영화에 대한
            <span className="bold"> 아이디어, 글, 이미지 </span>등을 공유하는
            공간입니다.
          </span>

          <span>
            <span className="red">JUNFLIX </span> is a
            <span className="bold"> social platform </span>
            where people who love movies can share their
            <span className="bold"> ideas, articles and images.</span>
          </span>
        </Cont>
      )}

      {type === 'sub' && (
        <Cont>
          <span className="kor">
            <span>사용자는 </span>
            <span className="bold">
              상영예정작, 현재상영작, TV, 드라마, 고전명작 등
            </span>
            <span> 다양한 영화정보를 얻을 수 있습니다.</span>
          </span>
          <span>
            <span>User can get information such as </span>
            <span className="bold">
              upcoming and now playing movies, tv shows, classic movies
            </span>
          </span>
        </Cont>
      )}
    </>
  );
};

const Cont = styled(FlexCol)`
  color: #b2bec3;
  text-align: center;
  font-style: italic;
  > span {
  }
  .bold {
    color: white;
    margin: 0 0.2rem;
  }
  .red {
    font-weight: 600;
    color: ${(p) => p.theme.color.logo};
  }
`;
const Main = styled(FlexCol)`
  gap: 0.2rem;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
`;
