import getPathname from './getPathname';
import actors from '../../../contents/actors';

const isNotChampionUrl = () => {
  const getCurrentActor = actors.filter( actor => actor.path === getPathname());
  return (getCurrentActor.length === 0) ? true : false;
  // const regex = RegExp('champions-stats/[a-z_]+');
  // return !regex.test(getPathname());
}

export default isNotChampionUrl;
