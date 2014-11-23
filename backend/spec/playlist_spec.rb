require 'spec_helper'
require 'playlist'

describe Playlist do

  before(:all) do
    Track::VOTE_TTL = 2000
  end

  let(:playlist){
    Playlist.new('test-code')
  }

  let(:track_id){ 'track_id' }
  let(:track_title){ 'You and Your Folks (Besnine Remix)' }
  let(:track_artist){ 'Funkadelic' }

  let(:user_id){ 'user_id' }
  let(:other_user_id){ 'other_user_id' }

  def at_time(t)
    Time.stub!(:now).and_return( Time.at(t) )
    yield
    Time.unstub(:now)
  end


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


  describe '#scoring' do

    before(:each) do
      playlist.add_track(
        title: track_title,
        artist: track_artist,
        id: track_id
      )

      at_time(1000) { playlist.track(track_id).vote(user_id) }
      at_time(2000) { playlist.track(track_id).vote(other_user_id) }
    end

    it 'should calculate their score and mean age' do      
      at_time(2000) do
        playlist.tracks.first.score.should == 2
        playlist.tracks.first.age.should == 500
      end
    end


    it 'should ignore old votes' do
      at_time(3500) do
        playlist.tracks.first.score.should == 1
        playlist.tracks.first.age.should == 1500
      end
    end

  end

  describe '#snapshot' do

    before(:each) do
      playlist.add_track(
        title: track_title,
        artist: track_artist,
        id: track_id
      )

      at_time(1000) { playlist.track(track_id).vote(user_id) }
      at_time(2000) { playlist.track(track_id).vote(other_user_id) }
    end

    it 'should include the users vote status and date' do

      at_time(2000) do

        playlist.snapshot(user_id).should == [
          {
            title: track_title,
            artist: track_artist,
            id: track_id,
            score: 2,
            age: 500,
            liked: true,
            like_age: 1000
          }
        ]

      end

    end

    it 'should include old tracks if the user voted on them' do

      at_time(5000) do

        playlist.snapshot(user_id).should == [
          {
            title: track_title,
            artist: track_artist,
            id: track_id,
            score: 0,
            age: 2000,
            liked: false,
            like_age: 4000
          }
        ]

      end

    end

  end

end