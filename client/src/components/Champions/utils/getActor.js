// local import
import actors from '../../../contents/actors';

const getActor = (actorId) => {
  return actors.filter( actor => actor.id === actorId);
};

export default getActor;
