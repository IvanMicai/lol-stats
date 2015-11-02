var expect = require('expect');

var path      = require('../../utils/path.js')
var envConfig = require(path.config + '/env')

var summonerController = require(path.controllers + '/summoner')

var req, res, next;

beforeEach(function() {
  req = {
    query: { region: 'na' },
    params: { name: 'Summoner' }
  };

  res = {
    data: {
      summoner : {
        id: 1999
      }
    },
    dataSource: undefined
  };

  next = function(){};
});

describe('Controllers: Summoner', function() {
  it('should summoner dont touch res.data (Internal)', function () {
	  summonerController(req, res, next)

    expect(res.data).toEqual(
      {
        summoner : {
          id: 1999
        },
        nameLowercase: 'summoner'
      }
    )
  });

  it('should summoner update res.data move name key to nameLowercase property (External)', function () {
    res.dataSource = 'external'

    summonerController(req, res, next)

    expect(res.data).toEqual(
      {
        id: 1999,
        summonerId: 1999,
        nameLowercase: 'summoner'
      }
    )
  });
});
