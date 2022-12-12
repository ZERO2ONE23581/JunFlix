import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../src/Tools/Svg';
import { Head_ } from '../../../../src/Tools/head_title';
import { Flex, FlexPage } from '../../../../styles/global';
import { BoxType } from '../../../../src/components/User/Update';

const UserSetting: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [page, setPage] = useState(0);
  const [back, setBack] = useState(false);
  const clickArrow = (type: string) => {
    if (type === 'right') {
      setBack(true);
      setPage((prev) => (prev === 4 ? 0 : prev + 1));
    }
    if (type === 'left') {
      setBack(false);
      setPage((prev) => (prev === 0 ? 4 : prev - 1));
    }
  };
  //
  const [type, setType] = useState('');
  const array = ['email', 'password', 'userInfo', 'avatar', 'delete'];
  useEffect(() => {
    setType(`${array[page]}`);
  }, [setType, page, array]);
  return (
    <>
      <Head_ title="프로필 편집" />
      <FlexPage>
        <Slider>
          <Svg
            theme={theme}
            type="left-chev"
            onClick={() => clickArrow('left')}
          />
          <BoxType _data={{ page, back, type, theme }} />
          <Svg
            theme={theme}
            type="right-chev"
            onClick={() => clickArrow('right')}
          />
        </Slider>
      </FlexPage>
    </>
  );
};
export default UserSetting;

const Slider = styled(Flex)`
  min-width: 700px;
  position: relative;
  width: fit-content;
  height: fit-content;
  justify-content: space-between;
  .left-chev,
  .right-chev {
    z-index: 111;
  }
`;