import { Host } from './Host';
import { Icons } from './Icons';
import { Detail } from './Detail';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../../../types/post';
import { FlexCol } from '../../../../../../../styles/global';
import { noneBorderVar } from '../../../../../../../styles/variants';
import { useResponsive } from '../../../../../../libs/client/useTools';

export interface IInfo {
  _data: {
    theme: boolean;
    post: IPostType;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Info = ({ _data }: IInfo) => {
  const { isDesk } = useResponsive();
  const { post, theme, setCmtModal } = _data;
  return (
    <Cont custom={theme} animate="animate" variants={noneBorderVar}>
      <Icons _data={{ theme, post, setCmtModal, isDesk }} />
      <Host _data={{ theme, post, isDesk }} />
      <Detail post={post} isDesk={isDesk} />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  gap: 20px;
  height: 100%;
  padding-bottom: 0;
  padding: 1.5rem 2rem;
`;
