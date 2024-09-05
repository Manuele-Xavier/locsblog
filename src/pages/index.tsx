import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from "@/apollo-client";
import { HomeFields } from '@/types/types';
import { PostFields } from '@/types/types';
import CardPost from '@/components/cardPost';
import BannerComponent from '@/components/banner';
import BtnDefault from '@/components/btn';


export const GET_HOME_PAGE = gql`
 query GetHomePage {
  pageBy(uri: "home") {
    home { 
      titlePage
        banner {
        node {
          sourceUrl  
        }
      }
    	aboutTitle
      aboutText
			aboutImg {
        node {
          sourceUrl  
        }
      }
     	aboutLocsTitle
    	aboutLocsText
			postsTitle
      btn
    
     
    }
  }
}
`;

export const GET_POSTS_HOME = gql`
  query MyQuery {
    posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        date
        acfPosts {
          background{
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

const Home = () => {
  const [homeData, setHomeData] = useState<HomeFields | null>(null);
  const [posts, setPosts] = useState([]);

  const fetchHomeData = async () => {
    try {
      const { data } = await client.query({
        query: GET_HOME_PAGE,
      });
      setHomeData(data.pageBy.home);
    } catch (error) {
      console.error('Erro ao buscar dados da página Home:', error);
    }
  };

  const fetchPostsHome = async () => {
    try {
      const { data } = await client.query({
        query: GET_POSTS_HOME,
      });
      setPosts(data.posts.nodes); // Atualiza o estado com os posts
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  };

  useEffect(() => {
    fetchHomeData();
    fetchPostsHome();
  }, []);
  return (
    <div>
      <div className="container">
        <h1 className="text-xl text-center py-4">{homeData?.titlePage}</h1>
        <BannerComponent imageUrl={homeData?.banner?.node?.sourceUrl} description="Imagem" />
      </div>
      <div className="container flex justify-between gap-12 pt-[6rem]">
        <div>
          <h2 className="text-lg pb-4">{homeData?.aboutTitle}</h2>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: (homeData?.aboutText ?? "").replace(/\n/g, '<br />') }}
          />

        </div>
        <img className="rounded-r-[30px] h-[25rem] w-[30rem] object-cover" src={homeData?.aboutImg?.node?.sourceUrl} />

      </div>
      <div className="bg-primary my-[6rem] py-[6rem]">
        <div className="container">
          <h2 className="text-lg pb-4 text-[#ffffff]">{homeData?.aboutLocsTitle}</h2>

          <p
            className="text-sm text-[#ffffff]"
            dangerouslySetInnerHTML={{ __html: (homeData?.aboutLocsText ?? "").replace(/\n/g, '<br />') }}
          />
        </div>
      </div>
      <div className="container pb-[6rem]">
        <h2 className="text-lg pb-4">{homeData?.postsTitle}</h2>
        <div className="grid grid-cols-4 gap-12">
          {posts.map((post: PostFields, index: number) => (
            <CardPost imageUrl={post.acfPosts.background?.node?.sourceUrl} title={post.title} description={post.acfPosts.description} slug={post.slug} key={index} />
          ))}
        </div>
        <div className="text-center mt-[4rem]">
          <BtnDefault text={homeData?.btn} />
        </div>
      </div>
    </div>
  )
}
export default Home