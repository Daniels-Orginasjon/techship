import { Pages, navPages } from '../lib/server/pages';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cart from './cart/cart';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/client/hooks';
import Login from './login';
import Register from './register';
import PhoneNav from './phoneNav';
import { login } from '../lib/client/methods';
function Navbar() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [registerModel, setRegisterModel] = useState<boolean>(false);
  const [phoneNavModel, setPhoneNavModel] = useState<boolean>(false);
  const [loginModel, setLoginModel] = useState<boolean>(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  let router = useRouter();
  let currentPage = router.pathname;

  let thisPage = navPages.find((item) => {
    return item.href.toLowerCase() === currentPage;
  });

  function clickLogin() {
    setLoginModel(!loginModel);
  }
  function clickRegister() {
    setRegisterModel(!registerModel);
    setLoginModel(!loginModel);
  }

  function clickNav() {
    setPhoneNavModel(!phoneNavModel);
  }
  function hideModal() {
    setLoginModel(false);
    setRegisterModel(false);
  }

  function registerUser(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      username: { value: string };
      password: { value: string };
    };

    let Datafil = {
      email: target.email.value,
      username: target.username.value,
      password: target.password.value,
    };
    fetch('/api/user', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(Datafil),
    })
      .then((res) => {
        if (res.status === 200) {
          clickRegister();
          login(Datafil.username, Datafil.password).then((loginRes) => {});
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      });
  }
  async function onLogin(e: React.FormEvent<HTMLFormElement>): Promise<void> {
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

  async function clickLogout() {
    fetch('/api/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.replace('./');
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5 flex">
          <a href="./" className="flex items-center ">
            <div className="mr-3 py-0">
              <Image
                src="/logo.png"
                alt="Flowbite Logo"
                height={529 / 12}
                width={491 / 12}
              />
            </div>
            <div className="self-center whitespace-nowrap dark:text-white mr-3 h-6 pt-1">
              <Image
                src="/logoTrans.png"
                alt=""
                height={156 / 5}
                width={647 / 5}
              />
            </div>
          </a>
          <form className="items-center hidden sm:flex" onSubmit={onLogin}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-bluemain text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                placeholder="Søk"
                required
              ></input>
            </div>
          </form>
          <div className="flex items-center">
            <div className="mr-2">
              <Cart />
            </div>
            {!user && (
              <button
                className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
                type="button"
                onClick={clickLogin}
              >
                Login
              </button>
            )}
            {user && (
              <div>
                <button
                  id="nameButton"
                  className="btn btn-primary dropdown-toggle flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                  type="button"
                  onClick={() => setdropdownOpen(!dropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="mr-2 w-8 h-8 rounded-full"
                    src="/pc.jpg"
                    alt="user photo"
                    height="30px"
                    width="30px"
                  ></Image>
                  <h1 className="pl-2">{user.username}</h1>
                  <svg
                    className="w-4 h-4 mx-1.5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="caret"></span>
                </button>
                {dropdownOpen && (
                  <div className="absolute z-40 mt-2 rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all border-bluemain">
                    <a
                      href="./bruker-info"
                      className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary hover:bg-bluemain"
                    >
                      Dashboard
                    </a>
                    <a
                      href="./settings"
                      className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary hover:bg-bluemain"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block py-2 px-5 text-base font-semibold text-body-color hover:bg-primary hover:bg-opacity-5 hover:text-primary hover:bg-bluemain"
                      onClick={clickLogout}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700 items-center text-center">
        <div className="sm:hidden flex flex-row">
          <button onClick={clickNav}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 122.88 95.95"
              xmlSpace="preserve"
              className="h-5 w-5"
            >
              <style type="text/css"></style>
              <g>
                <path
                  className="st0"
                  d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"
                />
              </g>
            </svg>
          </button>
          <form className="items-center h" onSubmit={onLogin}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-bluemain text-gray-900 text-sm rounded-lg block w-full pl-10 p-0.5 "
                placeholder="Søk"
                required
              ></input>
            </div>
          </form>
        </div>
        <div className="py-3 px-4 mx-auto max-w-screen-xl md:px-6 hidden sm:flex">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 text-sm font-medium">
              {navPages.map((page, i) => {
                let active = page.name == thisPage?.name ? 'bg-bluemain' : '';
                return (
                  <li key={i}>
                    <a
                      href={page.href}
                      className={
                        'text-black hover:bg-bluemain px-7 py-2  rounded-md text-sm font-medium hover:text-white' +
                        active
                      }
                    >
                      {page.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      {(loginModel || registerModel || phoneNavModel) && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          className=" bg-black bg-opacity-25 overflow-y-auto overflow-x-hidden top-0 left-0 z-50 w-full h-full md:inset-0 min-h-screen md:h-full fixed "
          onMouseDown={hideModal}
        >
          {loginModel && (
            <Login clicklogin={clickLogin} clickregister={clickRegister} />
          )}
          {registerModel && (
            <Register
              clickregister={clickRegister}
              registeruser={registerUser}
            />
          )}
          {phoneNavModel && <PhoneNav clicknav={clickNav} />}
        </div>
      )}
    </>
  );
}

export default Navbar;
