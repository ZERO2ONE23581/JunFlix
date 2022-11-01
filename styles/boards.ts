import { Page } from './global';
import styled from '@emotion/styled';

export const BoardPage = styled(Page)`
  padding: 0 8rem;
  .board-grid {
    .grid-box {
      .board-cover {
        height: 80%;
        img {
          width: 100%;
          max-height: 400px;
          height: fit-content;
          height: 100%;
          //max-height: 500px;
        }
      }
      .info {
        height: 20%;
      }
    }
  }
`;
