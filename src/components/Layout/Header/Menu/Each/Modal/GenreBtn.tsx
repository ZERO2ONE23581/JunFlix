interface IGenreBoardModalBtn {
  handleClick: (btnType: string) => void;
}
export const GenreBoardModalBtn = ({ handleClick }: IGenreBoardModalBtn) => {
  return (
    <>
      <li onClick={() => handleClick('sf')}>
        <span>SF</span>
      </li>
      <li onClick={() => handleClick('action')}>
        <span>Action</span>
      </li>
      <li onClick={() => handleClick('drama')}>
        <span>Drama</span>
      </li>
      <li onClick={() => handleClick('horror')}>
        <span>Horror</span>
      </li>
      <li onClick={() => handleClick('thriller')}>
        <span>Thriller</span>
      </li>
      <li onClick={() => handleClick('mystery')}>
        <span>Mystery</span>
      </li>
      <li onClick={() => handleClick('comedy')}>
        <span>Comedy</span>
      </li>
      <li onClick={() => handleClick('fantasy')}>
        <span>Fantasy</span>
      </li>
      <li onClick={() => handleClick('adventure')}>
        <span>Adventure</span>
      </li>
    </>
  );
};
