import { getAllPosts } from "@/lib/firebase/post/view_server"

export default async function PostListView() {
    const posts = await getAllPosts();
    if (!posts) {
        return <div>
            <h3>Post not available</h3>
        </div>
    }
    return <section className="p-10">
       <div className="grid grid-cols-4 gap-5">
       {
            posts.map((post, key) => {
                return <PostCard post={post} key={key} />
            })
        }
       </div>
    </section>
}

function PostCard({ post }) {
    return <div className="p-5 rounded bg-green-100">
        <h1 className="font-bold">{post?.title}</h1>
    </div>
}