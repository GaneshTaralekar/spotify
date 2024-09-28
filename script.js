// Async function to fetch songs
async function fetchSongs() {
  let response = await fetch('http://127.0.0.1:5500/songs/');
  let a = await response.text()
  console.log(a)
  let div = document.createElement('div')
  div.innerHTML = a
  let song_list = div.getElementsByTagName("a")
  console.log(song_list)
  let songs = []
  for (let index = 0; index < song_list.length; index++) {
    let element = song_list[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href)
    }

  }
  return songs
}



async function fetchSongs_title() {
  let response = await fetch('http://127.0.0.1:5500/songs/');
  let l = await response.text()
  console.log(l)
  let div = document.createElement('div')
  div.innerHTML = l
  let song_title = div.getElementsByTagName("a")
  console.log(song_title)
  let all_song_titles = []
  for (let index = 0; index < song_title.length; index++) {
    let element = song_title[index];
    if(element.title.endsWith('.mp3')){
      all_song_titles.push(element.title)

    }


  }
  return all_song_titles

}




async function main(){
  let songs = await fetchSongs()
  console.log(songs)

  let title = await fetchSongs_title()
  console.log(title)


  let song_names = document.querySelector(".all_songs").getElementsByTagName("ul")[0]
  for (const element of title) {
    let new_element = element.split('-')[1]
    song_names.innerHTML=song_names.innerHTML + `<li> 
                                <div class="cardcontainer">
                                <img id="m_img" src="/Img/musice.svg" alt="" srcset="">
                                <div class="info">
                                    <div class="name">
                                        ${new_element}
                                    </div>
                                    <div class="artist">
                                        Ganesh
                                    </div>

                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img id="play_img"src="/Img/play1.svg" alt="" srcset="">
                                </div>
                            </div>
    
    
    
    </li>`
    
  }
document.body.addEventListener('click',()=>{
    var audio = new Audio(`${songs[0]}`);
    audio.play();
    let duration = audio.duration
    console.log(duration);
  })


// document.body.addEventListener('click',()=>{
//   var audio = new Audio(songs[0])
//   audio.play()
// })

// audio.addEventListener('onloadeddata',()=>{
//   var duration = audio.duration
//   console.log(duration)
// })
// }
}

main()