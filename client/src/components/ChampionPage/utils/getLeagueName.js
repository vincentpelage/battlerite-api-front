const getLeagueName = (LeagueId) => {
  let LeagueName = '';

  switch (LeagueId) {
    case '-1':
      return LeagueName = 'placement';
    case '0':
      return LeagueName = 'bronze';
    case '1':
      return LeagueName = 'silver';
    case '2':
      return LeagueName = 'gold';
    case '3':
      return LeagueName = 'platinum';
    case '4':
      return LeagueName = 'diamond';
    case '5':
      return LeagueName = 'champion';
    case '6':
      return LeagueName = 'grand champion';
  }
}

export default getLeagueName;
