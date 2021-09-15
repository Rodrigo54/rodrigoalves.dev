import BlogPost from '@templates/blog-post';
import { Post, getPostBySlug, getAllPosts } from '@posts/render';

const PostPage: React.FC<{ post: Post }> = ({ post }) => (
  <BlogPost data={post} pageContext={post.pageContext} />
);

export async function getStaticProps({ params }: { params: Post }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: { ...post },
      };
    }),
    fallback: false,
  };
}

export default PostPage;
