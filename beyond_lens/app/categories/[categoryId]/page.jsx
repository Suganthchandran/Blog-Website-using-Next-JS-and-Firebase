// import { PostCard } from "@/app/components/PostListView";
// import { getCategory } from "@/lib/firebase/category/view_server";
// import { getAllPostsWithCategory } from "@/lib/firebase/post/view_server";

// export default async function Page({params}) {
//     const {categoryId} = await params;
//     const posts = await getAllPostsWithCategory(categoryId);
//     return <main className="py-10 px-16">
//         <div className="flex p-5 py-7 gap-3">
//             <h1 className="text-2xl font-bold">Categories /</h1>
//             <CategoryCard categoryId={categoryId} />
//         </div>
//        <div className="grid grid-cols-4 gap-5">
//        {
//             posts.map((post,key)=>{
//                 return <PostCard post={post} key={key} />
//             })
//         }
//        </div>
//     </main>
// }

// async function CategoryCard({categoryId}) {
//     const category = await getCategory(categoryId);
//     return <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-3 py-1">
//         <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
//         <h4 className="text-xs text-gray-900">{category?.name}</h4>
//     </div>
// }

import { PostCard } from "@/app/components/PostListView";
import { getCategory, getAllCategories } from "@/lib/firebase/category/view_server";
import { getAllPostsWithCategory } from "@/lib/firebase/post/view_server";

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((category) => ({
        categoryId: category.id, // Ensure this matches the dynamic segment in your route.
    }));
}

export default async function Page({ params }) {
    const { categoryId } = params;
    const posts = await getAllPostsWithCategory(categoryId);

    return (
        <main className="py-10 px-16">
            <div className="flex p-5 py-7 gap-3">
                <h1 className="text-2xl font-bold">Categories /</h1>
                <CategoryCard categoryId={categoryId} />
            </div>
            <div className="grid grid-cols-4 gap-5">
                {posts.map((post, key) => (
                    <PostCard post={post} key={key} />
                ))}
            </div>
        </main>
    );
}

async function CategoryCard({ categoryId }) {
    const category = await getCategory(categoryId);
    return (
        <div className="flex gap-2 items-center bg-white bg-opacity-60 rounded-full px-3 py-1">
            <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} alt="" />
            <h4 className="text-xs text-gray-900">{category?.name}</h4>
        </div>
    );
}
