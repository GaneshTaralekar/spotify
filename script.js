// Async function to fetch songs
async function fetchSongs() {
      let response = await fetch('http://127.0.0.1:5500/songs/');
      let a  = await response.text()
      console.log(a)
      console.log('hiiii')

}
fetchSongs()