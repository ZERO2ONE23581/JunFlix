import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IResponsive } from '../types/global';

export const Logo = ({ _res }: IResponsive) => {
  const router = useRouter();
  const { isMobile } = _res;
  return (
    <Cont mobile={isMobile} className="logo" onClick={() => router.push('/')}>
      <Path />
    </Cont>
  );
};
const Path = () => {
  return (
    <PathCont className="svg_path">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1399.000000 393.000000"
      >
        <g
          transform="translate(0.000000,393.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path d="M8378 3904 c-4 -3 -326 -6 -717 -7 l-712 -2 -2 -1526 -2 -1526 244 -7 c134 -4 246 -4 250 -1 3 4 4 304 2 667 l-3 661 388 -7 c214 -4 430 -11 479 -15 50 -5 93 -6 98 -2 4 4 6 126 5 272 l-3 264 -210 0 c-115 0 -333 1 -482 3 l-273 2 0 351 0 351 478 -6 c262 -3 493 -7 512 -8 l35 -3 3 273 2 272 -43 0 c-24 0 -46 -3 -49 -6z" />
          <path d="M5940 3893 l-125 -4 3 -1032 c2 -568 2 -1030 -1 -1027 -6 7 -177 401 -558 1290 l-329 765 -242 3 c-134 1 -269 -1 -300 -5 l-57 -8 -2 -1568 c-1 -862 0 -1569 2 -1572 3 -2 114 4 248 13 l244 17 -1 970 c-1 534 2 1010 6 1058 l7 88 189 -433 c303 -693 715 -1621 723 -1629 8 -8 551 6 559 13 2 2 4 692 4 1533 l2 1530 -124 0 c-67 1 -179 -1 -248 -2z" />
          <path d="M8934 3758 c10 -232 17 -2524 8 -2743 -5 -116 -5 -215 0 -221 4 -6 67 -14 150 -18 383 -18 1008 -68 1212 -97 89 -13 152 -17 157 -12 5 5 8 128 7 284 l-3 274 -120 2 c-147 3 -898 52 -905 60 -3 2 -6 588 -7 1301 l-1 1297 -252 3 -252 2 6 -132z" />
          <path d="M3322 3870 l-132 -5 -3 -1055 c-3 -952 -5 -1065 -20 -1158 -39 -226 -93 -356 -187 -453 -92 -94 -195 -133 -350 -133 -83 0 -103 3 -158 28 -98 45 -162 132 -211 287 -56 175 -56 161 -57 1364 l-2 1110 -244 -4 c-133 -2 -245 -6 -248 -10 -4 -3 -3 -528 1 -1166 6 -1227 6 -1222 54 -1440 57 -259 181 -482 329 -593 114 -87 237 -129 401 -139 224 -13 472 49 647 163 230 148 390 395 472 724 57 231 57 219 66 1390 5 596 6 1088 4 1092 -5 8 -136 8 -362 -2z" />
          <path d="M10828 2253 l3 -1618 250 -29 c137 -16 251 -27 252 -25 1 2 0 742 -3 1644 l-5 1640 -250 3 -250 2 3 -1617z" />
          <path d="M11745 3847 c-3 -6 57 -143 134 -302 251 -525 621 -1326 621 -1345 0 -16 -250 -530 -541 -1112 -148 -298 -266 -545 -261 -550 7 -7 481 -78 524 -78 19 0 47 55 390 770 99 206 183 378 187 383 8 8 115 -232 397 -887 105 -246 196 -452 201 -456 4 -4 73 -20 153 -34 80 -14 201 -37 270 -51 69 -13 128 -21 132 -17 11 11 -358 888 -688 1634 l-153 347 158 323 c159 324 395 818 551 1151 49 105 79 181 74 187 -5 4 -130 10 -277 12 l-268 3 -137 -295 c-220 -471 -386 -820 -392 -820 -3 0 -40 80 -84 178 -43 97 -159 353 -258 568 l-179 391 -187 6 c-283 10 -362 9 -367 -6z" />
          <path d="M801 3831 l-185 -6 5 -200 c2 -110 4 -699 4 -1310 0 -1036 -1 -1117 -19 -1215 -10 -57 -27 -128 -38 -158 -65 -174 -213 -236 -423 -178 -50 13 -93 21 -98 17 -4 -4 -6 -142 -5 -307 l3 -299 55 -19 c41 -14 83 -20 165 -20 134 0 213 18 344 81 82 39 108 58 191 142 159 157 234 310 286 581 14 75 17 252 26 1455 5 754 10 1386 11 1405 l2 35 -70 1 c-38 0 -153 -2 -254 -5z" />
        </g>
      </svg>
    </PathCont>
  );
};
const Cont = styled.div<{ mobile: boolean }>`
  cursor: pointer;
  position: relative;
  .svg_path {
    margin-top: ${(p) => p.mobile && '0.2rem'};
    margin-left: ${(p) => p.mobile && '1.5rem'};
    width: ${(p) => (p.mobile ? '1rem' : '11rem')};
    svg {
      width: ${(p) => (p.mobile ? '17rem' : '8rem')};
      height: ${(p) => (p.mobile ? '17rem' : '8rem')};
    }
  }
`;
const PathCont = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  svg {
    z-index: 999;
    g {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
