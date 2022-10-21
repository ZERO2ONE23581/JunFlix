import styled from '@emotion/styled';
import { Flex, FlexCol } from '../../../../styles/global';
import { variants } from '../../../../styles/variants';
import { useCapLetters } from '../../../libs/client/useTools';
import { TrimText } from '../../../Tools/trimText';
import { Host } from './post_modal_info_host';

interface IDetail {
  post: {
    hash: string;
    link: string;
    title: string;
  };
  desc: string;
}
export const Detail = ({ post, desc }: IDetail) => {
  const hash = post?.hash;
  const link = post?.link;
  const title = post?.title;
  const isHashLink = Boolean(hash || link);
  //
  return (
    <Cont className="detail">
      <h1 className="title">
        <TrimText text={useCapLetters(title)} max={30} />
      </h1>
      <p>
        <TrimText text={desc} max={500} />
      </p>
      {isHashLink && (
        <ul>
          {hash && (
            <li>
              <span className="hash">{hash}</span>
            </li>
          )}
          {link && (
            <li>
              <span>Website:</span>
              <span>{link}</span>
            </li>
          )}
        </ul>
      )}
    </Cont>
  );
};
const Cont = styled(Flex)`
  form {
    height: fit-content;
  }
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    span {
      font-size: 1.4rem;
    }
  }
  p {
    font-size: 1.2rem;
    word-break: break-all;
  }
  ul {
    font-size: 1.05rem;
    font-style: italic;
    li {
      .hash {
        color: ${(p) => p.theme.color.logo};
      }
      span {
        line-height: 15px;
      }
    }
  }
`;
