import { IPage } from './_app';
import { useState } from 'react';
import type { NextPage } from 'next';
import { Head_ } from '../src/Tools/Title/Head';
import { Start } from '../src/components/Home/Start';
import { useUser } from '../src/libs/client/useUser';
import { LoggedIn } from '../src/components/Home/LoggedIn';

const Home: NextPage<IPage> = ({ theme, setHide, setFixed, mobile }) => {
  const { isLoggedIn } = useUser();
  const [start, setStart] = useState(false);
  const isHide = !isLoggedIn && !start;
  return (
    <>
      <Head_ title="Home" />
      <LoggedIn _data={{ theme, isHide, setFixed, mobile }} />
      <Start _data={{ theme, isHide, setHide, setStart }} />
    </>
  );
};
export default Home;
