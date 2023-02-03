import { ReactNode } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import metadata from '../data/metadata';
import Nav from './Nav';
import SideBar from './SideBar';

type Props = {
  children: ReactNode;
  customMeta?: any;
};

const Container = ({ customMeta, children }: Props) => {
  const meta: typeof metadata = {
    title: metadata.title,
    description: metadata.description,
    author: metadata.author,
    ...customMeta
  };

  return (
    <div className={`w-full flex flex-col items-center p-3`}>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta property="og:site_name" content={meta.author} />
      </Head>
      <header
        className={`w-full max-w-3xl flex flex-row justify-between items-center my-1`}
      >
        <div className={`flex flex-row items-center`}>
          <Image
            src={`/sherlock.jpeg`}
            alt="로고"
            width={40}
            height={40}
            objectFit={`cover`}
            className={`rounded-full`}
          />
          <span className={`mx-2 font-extralight text-lg`}>
            {metadata.title}
          </span>
        </div>
        <Nav />
        {/* <SideBar /> */}
      </header>
      <main className={`w-full max-w-3xl`}>{children}</main>
      <footer className={`w p-3`}>만든이 : 배자현</footer>
    </div>
  );
};

export default Container;
