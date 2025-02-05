import { getAuthor } from "@/lib/firebase/author/view_server";
import { getCategory } from "@/lib/firebase/category/view_server";
import { getAllPosts } from "@/lib/firebase/post/view_server"
import Link from "next/link";

export default async function PostListView() {
    const posts = await getAllPosts();
    if (!posts) {
        return <div>
            <h3>Post not available</h3>
        </div>
    }
    return <section className="py-10 px-16">
       <div className="grid grid-cols-4 gap-8">
       {
            posts.map((post, key) => {
                return <PostCard post={post} key={key} />
            })
        }
       </div>
    </section>
}

export function PostCard({ post }) {
    return <Link href={`/posts/${post?.id}`}>
        <div className="flex flex-col gap-3 p-2 rounded">
        <div className="relative">
            <div className="absolute flex justify-end w-full p-3">
                <CategoryCard categoryId={post?.categoryId} />
            </div>
            <img className="h-[200px] w-full object-cover" src={post?.imageURL} alt="" />
        </div>
        <h1 className="font-bold">{post?.title}</h1>
        <div className="flex justify-between items-center">
        <AuthorCard authorId={post?.authorId} />
        <h5 className="text-sm text-gray-500">{post?.timestamp?.toDate()?.toLocaleDateString()}</h5>
        </div>
    </div>
    </Link>
}

async function AuthorCard({authorId}) {
    const author = await getAuthor(authorId);
    return <div className="flex gap-2 items-center">
        <img className="h-6 w-6 rounded-full object-cover" src={author?.photoURL} alt="" />
        <h4 className="text-sm text-gray-500">{author?.name}</h4>
    </div>
}

async function CategoryCard({categoryId}) {
    const category = await getCategory(categoryId);
    return <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-3 py-1">
        <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
        <h4 className="text-xs text-gray-900">{category?.name}</h4>
    </div>
}