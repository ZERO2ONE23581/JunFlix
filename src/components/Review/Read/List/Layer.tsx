import styled from '@emotion/styled';

export const Layer = () => {
  return (
    <>
      <Cont>
        <ListWrap>
          <li className="number">번호</li>
          <li className="title">제목</li>
          <li className="author">글쓴이 </li>
          <li className="movie">영화제목</li>
          <li className="genre">장르</li>
          <li className="stars">별점</li>
          <li className="recommend">추천</li>
          <li className="icons">좋아요 · 댓글</li>
          <li className="createdAt date">작성일</li>
          <li className="updatedAt date">수정일</li>
        </ListWrap>
      </Cont>
    </>
  );
};
const Cont = styled.div`
  font-size: 1rem;
  margin: 20px 0;
`;
export const ListWrap = styled.ul`
  display: flex;
  align-items: center;
  border-top: thick double ${(p) => p.theme.color.logo};
  border-bottom: thick double ${(p) => p.theme.color.logo};
  li {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .number {
    width: 3%;
    font-size: 1rem;
  }
  .title {
    width: 16%;
  }
  .author {
    width: 11%;
  }
  .movie {
    width: 15%;
  }
  .genre {
    width: 10%;
  }
  .stars {
    width: 10%;
  }
  .recommend {
    width: 4%;
  }
  .icons {
    width: 10%;
  }
  .date {
    width: 10.5%;
  }
`;
