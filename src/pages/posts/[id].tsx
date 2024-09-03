import { useEffect, useState } from 'react';
import BannerComponent from '@/components/banner';
import CardPost from '@/components/cardPost';
import { useRouter } from 'next/router';
import { PostFields } from '@/types/types';
import { gql } from '@apollo/client';
import client from "@/apollo-client";


const GET_POST_ITEM = gql`
  query GetPostBySlug($slug: String!) {
    posts(where: { name: $slug }) {
      nodes {
        id
        title
        slug  
        date
        content
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
        acfPosts {
          background {
            node {
              sourceUrl  
            }
          }
          description
        }
      }
    }
  }
`;


const GET_RELATED_POSTS = gql`
 query GetRelatedPosts($categoryIds: [ID], $postId: ID!) {
  posts(
    where: { 
      categoryIn: $categoryIds, # Certifique-se de usar o filtro correto
      notIn: [$postId] # Exclui o post atual dos resultados
    },
    first: 4
  ) {
    nodes {
      title
      slug
      acfPosts {
        background {
          node {
            sourceUrl
          }
        }
        description
      }
    }
  }
}
`;

const PostPage = () => {
  const router = useRouter();
  const { id: slug } = router.query;

  const [post, setPost] = useState<PostFields | undefined>(undefined);
  const [relatedPosts, setRelatedPosts] = useState<PostFields[]>([]);

  const fetchPost = async () => {
    if (!slug) return;

    try {
      const { data } = await client.query({
        query: GET_POST_ITEM,
        variables: { slug },
      });

      const currentPost = data.posts.nodes[0];
      setPost(currentPost);

      const categoryIds = currentPost.categories.edges.map((edge: any) => edge.node.id);

      if (categoryIds.length > 0) {
        fetchRelatedPosts(categoryIds, currentPost.id);
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  };

  const fetchRelatedPosts = async (categoryIds: string[], postId: string) => {
    try {
      const { data } = await client.query({
        query: GET_RELATED_POSTS,
        variables: { categoryIds, postId },
      });
      setRelatedPosts(data.posts.nodes);
    } catch (error) {
      console.error('Erro ao buscar posts relacionados:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  return (
    <div className="container">
      {post ? (
        <>
          <h2 className="text-primary mb-4 text-lg ">{post.title}</h2>
          <BannerComponent
            imageUrl={post.acfPosts.background?.node?.sourceUrl}
            description={post.acfPosts.description}
          />
          <p
            className="text-sm mt-4"
            dangerouslySetInnerHTML={{ __html: (post.content ?? "").replace(/\n/g, '<br />') }}
          />


          {relatedPosts.length > 0 && (
            <div className="py-[6rem]">

              <h2 className="text-lg pb-4">Posts relacionados</h2>
              <div className="grid grid-cols-4 gap-12">
                {relatedPosts.map((post: PostFields, index: number) => (
                  <CardPost imageUrl={post.acfPosts.background?.node?.sourceUrl} title={post.title} description={post.acfPosts.description} slug={post.slug} key={index} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default PostPage;
