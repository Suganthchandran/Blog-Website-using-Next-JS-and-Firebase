export default function Page() {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <form className="bg-white cursor-pointer shadow-2xl rounded-lg  mb-32 p-8 w-full max-w-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-black animate-pulse">
                    Get in Touch
                </h2>

                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300"
                        type="text"
                        id="name"
                        placeholder="Your full name"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-shadow duration-300"
                        type="email"
                        id="email"
                        placeholder="Your email address"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow duration-300"
                        id="message"
                        placeholder="Write your message here..."
                        rows="5"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-900 hover:from-green-900 hover:to-green-500 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                    Send Message
                </button>
            </form>
        </main>
    );
}
