import { Icons } from '../Icons';
import { QuickSaved } from './QS';
import styled from '@emotion/styled';
import { MyPosts } from './IsMyPosts';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { color } from '../../../../../../styles/variants';
import { useUser } from '../../../../../libs/client/useUser';
import { Flex, Layer_ } from '../../../../../../styles/global';

interface IIconLayer {
  _data: {
    theme: boolean;
    setMax: Dispatch<SetStateAction<number>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const IconLayer = ({ _data }: IIconLayer) => {
  const router = useRouter();
  const { theme, setMax, setFixed } = _data;
  const { user_id: id, username } = useUser();
  const isQuick = Boolean(router.asPath.includes('quick_saved'));
  const onClick = () => router.push(`/user/${id}/${username}/page`);
  return (
    <Cont className="icon_layer">
      <div />
      <div>
        <QuickSaved _data={{ theme, isQuick, onClick }} />
        <MyPosts _data={{ theme, isQuick, onClick }} />
      </div>
      <div>
        <Icons _data={{ theme, setMax, setFixed }} />
      </div>
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 2rem;
  padding: 0 1rem;
  width: fit-content;
`;
export const layerVar = {
  initial: ({ theme, isBig }: any) => ({
    fontSize: isBig ? '1.6rem' : '1rem',
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  animate: ({ theme, isBig }: any) => ({
    fontSize: isBig ? '1.6rem' : '1rem',
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  hover: ({ isBig }: any) => ({
    color: '#E50914',
    transition: { duration: 0.5 },
    fontSize: isBig ? '1.7rem' : '1.1rem',
  }),
};
