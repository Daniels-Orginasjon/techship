interface RegisterProps {
  clickregister: () => void;
  registeruser: (e: React.SyntheticEvent) => void;
}

function Register(props: RegisterProps): JSX.Element {
  return (
    <div
      className="p-4 w-full sm:w-1/3 max-w-wd h-full md:h-auto mx-auto"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="relative bg-white rounded-lg shadow">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          onClick={props.clickregister}
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
        <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Lag Konto
          </h3>
          <form
            className="space-y-6"
            action="#"
            method="post"
            onSubmit={props.registeruser}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Din email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="example@gmail.com"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Brukernavn
              </label>
              <input
                name="username"
                id="username"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="obama"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Ditt Passord:
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="••••••••"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Skriv Passord Igjen:
              </label>
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="••••••••"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Bruk helst stor bokstav tall og spesial tegn for et bedre
                passord!
              </label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Lag brukeren
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
