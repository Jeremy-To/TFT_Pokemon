import Navbar from "./Navbar";
function Layout(props) {
  return (
    <div className='w-full'>
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;