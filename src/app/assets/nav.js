import Link from 'next/link';
import Search from './search';

export default function Nav({ state }) {
  return (
    <nav className="bg-blue-500 py-4 px-6 flex">
      <div className="text-white text-2xl font-bold w-20%">Web Dev Tools</div>

      <Search />

      <div className="ml-80">
        <Link href="/codeedit">New</Link>

        {state === 'home' ? (
          <a href="#about" className="text-white">
            About
          </a>
        ) : (
          <Link href="/">About</Link>
        )}

        {state === 'home' ? (
          <a href="#contribute" className="text-white ml-7">
            Contribute
          </a>
        ) : (
          <Link href="/">Contribute</Link>
        )}
      </div>
    </nav>
  );
}
