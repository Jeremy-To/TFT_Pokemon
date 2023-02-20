import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {

	const [isNavOpen, setIsNavOpen] = useState(false);

	const navCloseHandler = () => {
		setIsNavOpen(false)
	}
	return (
		<div className="flex items-center justify-between border-b border-gray-400 py-8 bg-yellow-500">
			<div className="font-serif text-4xl text-white font-bold pl-4 hover:text-orange-500">
				<Link to="/">tftpoke</Link>
			</div>
			<nav>
				<section className="flex lg:hidden">
					<div
						className="space-y-2 mr-4"
						onClick={() => setIsNavOpen((prev) => !prev)}
					>
						<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
						<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
						<span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
					</div>

					<div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
						<div
							className="absolute top-0 right-0 px-8 py-8"
							onClick={navCloseHandler}
						>
							<svg
								className="h-8 w-8 text-gray-600"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</div>
						<ul className="flex flex-col items-center justify-between min-h-[250px]" onClick={navCloseHandler}>
							<li className="border-b border-gray-400 my-8 uppercase hover:text-orange-500 active:text-orange-500">
								<Link to="/">details</Link>
							</li>
							<li className="border-b border-gray-400 my-8 uppercase hover:text-orange-500 active:text-orange-500">
								<Link to="/">list</Link>
							</li>
              <li className="border-b border-gray-400 my-8 uppercase hover:text-orange-500 active:text-orange-500">
								<Link to="/">sprite </Link>
							</li>
						</ul>
					</div>
				</section>

				<ul className="hidden space-x-8 lg:flex lg:items-center text-xl mr-4">
					<li className="ml-10 text-white hover:text-orange-500 active:bg-orange-200 active:rounded-md ">
						<Link to="/">details</Link>
					</li>
					<li className="ml-10 text-white  hover:text-orange-500 active:bg-orange-200 active:rounded-md ">
						<Link to="/">list</Link>
					</li>

					<li className="ml-10 text-white  hover:text-orange-500 active:bg-orange-200 active:rounded-md ">
						<Link to="/">sprite</Link>
					</li>
				</ul>
			</nav>
			<style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
		</div>
	);
}

export default Navbar;
