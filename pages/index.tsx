import type { NextPage } from "next";
import Container from "../components/Container";
import Image from "next/image";
import RecentPosts from "../components/RecentPosts";
import metadata from "../data/metadata";
import { allPosts } from "../.contentlayer/generated";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";


const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
   <div>
     <Head>
    <meta
          property="og:image"
          content="../public/sky.jpeg"
        />
      </Head>
  </div>
  return (
    <Container>
      <div className={`my-5 w-full`}>
        <div className={`relative`}>
          <Image
            src={`/sky.jpeg`}
            alt="대표 이미지"
            width={`100%`}
            height={45}
            layout={`responsive`}
            objectFit="cover"
            className={`rounded-3xl`}
          />
          <span
            className={`absolute top-14 font-bold italic text-white text-5xl md:text-7xl text flex justify-center w-full drop-shadow-lg`}
          >
            {metadata.title}
          </span>
        </div>
        <RecentPosts posts={posts} />
      </div>
    </Container>
  );
};

export const getStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: {
      posts,
    },
  };
};

export default Home;