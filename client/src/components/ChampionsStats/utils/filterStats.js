const filterStats = (match, league, championStats) => {
  let stats = {};

  switch (true) {
    case (league === 'overall' && match === 'overall'):
      return stats = {
        stats: championStats.global,
        nbMatchs: championStats.nbMatch.global
      }
    case (league === 'overall' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2,
        nbMatchs: championStats.nbMatch.league2v2
      }
    case (league === 'overall' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3,
        nbMatchs: championStats.nbMatch.league3v3
      }
    case (league === 'grand-champion' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[6],
        nbMatchs: championStats.nbMatch.globalPerLeague[6]
      }
    case (league === 'champion' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[5],
        nbMatchs: championStats.nbMatch.globalPerLeague[5]
      }
    case (league === 'diamond' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[4],
        nbMatchs: championStats.nbMatch.globalPerLeague[4]
      }
    case (league === 'platinum' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[3],
        nbMatchs: championStats.nbMatch.globalPerLeague[3]
      }
    case (league === 'gold' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[2],
        nbMatchs: championStats.nbMatch.globalPerLeague[2]
      }
    case (league === 'silver' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[1],
        nbMatchs: championStats.nbMatch.globalPerLeague[1]
      }
    case (league === 'bronze' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[0],
        nbMatchs: championStats.nbMatch.globalPerLeague[0]
      }
    case (league === 'placement' && match === 'overall'):
      return stats = {
        stats: championStats.globalPerLeague[-1],
        nbMatchs: championStats.nbMatch.globalPerLeague[-1]
      }
    case (league === 'grand-champion' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[6],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[6]
      }
    case (league === 'champion' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[5],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[5]
      }
    case (league === 'diamond' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[4],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[4]
      }
    case (league === 'platinum' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[3],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[3]
      }
    case (league === 'gold' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[2],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[2]
      }
    case (league === 'silver' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[1],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[1]
      }
    case (league === 'bronze' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[0],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[0]
      }
    case (league === 'placement' && match === '2V2'):
      return stats = {
        stats: championStats.league2v2PerLeague[-1],
        nbMatchs: championStats.nbMatch.league2v2PerLeague[-1]
      }
    case (league === 'grand-champion' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[6],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[6]
      }
    case (league === 'champion' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[5],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[5]
      }
    case (league === 'diamond' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[4],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[4]
      }
    case (league === 'platinum' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[3],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[3]
      }
    case (league === 'gold' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[2],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[2]
      }
    case (league === 'silver' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[1],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[1]
      }
    case (league === 'bronze' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[0],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[0]
      }
    case (league === 'placement' && match === '3V3'):
      return stats = {
        stats: championStats.league3v3PerLeague[-1],
        nbMatchs: championStats.nbMatch.league3v3PerLeague[-1]
      }
  }
}

export default filterStats;
