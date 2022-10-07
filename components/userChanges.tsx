import React, { useState } from 'react';
export function ChangeEmail() {
  const [email, setEmail] = useState<string>('');
  const [confirmEmail, setConfirmEmail] = useState<string>('');

  async function mailChange(e: React.SyntheticEvent) {
    e.preventDefault();
    if (email == confirmEmail) {
      console.log('done');
      const body = {
        email: email,
      };

      const res = await fetch('/api/updateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          window.location.replace('./settings');
        });
    } else {
      console.log('Mails do not match');
    }
  }

  return (
    <div className="py-6 px-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
        Endre mail
      </h3>

      <form className="space-y-6" onSubmit={mailChange}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Skriv ny mail:
          </label>
          <input
            name="mail"
            id="mail"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="example@gmail.com"
          ></input>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Bekreft ny mail
          </label>
          <input
            name="mails"
            id="mails"
            type="text"
            value={confirmEmail}
            onChange={(e) => {
              setConfirmEmail(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="example@gmail.com"
          ></input>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Endre mail
        </button>
      </form>
    </div>
  );
}

export function ChangePassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  async function passwordChange(e: React.SyntheticEvent) {
    e.preventDefault();
    if (password == confirmPassword) {
      console.log('done');
      const body = {
        password: password,
      };

      const res = await fetch('/api/updateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          window.location.replace('./settings');
        });
    } else {
      console.log('Passwords do not match');
    }
  }

  return (
    <div className="py-6 px-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
        Endre Passord
      </h3>

      <form className="space-y-6" onSubmit={passwordChange}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Skriv ny Passord:
          </label>
          <input
            name="pass"
            id="pass"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="••••••••"
          ></input>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Bekreft ny Passord
          </label>
          <input
            name="password"
            id="password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="••••••••"
          ></input>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Endre Passord
        </button>
      </form>
    </div>
  );
}

export function ChangeUsername() {
  const [username, setUsername] = useState<string>('');
  const [confirmUsername, setConfirmUsername] = useState<string>('');

  async function userChange(e: React.SyntheticEvent) {
    e.preventDefault();
    if (username == confirmUsername) {
      console.log('done');
      const body = {
        username: username,
      };

      const res = await fetch('/api/updateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          window.location.replace('./settings');
        });
    } else {
      console.log('Usernames do not match');
    }
  }

  return (
    <div className="py-6 px-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
        Endre Brukernavn
      </h3>

      <form className="space-y-6" onSubmit={userChange}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Skriv nytt Brukernavn:
          </label>
          <input
            name="username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="obama"
          ></input>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Bekreft ny Brukernavn
          </label>
          <input
            name="user"
            id="user"
            type="user"
            value={confirmUsername}
            onChange={(e) => {
              setConfirmUsername(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="obama"
          ></input>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-bluemain hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Endre Brukernavn
        </button>
      </form>
    </div>
  );
}
