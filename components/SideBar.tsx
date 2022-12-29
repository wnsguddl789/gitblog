import navlinks from '../data/navlinks';
import Link from 'next/link';

const SideBar = () => {
  return (
    <nav className="flex">
      {navlinks.map((nav) => (
        <Link href={nav.link} key={nav.title}>
          <a className={`fixed top-5 left-5  `}>{nav.title}</a>
        </Link>
      ))}
    </nav>
  );
};

export default SideBar;
