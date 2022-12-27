import Container from 'components/Container';
import { allPosts } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

const Snack = ({ snack }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MDXComponent = useMDXComponent(snack.body.code);

  const customMeta = {
    title: snack.title,
    description: snack.description,
    date: new Date(snack.date).toISOString()
  };

  return (
    <Container customMeta={customMeta}>
      <div className="mt-10 prose">
        <h1 className="text-sky-700">{snack.title}</h1>
        <MDXComponent />
      </div>
    </Container>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: allPosts.map((s) => ({ params: { snack: s._raw.flattenedPath } })),
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const snack = allPosts.find((s) => s._raw.flattenedPath === params.snack);
  return {
    props: {
      snack
    }
  };
};

export default Snack;
