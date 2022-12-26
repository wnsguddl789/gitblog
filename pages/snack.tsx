import type { NextPage } from 'next';
import SnackPost from 'components/SnackPost';
import Container from '../components/Container';
import { allPosts } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';

const Snacks = ({ snacks }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <div className={`mt-10 flex flex-col`}>
        {snacks.map((snacks) => (
          <SnackPost
            date={snacks.date}
            title={snacks.title}
            des={snacks.description}
            snack={snacks._raw.flattenedPath}
            key={snacks._id}
          />
        ))}
      </div>
    </Container>
  );
};

export const getStaticProps = async () => {
  const snacks = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  return {
    props: {
      snacks
    }
  };
};

export default Snacks;
