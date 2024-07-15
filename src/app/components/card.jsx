import Link from "next/link";

export function Card({ link, title, desc, isDarkMode }) {
  return (
    <Link href={link} className="group relative block h-64 sm:h-80 lg:h-96">
      <span className={`absolute inset-0 border-2 border-dashed border-transparent rounded transition-all duration-300 group-hover:border-yellow-500 ${isDarkMode ? 'border-white' : 'border-black'}`}></span>

      <div className={`relative flex h-full transform rounded-lg items-end border-2 border-transparent bg-gradient-to-br ${isDarkMode ? 'from-gray-500 via-slate-500 to-black' : 'from-gray-100 via-slate-100 to-white'} transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:shadow-xl`}>
        <div className={`p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8 text-center absolute top-0 left-0 w-full h-full flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h2>
        </div>

        <div className={`absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h3>

          <p className="mt-4 text-sm sm:text-base">{desc}</p>

          <p className="mt-8 font-extrabold">Try out</p>
        </div>
      </div>
    </Link>
  );
}
