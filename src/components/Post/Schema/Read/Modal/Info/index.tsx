import { Host } from './Host';
import styled from '@emotion/styled';
import { Icons } from './Icons';
import { Detail } from './Detail';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../../../types/post';
import { FlexCol } from '../../../../../../../styles/global';
import { variants } from '../../../../../../../styles/variants';

export interface IInfo {
  _data: {
    theme: boolean;
    post: IPostType;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const Info = ({ _data }: IInfo) => {
  const { post, theme, setCmtModal } = _data;
  return (
    <Cont custom={theme} animate="animate" variants={variants}>
      <Icons _data={{ theme, post, setCmtModal }} />
      <Host theme={theme} post={post} />
      <Detail post={post} />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  gap: 20px;
  height: 100%;
  padding-bottom: 0;
  padding: 1rem 1.5rem;
`;
