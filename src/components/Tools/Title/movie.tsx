interface IMovie {
  type: string;
}
export const Movie = ({ type }: IMovie) => {
  return (
    <>
      {type === 'trending' && (
        <>
          <span className="eng">Trending</span>
          <span className="kor">현재인기</span>
        </>
      )}
      {type === 'now' && (
        <>
          <span className="eng">Now Playing</span>
          <span className="kor">현재상영작</span>
        </>
      )}
      {type === 'upcoming' && (
        <>
          <span className="eng">Coming Soon</span>
          <span className="kor">개봉예정작</span>
        </>
      )}
      {type === 'tv' && (
        <>
          <span className="eng">TV Shows</span>
          <span className="kor">티비 · 드라마</span>
        </>
      )}
      {type === 'top' && (
        <>
          <span className="eng">Top Rated</span>
          <span className="kor">명작 · 클래식</span>
        </>
      )}
    </>
  );
};
