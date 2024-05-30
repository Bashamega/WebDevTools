import Search from "@/app/assets/search";

export default function JsonNav() {
    return (
        <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between h-15">
                <a
                href="https://web-dev-tools.vercel.app/"
                className="mr-2 flex border rounded items-center p-2 hover:bg-blue-600"
                >
                <h1 className="text-white text-[18px] md:text-2xl font-bold mr-4">
                    Web Dev Tools
                </h1>
                <p>Json Generator</p>
                </a>
                <Search />
            </nav>
    );
}