import Link  from "next/link"
import { useEffect, useState } from 'react';
import { PostFields } from "@/types/types"
import { gql } from '@apollo/client';
import client from "@/apollo-client";
import CardPost from "@/components/cardPost";

const GET_POSTS = gql`
 query MyQuery {
  posts {
      nodes {
      id
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

const Posts = () => {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const { data } = await client.query({
              query: GET_POSTS,
            });
            setPosts(data.posts.nodes); // Atualiza o estado com os posts
          } catch (error) {
            console.error('Erro ao buscar posts:', error);
          }
        };
    
        fetchPosts(); 
      }, [client]);
    return (
        <div className="container">
              {posts.length > 0 && (
            <div className="py-[6rem] pt-4">

              <div className="grid grid-cols-4 gap-12">
                {posts.map((post: PostFields, index: number) => (
                  <CardPost imageUrl={post.acfPosts.background?.node?.sourceUrl} title={post.title} description={post.acfPosts.description} slug={post.slug} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
    )
}
export default Posts