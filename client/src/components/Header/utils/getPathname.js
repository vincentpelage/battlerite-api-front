import createBrowserHistory from 'history/createBrowserHistory';

const getPathname = () => {
  const customHistory = createBrowserHistory();
  return customHistory.location.pathname;
}

export default getPathname;
