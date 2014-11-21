require 'spec_helper'
require 'playlist'

describe Playlist do

  describe '#add_track' do

    it 'should add the track' do

      playlist.add_track(
        title: track_title,
        artist: track_artist,
        id: track_id
      )

      playlist.tracks.count.should == 1
      playlist.tracks.first.id.should == track_id
      playlist.tracks.first.title.should == track_title
      playlist.tracks.first.artist.should == track_artist

    end

    it 'should add it once' do

      2.times do
        playlist.add_track(
          title: track_title,
          artist: track_artist,
          id: track_id
        )
      end

      playlist.tracks.count.should == 1

    end

  end

  describe '#vote' do

    before(:each) do
      playlist.add_track(
        title: track_title,
        artist: track_artist,
        id: track_id
      )
    end

    it 'should count a vote' do

      playlist.vote(user_id, track_id)

      playlist.track(track_id).votes.count.should == 1
      playlist.track(track_id).votes.first.user_id == user_id

    end

    it 'should count it once' do

      2.times do
        playlist.vote(user_id, track_id)
      end

      playlist.track(track_id).votes.count.should == 1

    end

    it 'should store the vote time' do

      at_time(1000) { playlist.vote(user_id, track_id) }
      playlist.tracks.first.votes.first.time.should == 1000

      at_time(2000) { playlist.vote(user_id, track_id) }
      playlist.tracks.first.votes.first.time.should == 2000

    end

  end

  describe '#scoring' do

    before(:each) do
      playlist.add_track(
        title: track_title,
        artist: track_artist,
        id: track_id
      )

      at_time(1000) { playlist.vote(user_id, track_id) }
      at_time(2000) { playlist.vote(other_user_id, track_id) }
    end

    it 'should calculate their score and mean age' do      
      at_time(2000) do
        playlist.tracks.first.score.should == 2
        playlist.tracks.first.age.should == 500
      end
    end


    it 'should ignore old votes' do
      at_time(3000) do
        playlist.tracks.first.score.should == 1
        playlist.tracks.first.age.should == 1000
      end
    end

  end

  describe '#snapshot' do

    it 'should include the users vote date' do
      pending
    end

    it 'should include old tracks if the user voted on them' do
      pending
    end

  end

end