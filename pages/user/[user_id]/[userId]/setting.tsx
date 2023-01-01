import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { IPage } from '../../../_app';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../src/Tools/Svg';
import { BG, Flex } from '../../../../styles/global';
import { Head_ } from '../../../../src/Tools/Title/Head';
import { BoxType } from '../../../../src/components/User/Update/BoxType';
import { useResponsive } from '../../../../src/libs/client/useTools';
import { useLogin, useValidHost } from '../../../../src/libs/client/useLogin';

const UserSetting: NextPage<IPage> = ({ theme }) => {
  useLogin();
  useValidHost('user_setting');
  const { isDesk } = useResponsive();
  const [page, setPage] = useState(0);
  const [type, setType] = useState('');
  const size = isDesk ? '2rem' : '4rem';
  const [back, setBack] = useState(false);
  const array = ['avatar', 'email', 'password', 'userInfo', 'delete'];
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
  useEffect(() => {
    setType(`${array[page]}`);
  }, [setType, page, array]);
  return (
    <>
      <Head_ title="프로필 편집" />
      <Cont isDesk={isDesk}>
        <Slider className="slider">
          <Svg
            theme={theme}
            item={{ size }}
            type="left-chev"
            onClick={() => clickArrow('left')}
          />
          <BoxType _data={{ page, back, type, theme }} />
          <Svg
            theme={theme}
            item={{ size }}
            type="right-chev"
            onClick={() => clickArrow('right')}
          />
        </Slider>
      </Cont>
    </>
  );
};
export default UserSetting;

const Cont = styled(BG)`
  height: 100vh;
  max-height: 166vh;
  position: relative;
  .box {
    .slider {
      top: 40vh;
      top: ${(p) => (p.isDesk ? '0vh' : '40vh')};
    }
    form {
      .flex {
        align-items: flex-start;
      }
      button {
        font-size: ${(p) => (p.isDesk ? '1.2rem' : '3rem')};
      }
    }
  }
`;
const Slider = styled(Flex)`
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  position: fixed;
  min-width: 700px;
  min-height: 500px;
  width: fit-content;
  height: fit-content;
  justify-content: space-between;
  .left-chev,
  .right-chev {
    z-index: 111;
  }
`;
