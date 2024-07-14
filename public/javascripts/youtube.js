//   //  Youtube Videos Data 
//   const videoSection = document.querySelector("section")
//   const loader = document.querySelector('.container');

//   // const textData = "<%= white sauce pasta%>"
//   const api  = `https://youtube.googleapis.com/youtube/v3/search?key=${YOUTUBE_APIKEY}&type=video&part=snippet&q=${encodeURIComponent(queryData)}&maxResults=50`;
 
//   function getVideos(){
//     fetch(api)
//         .then((response) => {
//           return response.json()

//         }).then((data) => {
//           console.log(data);
//           loader.style.display = "none";
//           data.items.forEach(element => {
//             videoSection.innerHTML += `<a target="_blank" href="https://www.youtube.com/watch?v=${element.id.videoId}" class="yt-video"/>
//                         <img src="${element.snippet.thumbnails.high.url}" alt="recipe_photo" />
//                         <h3>${element.snippet.title}</h3>
//                     </a>` 
//                   });       
//         }).catch((error) => {
//             loader.style.display = "none";
//             videoSection.innerHTML = '<h3>Sorry Something went wrong!</h3>'
//         })
// }
// document.addEventListener('DOMContentLoaded', getVideos);