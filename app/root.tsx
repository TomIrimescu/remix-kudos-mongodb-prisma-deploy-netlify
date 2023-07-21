import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import styles from './styles/app.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Remix KUdos App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html className='bg-blue-600' lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
