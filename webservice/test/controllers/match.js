var expect = require('expect');

var path      = require('../../utils/path.js')
var envConfig = require(path.config + '/env')

var matchListController = require(path.controllers + '/matchList')

var req, res, next;

beforeEach(function() {
  req = {
    query: { region: 'na' },
    params: { matchId: '99' }
  };

  res = {
    data: {
      matches : [
        {lane: 'MID'},
        {lane: 'TOP'},
        {lane: 'BOTTOM'},
        {lane: 'JUNGLE'},
        {lane: 'MID'},
        {lane: 'TOP'}
      ]
    },
    dataSource: undefined
  };

  next = function(){};
});

describe('Controllers: Match', function() {
  it('should Match dont touch res.data (Internal)', function () {
	  matchListController(req, res, next)

    expect(res.data).toEqual(
      {
        matches : [
          {lane: 'MID'},
          {lane: 'TOP'},
          {lane: 'BOTTOM'},
          {lane: 'JUNGLE'},
          {lane: 'MID'},
          {lane: 'TOP'}
        ]
      }
    )
  });

  it('should Match update res.data with lane count (External)', function () {
    res.dataSource = 'external'

    matchListController(req, res, next)

    expect(res.data).toEqual(
      {
        matches : [
          {lane: 'MID'},
          {lane: 'TOP'},
          {lane: 'BOTTOM'},
          {lane: 'JUNGLE'},
          {lane: 'MID'},
          {lane: 'TOP'}
        ],
        lane: {MID: 2, TOP: 2, BOTTOM: 1, JUNGLE: 1}
      }
    )
  });
});
