import styled from '@emotion/styled';
import { FlexCol_ } from './global';

export const MobModal = styled(FlexCol_)`
  form {
    width: 100%;
  }
  .modal {
    justify-content: flex-start;
    top: ${(p) => p.isDesk && '10vh'};
    width: ${(p) => (p.isDesk ? '500px' : '100%')};
    height: ${(p) => (p.isDesk ? '600px' : '100%')};
    padding: ${(p) => (p.isDesk ? '1rem 2rem' : '2rem 2rem 4rem')};
    .inps {
      gap: ${(p) => (p.isDesk ? '1rem' : '2rem')};
    }
    .hide_cmt {
      font-size: ${(p) => (p.isDesk ? '1rem' : '2.2rem')};
    }
  }
  .avatar {
    width: ${(p) => (p.isDesk ? '4rem' : '7rem')};
    height: ${(p) => (p.isDesk ? '4rem' : '7rem')};
  }
  .textarea-wrap {
    width: ${(p) => (p.isDesk ? 'fit-content' : '75%')};
    textarea {
      font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.4rem')};
    }
  }
  .layer {
    width: 100%;
    margin-bottom: ${(p) => !p.isDesk && '2rem'};
    .comments {
      width: ${(p) => (p.isDesk ? '2rem' : '5rem')};
      height: ${(p) => (p.isDesk ? '2rem' : '5rem')};
    }
    .close_ {
      width: ${(p) => (p.isDesk ? '2rem' : '4rem')};
      height: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    }
    .reply {
      width: ${(p) => (p.isDesk ? '2rem' : '4rem')};
      height: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    }
    h1 {
      font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
    }
  }
`;
