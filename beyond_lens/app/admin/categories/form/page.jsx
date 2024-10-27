"use client"

export default function Page() {
    return <main className="w-full p-6 flex gap-4 flex-col">
        <h1 className="font-bold">Category | Form</h1>
        <section className="flex">
            <form onClick={(e)=>{
                e.preventDefault()
            }} 
            className="flex flex-col gap-4 border rounded-xl p-7">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Category Name <span className="text-red-500">*</span></label>
                    <input className="bg-gray-50 py-2 px-5 border rounded-full" type="text" placeholder="Enter Category name" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Category Slug <span className="text-red-500">*</span></label>
                    <input className="bg-gray-50 py-2 px-5 border rounded-full" type="text" placeholder="Enter Category Slug" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-500 text-sm">Image <span className="text-red-500">*</span></label>
                    <input className="bg-gray-50 py-2 px-5 border rounded-full" type="file" accept="image/*" onChange={(e)=>{e.preventDefault()}} placeholder="Enter Category Slug" required/>
                </div>
                <button type="submit" className="bg-green-500 font-bold px-4 py-2 rounded-full text-white">
                    Create
                </button>
            </form>
        </section>
    </main>
}