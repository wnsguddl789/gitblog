import type { NextPage } from 'next';
import Container from '../components/Container';
import Image from 'next/image';
import RecentPosts from '../components/RecentPosts';
import metadata from '../data/metadata';
import { allPosts } from '../.contentlayer/generated';
import { InferGetStaticPropsType } from 'next';
import { chosenImage } from './background';
const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <div className={`my-5 w-full`}>
        <div className={`relative`}>
          <Image
            src={`/${chosenImage}`}
            alt="대표 이미지"
            width={`100%`}
            height={45}
            layout={`responsive`}
            objectFit="cover"
            className={`rounded-3xl`}
          />
          <span
            className={`absolute top-12 font-bold  text-white text-4xl md:text-5xl text flex justify-center w-full drop-shadow-2xl`}
          >
            {metadata.quote}
            <span
              className={`absolute top-32 font-bold italic text-white text-3xl md:text-3xl text flex justify-center w-full drop-shadow-lg`}
            >
              {metadata.authors}
            </span>
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
      posts
    }
  };
};

export default Home;
