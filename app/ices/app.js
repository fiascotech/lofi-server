'use strict'
const { readFileSync } = require('fs');
const { createHash } = require('crypto');
const { execSync } = require('child_process');

class PlaylistController {
  constructor ({playlistPath, rerunDelay}){
    if(!playlistPath || typeof playlistPath !== 'string') throw new TypeError(`Invalid playlistPath: ${playlistPath}`);
    if(isNaN(rerunDelay)) throw new TypeError(`Invalid rerunDelay: ${rerunDelay}`);

    this.playlistPath = playlistPath;
    this.rerunDelay = rerunDelay * 1000;
    this.currentFileHash = this.getCurrentPlaylistFileHash();

    this.initiateRunner();
  }
  initiateRunner(){
    let counter = 1;

    const check = () => {
      const hashResult = this.getCurrentPlaylistFileHash();
      if(this.currentFileHash !== hashResult){
        try {
          execSync('ices2 ./ices-config.xml');
          this.currentFileHash = hashResult;
          console.log(`[Run-Counter: ${counter}]: Successfully reloaded client`);
        } catch (err) {
          console.debug(`[Run-Counter: ${counter}]: Failed to reload client:`);
          console.error(err.stderr.toString());
        }
      }
      counter++;
      setTimeout(check, this.rerunDelay);
    }
    check();
  }
  getCurrentPlaylistFileHash(){
    const hash = createHash('sha256');
    const fileStream = readFileSync(this.playlistPath);
    hash.update(fileStream);

    return hash.digest('hex');
  }
}

new PlaylistController({
  playlistPath: '/home/helene/media/playlist.txt',
  rerunDelay: 5, // rerun after 5 seconds from previous run
});
