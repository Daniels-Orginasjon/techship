import { Pages, navPages } from "../lib/server/pages";
import Image from "next/image";
import { useRouter } from "next/router";
import Cart from "./cart/cart";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useUser } from "../lib/client/hooks";
import Login from "./login";
import Register from "./register";
function Navbar() {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [registerModel, setRegisterModel] = useState<boolean>(false);
  const [loginModel, setLoginModel] = useState<boolean>(false);
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

  function registerUser(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      username: { value: string };
      createPassword: { value: string };
      confirmPassword: { value: string };
    };

    let Datafil = {
      email: target.email.value,
      username: target.username.value,
      createPassword: target.createPassword.value,
      confirmPassword: target.confirmPassword.value,
    };
    fetch("/api/user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(Datafil),
    })
      .then((res) => {
        if (res.status === 200) {
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
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      // set user to useSWR state
      mutate(userObj);
    } else {
      setErrorMsg("Incorrect username or password. Try better!");
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push("/example/profile");
  }, [user]);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <a href="./" className="flex items-center ">
            <div className="mr-3 h-6 sm:h-9">
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
          <form className="flex items-center" onSubmit={onLogin}>
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
            <button
              className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
              type="button"
              onClick={clickLogin}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 text-sm font-medium">
              {navPages.map((page, i) => {
                let active = page.name == thisPage?.name ? "bg-bluemain" : "";
                return (
                  <li key={i}>
                    <a
                      href={page.href}
                      className={
                        "text-black hover:bg-bluemain px-7 py-2 border border-0.5 border-gray-500 rounded-md text-sm font-medium hover:text-white" +
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
      {loginModel && (
        <Login clicklogin={clickLogin} clickregister={clickRegister} />
      )}
      {registerModel && (
        <Register clickregister={clickRegister} registeruser={registerUser} />
      )}
    </>
  );
}

export default Navbar;
