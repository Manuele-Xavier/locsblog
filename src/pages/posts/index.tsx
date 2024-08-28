import Link  from "next/link"
import { Post } from "@/types/types"
const Posts = () => {
   
    const posts: Post[] = [
        { id: '1', title: 'First Post', content: 'Content of the first post' },
        { id: '2', title: 'Second Post', content: 'Content of the second post' },
    ]
    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post:Post)=>(
                <Link href={`/posts/${post.id}`}>
                     {post.title}
                </Link>
            ))}
        </div>
    )
}
export default Posts