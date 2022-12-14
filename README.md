![license](https://img.shields.io/badge/license-MIT-blue.svg)

[![Material Kit - React](https://github.com/devias-io/material-kit-react/blob/main/public/static/thumbnail.png)](https://material-kit-react.devias.io/)

## Upgrade to PRO Version

We also have a pro version of this product which bundles even more pages and components if you want
to save more time and design efforts :)

| Free Version (this one)          | [Material Kit Pro - React](https://material-ui.com/store/items/devias-kit-pro/) |
| -------------------------------- | :------------------------------------------------------------------------------ |
| **9** Demo Pages                 | **40+** demo pages                                                              |
| ✔ Authentication with **Zalter** | ✔ Authentication with **Amplify**, **Auth0**, **JWT** and **Firebase**          |
| -                                | ✔ Dark & light mode                                                             |
| -                                | ✔ TypeScript version - for Standard Plus and Extended license                   |
| -                                | ✔ Design files (sketch & figma) - for Standard Plus and Extended license        |
| -                                | ✔ Complete users flows                                                          |

## Quick start

- [Download from Github](https://github.com/sonht113/dashboard_web_movie.git)

- Make sure your Node.js and npm versions are up to date for `React 18`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

## Setup authentication (optional)

1. Sign in on **Zalter Dashboard** (https://dashboard.zalter.com) and create your **Zalter project**.

2. Open your project settings and activate **Email Magic Link** authentication.
   This authentication method requires `redirect URIs` setup, so while in development you need to add `http://localhost:3000/sign-in/confirm`.
   For production replace `localhost:3000` with your own domain.

3. Copy `.env.example` file and rename it to `.env`

4. Open `.env` file and enable the Zalter authentication, then set your own Zalter project ID.

```bash
NEXT_PUBLIC_ENABLE_ZALTER_AUTH="true"
NEXT_PUBLIC_ZALTER_PROJECT_ID="<your-project-id>"
```

## File Structure

Within the download you'll find the following directories and files:

```
material-kit-react

┌── .env.example
├── .eslintrc.json
├── .gitignore
├── CHANGELOG.md
├── LICENSE.md
├── next.config.js
├── package.json
├── README.md
├── public
└── src
	├── __mocks__
	├── components
	├── icons
	├── lib
	├── theme
	├── utils
	└── pages
		├── 404.js
		├── _app.js
		├── _document.js
		├── account.js
		├── movies-manage.js
		├── theater-manage.js
		├── schedule-manage.js
		├── index.js
		├── index.js
		├── products.js
		├── register.js
		└── settings.js
		└── sign-in
			├── confirm.js
			└── index.js
```
