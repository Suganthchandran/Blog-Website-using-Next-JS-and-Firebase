// import { getAuthor } from "@/lib/firebase/author/view_server";
// import { getCategory } from "@/lib/firebase/category/view_server";
// import { getPost } from "@/lib/firebase/post/view_server";

// export async function generateMetadata({ params }) {
    
//     const { postId } = await params;
//     const post = await getPost(postId);
   
//     return {
//       title: post?.title,
//       openGraph: {
//         images: [post?.imageURL],
//       },
//     }
//   }

// export default async function Page({ params }) {
//     const { postId } = await params;
//     const post = await getPost(postId);
//     return <main className="flex justify-center">
//         <section className="flex flex-col gap-5 px-16 py-10 max-w-[1000px]">
//         <CategoryCard categoryId={post?.categoryId} />
//         <h1 className="text-2xl font-bold">{post?.title}</h1>
//         <img className="w-full object-cover" src={post?.imageURL} alt="" />
//         <div className="flex justify-between items-center">
//             <AuthorCard authorId={post?.authorId} />
//             <h5 className="text-sm text-gray-500">{post?.timestamp?.toDate()?.toLocaleDateString()}</h5>
//         </div>
//         <div dangerouslySetInnerHTML={{__html: post?.content}}></div>
//         </section>
//     </main>
// }

import { getAllPosts } from "@/lib/firebase/post/view_server";
import { getPost } from "@/lib/firebase/post/view_server";
import { getAuthor } from "@/lib/firebase/author/view_server";
import { getCategory } from "@/lib/firebase/category/view_server";

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        postId: post.id, // Ensure this matches the dynamic segment in your route.
    }));
}

export default async function Page({ params }) {
    const { postId } = params;
    const post = await getPost(postId);

    return (
        <main className="flex justify-center">
            <section className="flex flex-col gap-5 px-16 py-10 max-w-[1000px]">
                <CategoryCard categoryId={post?.categoryId} />
                <h1 className="text-2xl font-bold">{post?.title}</h1>
                <img className="w-full object-cover" src={post?.imageURL} alt="" />
                <div className="flex justify-between items-center">
                    <AuthorCard authorId={post?.authorId} />
                    <h5 className="text-sm text-gray-500">{post?.timestamp?.toDate()?.toLocaleDateString()}</h5>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
            </section>
        </main>
    );
}

async function AuthorCard({ authorId }) {
    const author = await getAuthor(authorId);
    return <div className="flex gap-2 items-center">
        <img className="h-6 w-6 rounded-full object-cover" src={author?.photoURL} alt="" />
        <h4 className="text-sm text-gray-500">{author?.name}</h4>
    </div>
}

async function CategoryCard({ categoryId }) {
    const category = await getCategory(categoryId);
    return <div className="flex">
        <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-3 py-1 border">
            <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
            <h4 className="text-xs text-gray-900">{category?.name}</h4>
        </div>
    </div>
}