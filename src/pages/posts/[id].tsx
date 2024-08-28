import { Post } from "@/types/types"

const PostPage = ()=>{
    const post:Post  = { id: '1', title: 'First Post', content: 'Content of the first post' }
   return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </div>
   )
}
export default PostPage