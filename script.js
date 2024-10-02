// Async function to fetch songs
let song_list;
let all_song_links;
let songs=[]
let current_song = new Audio(songs[0])

function secondsToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  // Add leading zero if necessary for seconds
  // const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

  let formattedSeconds;

if (remainingSeconds < 10) {
    formattedSeconds = '0' + remainingSeconds;
} else {
    formattedSeconds = remainingSeconds;
}

  
  return minutes + ':' + formattedSeconds;
}



async function fetchSongs() {
  let response = await fetch('http://127.0.0.1:5500/songs/');
  let a = await response.text()
  console.log(a)
  let div = document.createElement('div')
  div.innerHTML = a
  song_list = div.getElementsByTagName("a")
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

async function fetchSongs_links() {
  let response = await fetch('http://127.0.0.1:5500/songs/');
  let l = await response.text()
  console.log(l)
  let div = document.createElement('div')
  div.innerHTML = l
  let song_link = div.getElementsByTagName("a")
  console.log(song_link)
  all_song_links = []
  for (let index = 0; index < song_link.length; index++) {
    let element = song_link[index];
    if(element.href==true){
      all_song_titles.push(element.href)
    }
  }
  return all_song_links

}

function play_music(track){
  current_song.src = track
  // let audio = new Audio(track)
  current_song.play()
  document.getElementById("play").src="/Img/pasue.svg"

  document.querySelector(".songinfo").innerHTML="Track"
  document.querySelector(".songtime").innerHTML="00:00"

  document.querySelector('.songinfo').innerHTML= decodeURI(track)
  document.querySelector(".songtime").style.visibility="visible"
  document.querySelector(".songinfo").style.visibility="visible"



}

async function main(){
songs = await fetchSongs()
  current_song.src=songs[0]

  console.log(songs)
  let song_names = document.querySelector(".all_songs").getElementsByTagName("ul")[0]
  console.log(song_names)

  for(const element of songs){
    console.log(element)
    

    
    song_names.innerHTML=song_names.innerHTML + `<li> 
                                <div class="cardcontainer">
                                <img id="m_img" src="/Img/musice.svg" alt="" srcset="">
                                <div class="info">
                                    <div class="name">
                                        ${element.replaceAll("%20"," ")}
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

    let all_songs = Array.from(document.querySelector(".all_songs").getElementsByTagName("li")).forEach((e)=>{
      e.addEventListener("click",(element)=>{
        console.log(e.getElementsByTagName("div")[2].innerHTML.trim())
        play_music(e.getElementsByTagName("div")[2].innerHTML.trim())
      })


    })


    





  }

  document.getElementById('play').addEventListener("click",()=>{
    if(current_song.paused){
      current_song.play()
      play.src="/Img/pasue.svg"
    }
    else{
      current_song.pause()
      play.src="/Img/play1.svg"
    }
  })

  // time update event 

  current_song.addEventListener("timeupdate",(e)=>{
    console.log(current_song.currentTime,current_song.duration)
    // formatSeconds(current_song.currentTime)
    document.querySelector('.songtime').innerHTML=`${secondsToMMSS(current_song.currentTime)}/${secondsToMMSS(current_song.duration)}`

    document.querySelector('.circle').style.left=(current_song.currentTime/current_song.duration)*100+"%"

  })

// adding event listener to sickbar

document.querySelector(".seekbar").addEventListener('click',(e)=>{
  let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
  document.querySelector(".circle").style.left = percent+"%"
  current_song.currentTime = (percent*current_song.duration)/100
})

// adding event listener on hambargar

document.querySelector("#hambargar").addEventListener("click",(e)=>{
  document.querySelector(".container1").style.left="0"
  document.querySelector(".bottompart").style.visibility="hidden"
  document.querySelector(".container1").style.visibility="visible"



})

// adding event listener to close button

document.querySelector("#close_img").addEventListener("click",(e)=>{
  console.log("closed")
  document.querySelector(".container1").style.left="-130%"
  document.querySelector(".container1").style.zindex="-1"
  document.querySelector(".playbar").style.zindex="10"
  document.querySelector(".bottompart").style.visibility="visible"
  
})


document.querySelector("#next").addEventListener("click",(e)=>{
  console.log(songs)
  let index = songs.indexOf(current_song.src)
  console.log(length)
  if(index+1<songs.length-1){
    play_music(songs[index+1])

    
  }
  else{
    console.log("Songs over")
  }
  })



  document.querySelector("#previous").addEventListener("click",(e)=>{
    console.log(songs)
    let index = songs.indexOf(current_song.src)
    
    if(index+1>=0){
      play_music(songs[index-1])
      
    }
    else{
      console.log("this is the frist song")
    }
    })



    // working on volume bottom 

let a  = document.getElementById("v_range")
console.log(a)
a.addEventListener("change",(e)=>{
  let song_volume = e.target.value

  current_song.volume = parseInt(song_volume)/100
})

  
}
    










main()
