  //  Youtube Videos Data
  const videoSection = document.querySelector('.video-grid');
  const loader = document.querySelector('.loader');
  // const textData = "<%= white sauce pasta%>"
  const api  = `https://youtube.googleapis.com/youtube/v3/search?key=${YOUTUBE_APIKEY}&type=video&part=snippet&q=${encodeURIComponent(queryData)}&maxResults=50`;
 
  function getVideos(){
    fetch(api)
        .then((response) => {
          return response.json()

        }).then((data) => {
          // console.log(data);
          loader.style.display = "none";
          data.items.forEach(element => {  

            const videoItem = document.createElement('div');
            videoItem.classList.add('video-item');
            
            const thumbnail = `<a target="_blank" href="https://www.youtube.com/watch?v=${element.id.videoId}" />
                                <img src="${element.snippet.thumbnails.high.url}" alt="recipe_photo" />
                                </a>`;
            const title = `<h3>${element.snippet.title}</h3>`;
            
            videoItem.innerHTML = `${thumbnail}${title}`;
            videoSection.appendChild(videoItem);
          });    
        }).catch((error) => {
            loader.style.display = "none";
            videoSection.innerHTML = '<h3>Sorry Something went wrong!</h3>'
        })
}
document.addEventListener('DOMContentLoaded', getVideos);