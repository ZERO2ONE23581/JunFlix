import styled from '@emotion/styled';

export const TopLayer = () => {
  return (
    <>
      <Cont>
        <ListWrap>
          <li className="number padding">번호</li>
          <li className="title">제목</li>
          <li className="movie-title">영화제목</li>
          <li className="genre">장르</li>
          <li className="stars">별점</li>
          <li className="author">글쓴이 </li>
          <li className="likes">좋아요</li>
          <li className="comments">댓글</li>
          <li className="created-at">작성일</li>
          <li className="updated-at">수정일</li>
        </ListWrap>
      </Cont>
    </>
  );
};
const Cont = styled.div`
  font-size: 1rem;
  margin: 15px auto;
`;
export const ListWrap = styled.ul`
  display: flex;
  align-items: center;
  border-top: 5px solid #2980b9;
  border-bottom: 5px solid #2980b9;
  li {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    width: 26%;
  }
  .movie-title {
    width: 18%;
  }
  .author {
    width: 8%;
    gap: 10px;
    padding: 0px 10px;
  }
  .genre,
  .stars {
    width: 7.5%;
  }
  .number {
    width: 3%;
  }
  .padding {
    padding-left: 10px;
  }
  .likes,
  .comments {
    width: 5%;
  }
  .created-at,
  .updated-at {
    width: 10%;
  }
`;