import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/client/hooks';
import { forwardRef } from 'react';

interface LoginProps {
  clickregister: () => void;
  clicklogin: () => void;
}

function LoginButton(props: LoginProps): JSX.Element {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try better!');
    }
  }

  // useEffect(() => {
  //   // redirect to home if user is authenticated
  //   if (user) Router.push("/example/profile");
  // }, [user]);

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
          onClick={props.clicklogin}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Pålogging
          </h3>
          <form className="space-y-6" action="#" onSubmit={onLogin}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Ditt brukernavn eller Email
              </label>
              <input
                name="username"
                id="username"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="example@gmail.com"
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Ditt passord:
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="••••••••"
              ></input>
            </div>
            <div className="flex justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                </div>
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Husk meg
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Reset passord?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pålogg brukeren
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Ikke registrert?{' '}
              <a
                onClick={props.clickregister}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Lag konto
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginButton;
//export default const Login = forwardRef(LoginButton);
