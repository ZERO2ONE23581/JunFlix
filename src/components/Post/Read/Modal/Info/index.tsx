import { Host } from './Host';
import { Detail } from './Detail';
import styled from '@emotion/styled';
import { FlexCol } from '../../../../../../styles/global';
import { variants } from '../../../../../../styles/variants';

export interface IInfo {
  _data: {
    theme: boolean;
    isMyPost: boolean;
    _post: {
      desc: string;
      title: string;
      hashtags: string;
      pageLink: string;
    };
    _host: {
      userId: string;
      host_id: number;
      followers: number;
      avatar: string | null;
    };
  };
}
export const Info = ({ _data }: IInfo) => {
  const theme = _data?.theme!;
  const isMyPost = _data?.isMyPost!;
  const _host = _data?._host!;
  const _post = _data?._post!;
  return (
    <>
      <Cont
        custom={theme}
        className="info"
        animate="animate"
        variants={variants}
      >
        <Host _data={{ theme, _host, isMyPost }} />
        <Detail _post={_post!} />
      </Cont>
    </>
  );
};
const Cont = styled(FlexCol)`
  gap: 20px;
  padding: 30px;
  min-height: 55vh;
  padding-bottom: 0;
  .host,
  .detail,
  .comment_box {
    width: 100%;
  }
`;
