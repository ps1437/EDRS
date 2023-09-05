import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ChartIcon, DeathIcon, HomeIcon } from "../../assets/Icon";
import { BRAND_NAME } from "../../constant/Constant";

interface NavLinkProps {
  to: string;
  label: string;
  icon: JSX.Element;
  close: () => void;
}

const Sidebar = ({ close }: any | undefined) => {
  const { t } = useTranslation();

  return (
    <aside
      id="sidebar"
      data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      className="sidebar w-48
     h-screen top-0 sticky md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in 
   bg-secondary-500"
    >
      <div className="flex flex-col space-y-6   w-48 ">
        <NavLink
          to="/"
          className="text-white flex  space-x-2 px-4 text-center justify-center items-center"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg> */}
          <div
            title="Electronic Death Registration System"
            className="text-2xl mt-8   font-extrabold whitespace-nowrap truncate "
          >
            {BRAND_NAME}
          </div>
        </NavLink>

        <nav>
          <ul className="flex flex-col w-full ">
            <AppNavLink
              close={close}
              to="/edrs/home"
              label={t("sidemenu.home")}
              icon={<HomeIcon />}
            />
            <AppNavLink
              close={close}
              to="/edrs/report"
              label={t("sidemenu.edrs")}
              icon={<DeathIcon />}
            />
            <AppNavLink
              close={close}
              to="/edrs/analysis"
              label={t("sidemenu.report")}
              icon={<ChartIcon />}
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

const AppNavLink = (props: NavLinkProps) => (
  <NavLink
    to={props.to}
    onClick={props.close}
    className={({ isActive }) =>
      isActive
        ? "flex ripple-bg-primary-800 hover:bg-primary-800  my-1 mx-2 flex-row items-center h-10 px-3 rounded-lg text-white font-medium"
        : "flex   ripple-bg-primary-500 hover:bg-primary-800 transition-transform hover:scale-105 my-1 mx-2 flex-row items-center h-10 px-3 rounded-lg text-white font-medium"
    }
  >
    {props.icon && (
      <span className="flex items-center justify-center   text-gray-400">
        {props.icon}
      </span>
    )}

    <span className="ml-3">{props.label}</span>
  </NavLink>
);

export default Sidebar;
