import Link  from "next/link"
import { useEffect, useState } from 'react';
import { Post } from "@/types/types"
import { gql } from '@apollo/client';
import client from "@/apollo-client";


const GET_POSTS = gql`
 query MyQuery {
  posts {
    nodes {
      date
      title
      content
      id
      slug
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
        <div className="flex-col">
            <h1>Posts</h1>
            {posts.map((post:Post)=>(
                <Link href={`/posts/${post.slug}`}>
                     {post.title}
                </Link>
            ))}
        </div>
    )
}
export default Posts