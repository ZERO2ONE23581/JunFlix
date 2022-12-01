import { Host } from './Host';
import { Icons } from './Icons';
import { Detail } from './Detail';
import styled from '@emotion/styled';
import { IGetPostType } from '../../../../../types/post';
import { variants } from '../../../../../../styles/variants';
import { FlexCol } from '../../../../../../styles/global';

interface IInfo extends IGetPostType {
  theme: boolean;
}
export const Info = ({ theme, post }: IInfo) => {
  return (
    <Cont custom={theme} className="info" animate="animate" variants={variants}>
      <Icons theme={theme} post={post} />
      <Host theme={theme} post={post} />
      <Detail post={post} />
    </Cont>
  );
};

const Cont = styled(FlexCol)`
  gap: 20px;
  height: 100%;
  //min-height: 55vh;
  padding-bottom: 0;
  padding: 1rem 1.5rem;
  .host,
  .detail,
  .comment_box {
    width: 100%;
  }
`;
