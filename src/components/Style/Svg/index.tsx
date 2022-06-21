import styled from '@emotion/styled';

export const CommentIcon = ({ empty, solid }: any) => {
  return (
    <Cont>
      <svg
        className={empty ? 'empty' : solid && null}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" />
      </svg>
    </Cont>
  );
};
export const LikesIcon = ({ empty, solid }: any) => {
  return (
    <Cont likes solid={solid}>
      <svg
        className={empty ? 'empty' : solid && null}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
      </svg>
    </Cont>
  );
};
export const IsMyIcon = () => {
  return (
    <IsMyCont xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M458.622 255.92l45.985-45.005c13.708-12.977 7.316-36.039-10.664-40.339l-62.65-15.99 17.661-62.015c4.991-17.838-11.829-34.663-29.661-29.671l-61.994 17.667-15.984-62.671C337.085.197 313.765-6.276 300.99 7.228L256 53.57 211.011 7.229c-12.63-13.351-36.047-7.234-40.325 10.668l-15.984 62.671-61.995-17.667C74.87 57.907 58.056 74.738 63.046 92.572l17.661 62.015-62.65 15.99C.069 174.878-6.31 197.944 7.392 210.915l45.985 45.005-45.985 45.004c-13.708 12.977-7.316 36.039 10.664 40.339l62.65 15.99-17.661 62.015c-4.991 17.838 11.829 34.663 29.661 29.671l61.994-17.667 15.984 62.671c4.439 18.575 27.696 24.018 40.325 10.668L256 458.61l44.989 46.001c12.5 13.488 35.987 7.486 40.325-10.668l15.984-62.671 61.994 17.667c17.836 4.994 34.651-11.837 29.661-29.671l-17.661-62.015 62.65-15.99c17.987-4.302 24.366-27.367 10.664-40.339l-45.984-45.004z" />
    </IsMyCont>
  );
};
const IsMyCont = styled.svg`
  width: 20px;
  height: 20px;
  fill: #2ecc71;
`;

const Cont = styled.div<{ list?: boolean; likes?: boolean; solid?: boolean }>`
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
    fill: ${(p) => (p.likes && p.solid ? 'red' : p.theme.color.font)};
  }
  .empty {
    opacity: 0.5;
  }
`;
