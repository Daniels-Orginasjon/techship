import { useUser } from '../lib/client/hooks';
import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [user] = useUser();
  const [slettModel, setSlettModel] = useState<boolean>(false);
  const [userModel, setUserModel] = useState<boolean>(false);
  const [passwordModel, setPasswordModel] = useState<boolean>(false);
  const [mailModel, setMailModel] = useState<boolean>(false);

  function clickSlett() {
    setSlettModel(!slettModel);
  }

  async function deleteUser() {
    const body = {
      username: user?.username,
      uniqueID: user?.uniqueID,
      password: user?.passord,
    };

    const res = await fetch('/api/deleteUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
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

  function clickChangeUsername() {}
  function clickChangeMail() {}
  function clickChangePassword() {}

  return (
    <>
      <div className="text-center">
        <div className="w-2/3 inline-block" id="container">
          <h1>User settings</h1>
          <table className="border text-center">
            <thead></thead>
            <tbody>
              <tr className=" ">
                <th className="bg-gray-400">Brukernavn</th>
                <td>{user?.username}</td>
                <td>
                  <button
                    className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
                    type="button"
                    onClick={clickChangeUsername}
                  >
                    Endre
                  </button>
                </td>
              </tr>
              <tr>
                <th className="bg-gray-400">Epost</th>
                <td>{user?.email}</td>
                <td>
                  <button
                    className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
                    type="button"
                    onClick={clickChangeMail}
                  >
                    Endre
                  </button>
                </td>
              </tr>
              <tr>
                <th className="bg-gray-400">passord</th>
                <td>************</td>
                <td>
                  <button
                    className="text-sm font-medium text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
                    type="button"
                    onClick={clickChangePassword}
                  >
                    Endre
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="border border-red-700 mt-5 p-3">
            <h1>Slett konto og konto data</h1>
            <p>
              Etter sletting vil du ikke lenger kunne logge inn. Vi anbefaler å
              laste ned og ta vare på kvitteringene dine i tilfelle retur- eller
              garantisaker oppstår. Uten kvittering vil vi ikke kunne lete opp
              dine opplysninger eller ordre i våre systemer etter sletting.
            </p>
            <button
              className="text-sm font-medium w-1/3 text-white bg-bluemain hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
              type="button"
              onClick={clickSlett}
            >
              slett konto
            </button>
          </div>
          {slettModel && (
            <div
              tabIndex={-1}
              className=" bg-black bg-opacity-25 overflow-y-auto overflow-x-hidden top-0 left-0 z-50 w-full h-full md:inset-0 min-h-screen md:h-full fixed "
              onClick={clickSlett}
            >
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
                    onClick={clickSlett}
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
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                      Er du sikker at du vil slette kontoen, dette kan ikke
                      reverseres
                    </h3>
                    <button
                      className="text-sm font-medium w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-500 rounded-lg px-2 py-1 text-center"
                      type="button"
                      onClick={deleteUser}
                    >
                      slett konto
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
