/* global describe, it */

var DATA =  {
  kygo: {
    id: 0,
    artist: "Kyle la Grange",
    title: "Cut Your Teeth (Kygo Remix)",
    score: 3,
    age: 0.5,
    liked: true,
    like_age: 0.3
  },

  daft: {
    id: 1,
    artist: "Daft Punk",
    title: "Da Funk",
    score: 2,
    age: 0.9,
    liked: true,
    like_age: 0.7
  },

  naxxos: {
    id: 2,
    artist: "Naxxos",
    title: "New Orleans",
    score: 2,
    age: 0.1,
    liked: false,
    like_age: null
  }
};



(function () {
  'use strict';

  describe('Tracks sorter', function () {

    var sorter = new SortedTracks();

    it('should handle a load when empty', function () {
      
      var changes = sorter.load([
        DATA.naxxos,
        DATA.kygo,
        DATA.daft
      ]);

      expect(changes.length).to.eql(3);

      // All fields are here
      var naxxos = changes[1];
      expect(naxxos.artist).to.eql(DATA.naxxos.artist);
      expect(naxxos.title).to.eql(DATA.naxxos.title);
      expect(naxxos.score).to.eql(DATA.naxxos.score);
      expect(naxxos.age).to.eql(DATA.naxxos.age);
      expect(naxxos.liked).to.eql(DATA.naxxos.liked);
      expect(naxxos.like_age).to.eql(DATA.naxxos.like_age);
      expect(naxxos.id).to.eql(DATA.naxxos.id);

      // Also, indexed now
      expect(naxxos.index).to.eql(1);
    });


    it('should handle a track update', function () {

      DATA.naxxos.score = 3;

      var changes = sorter.load(DATA.naxxos);

      // Naxxos gets on top, and kygo goes down
      expect(changes.length).to.eql(2);

      var naxxos = changes[0];
      var kygo   = changes[1];

      expect(naxxos.artist).to.eql(DATA.naxxos.artist);
      expect(kygo.artist).to.eql(DATA.kygo.artist);

      expect(naxxos.index).to.eql(0);
      expect(naxxos.score).to.eql(3);
      expect(kygo.index).to.eql(1);

    });

  });

})();
