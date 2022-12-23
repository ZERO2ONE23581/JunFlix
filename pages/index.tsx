import { IPage } from './_app';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Head_ } from '../src/Tools/Title/Head';
import { Start } from '../src/components/Home/Start';
import { useUser } from '../src/libs/client/useUser';
import { LoggedIn } from '../src/components/Home/LoggedIn';
import { useRouter } from 'next/router';

const Home: NextPage<IPage> = ({ theme, setHide, setFixed }) => {
  const { isLoggedIn } = useUser();
  const [start, setStart] = useState(false);
  const isHide = !isLoggedIn && !start;
  useEffect(() => {
    if (isHide) return setHide(true);
    else return setHide(false);
  }, [setHide, isHide]);
  return (
    <>
      <Head_ title="Home" />
      {!start && <Start _data={{ theme, isHide, setStart }} />}
      <LoggedIn _data={{ theme, isHide, setFixed }} />
    </>
  );
};
export default Home;
