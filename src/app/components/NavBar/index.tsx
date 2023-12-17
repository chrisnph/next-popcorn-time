import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="bg-black text-[#B6FFF5] py-[20px] font-medium text-[1.2rem]">
      <nav className="nav flex justify-between items-center px-[1rem] md:px-[5rem]">
        <Link href="/" className="">
          <Image src="/logo.png" alt="logo" className="max-h-[50px] w-auto" />
        </Link>
        <div className="space-x-10">
          {/* <Link href="/movie">Movies</Link> */}
          {/* <Link href="/tvShows">TV Shows</Link> */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
