var path     = require('path')
var rootPath = path.resolve(__dirname + '/..')

var championsRulesMap = {
  "1": ["Mage"],
  "2": ["Fighter","Tank"],
  "3": ["Tank","Mage"],
  "4": ["Mage"],
  "5": ["Fighter","Assassin"],
  "6": ["Marksman","Fighter"],
  "7": ["Assassin","Mage"],
  "8": ["Mage","Tank"],
  "9": ["Mage","Support"],
  "10": ["Fighter","Support"],
  "11": ["Assassin","Fighter"],
  "12": ["Tank","Support"],
  "13": ["Mage","Fighter"],
  "14": ["Tank","Fighter"],
  "15": ["Marksman"],
  "16": ["Support","Mage"],
  "17": ["Marksman","Assassin"],
  "18": ["Marksman","Assassin"],
  "19": ["Fighter","Tank"],
  "20": ["Support","Fighter"],
  "21": ["Marksman"],
  "22": ["Marksman","Support"],
  "23": ["Fighter","Assassin"],
  "24": ["Fighter","Assassin"],
  "25": ["Mage","Support"],
  "26": ["Support","Mage"],
  "27": ["Tank","Fighter"],
  "28": ["Assassin","Mage"],
  "29": ["Marksman","Assassin"],
  "30": ["Mage"],
  "31": ["Tank","Mage"],
  "32": ["Tank","Mage"],
  "33": ["Tank","Fighter"],
  "34": ["Mage","Support"],
  "35": ["Assassin"],
  "36": ["Fighter","Tank"],
  "37": ["Support","Mage"],
  "38": ["Assassin","Mage"],
  "39": ["Fighter","Assassin"],
  "40": ["Support","Mage"],
  "41": ["Fighter"],
  "42": ["Marksman"],
  "43": ["Mage","Support"],
  "44": ["Support","Fighter"],
  "45": ["Mage"],
  "48": ["Fighter","Tank"],
  "50": ["Mage","Fighter"],
  "51": ["Marksman"],
  "53": ["Tank","Fighter"],
  "54": ["Tank","Fighter"],
  "55": ["Assassin","Mage"],
  "56": ["Assassin","Fighter"],
  "57": ["Tank","Mage"],
  "58": ["Fighter","Tank"],
  "59": ["Tank","Fighter"],
  "60": ["Mage","Fighter"],
  "61": ["Mage","Support"],
  "62": ["Fighter","Tank"],
  "63": ["Mage"],
  "64": ["Fighter","Assassin"],
  "67": ["Marksman","Assassin"],
  "68": ["Fighter","Mage"],
  "69": ["Mage"],
  "72": ["Fighter","Tank"],
  "74": ["Mage","Support"],
  "75": ["Fighter","Tank"],
  "76": ["Assassin","Fighter"],
  "77": ["Fighter","Tank"],
  "78": ["Fighter","Assassin"],
  "79": ["Fighter","Mage"],
  "80": ["Fighter","Assassin"],
  "81": ["Marksman","Mage"],
  "82": ["Fighter","Mage"],
  "83": ["Fighter","Mage"],
  "84": ["Assassin"],
  "85": ["Mage","Marksman"],
  "86": ["Fighter","Tank"],
  "89": ["Tank","Support"],
  "90": ["Mage","Assassin"],
  "91": ["Assassin","Fighter"],
  "92": ["Fighter","Assassin"],
  "96": ["Marksman","Mage"],
  "98": ["Tank","Fighter"],
  "99": ["Mage","Support"],
  "101": ["Mage","Assassin"],
  "102": ["Fighter","Tank"],
  "103": ["Mage","Assassin"],
  "104": ["Marksman"],
  "105": ["Assassin","Fighter"],
  "106": ["Fighter","Tank"],
  "107": ["Assassin","Fighter"],
  "110": ["Marksman","Mage"],
  "111": ["Tank","Fighter"],
  "112": ["Mage"],
  "113": ["Tank","Fighter"],
  "114": ["Fighter","Assassin"],
  "115": ["Mage"],
  "117": ["Support","Mage"],
  "119": ["Marksman"],
  "120": ["Fighter","Tank"],
  "121": ["Assassin","Fighter"],
  "122": ["Fighter","Tank"],
  "126": ["Fighter","Marksman"],
  "127": ["Mage"],
  "131": ["Fighter","Mage"],
  "133": ["Marksman","Fighter"],
  "134": ["Mage","Support"],
  "143": ["Mage","Support"],
  "150": ["Fighter","Tank"],
  "154": ["Tank","Fighter"],
  "157": ["Fighter","Assassin"],
  "161": ["Mage"],
  "201": ["Support","Tank"],
  "203": ["Marksman"],
  "222": ["Marksman"],
  "223": ["Support","Tank"],
  "236": ["Marksman"],
  "238": ["Assassin","Fighter"],
  "245": ["Assassin","Fighter"],
  "254": ["Fighter","Assassin"],
  "266": ["Fighter","Tank"],
  "267": ["Support","Mage"],
  "268": ["Mage","Marksman"],
  "412": ["Support","Fighter"],
  "421": ["Fighter"],
  "429": ["Marksman"],
  "432": ["Support","Mage"]
}

module.exports = {
  rules: function(summonerChampions){
    var currentRules = [];
    var totalRules = {
      Mage: 0,
      Tank: 0,
      Fighter: 0,
      Assassin: 0,
      Support: 0,
      Marksman: 0
    }

    for (var i = 0; i < summonerChampions.data.champions.length; i++) {

      rules = championsRulesMap[summonerChampions.data.champions[i].id]

      if(rules){
        for (var k = rules.length - 1; k >= 0; k--) {
          totalRules[rules[k]] += summonerChampions.data.champions[i].stats.totalSessionsPlayed
        }
      }
    }

    totalRulesArray = [];

    totalRulesArray.push({ name: 'Mage', value: totalRules.Mage });
    totalRulesArray.push({ name: 'Tank', value: totalRules.Tank });
    totalRulesArray.push({ name: 'Fighter', value: totalRules.Fighter });
    totalRulesArray.push({ name: 'Assassin', value: totalRules.Assassin });
    totalRulesArray.push({ name: 'Support', value: totalRules.Support });
    totalRulesArray.push({ name: 'Marksman', value: totalRules.Marksman });

    return totalRulesArray

  },
  pickRate: function(summonerChampions){
    var total = undefined
    var i

    //Findind and remove Total
    for (i = 0; i < summonerChampions.data.champions.length || total === undefined; i++) {
      if(summonerChampions.data.champions[i].id == "0"){
        total = summonerChampions.data.champions.splice(i, 1)[0];
      }
    };

    for (i = 0; i < summonerChampions.data.champions.length; i++) {
      summonerChampions.data.champions[i].stats.pickRate = (summonerChampions.data.champions[i].stats.totalSessionsPlayed/total.stats.totalSessionsPlayed*100)
    };

    return total
  },
  addTags: function(summonerChampions){

    for (var i = 0; i < summonerChampions.data.champions.length; i++) {
      summonerChampions.data.champions[i].tags = championsRulesMap[summonerChampions.data.champions[i].id]
    }

    return summonerChampions.data.champions
  }
}
