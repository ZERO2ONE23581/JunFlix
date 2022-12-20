import Head from 'next/head';

interface IHead_ {
  title: string;
}
export const Head_ = ({ title }: IHead_) => {
  return (
    <>
      <Head>
        <title>{title} | JUNFLIX</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
    </>
  );
};
