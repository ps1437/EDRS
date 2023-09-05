import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./layout.css";
import { Suspense } from "react";
import Loader from "../Loader";

export default function Layout({ children }: any) {
  const context = useAuth();
  let navigate = useNavigate();
  const { width } = useWindowDimensions();

  const logoutHandler = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login")
  }

  const close = () => {
    let doc: any = document.getElementById("menu-open");
    if (doc.checked) {
      doc.checked = false;
    }
  }

  return (
    <Suspense fallback={<Loader/>}>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800 z-50">
        <input type="checkbox" id="menu-open" className="hidden" />
        <Sidebar close={close} />
        <main
          onClick={width < 768 ? close : undefined}
          className="main flex flex-col flex-grow -ml-72 md:ml-0 transition-all duration-150 ease-in">
          <Header close={close} username={context?.name} logoutHandler={logoutHandler} />
          <div className="main-content flex flex-col flex-grow p-2">
            {children}
          </div>
        </main>
      </div>
    </Suspense>
  );
}

