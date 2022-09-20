interface RegisterProps {
  clicknav: () => void;
}

function PhoneNav(props: RegisterProps): JSX.Element {
  return (
    <div className="relative">
      <div
        id="authentication-modal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden top-0 left-0 z-50 w-full h-full md:inset-0  min-h-screen fixed  "
        onClick={props.clicknav}
      >
        <div className="relative bg-white min-h-screen h-full">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={props.clicknav}
          >
            <svg
              className="h-5 w-5 text-gray"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8"></div>
        </div>
      </div>
    </div>
  );
}

export default PhoneNav;
