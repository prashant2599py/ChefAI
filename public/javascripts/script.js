function displayRecipe(response) {
    new Typewriter("#recipe", {
      strings: response.data.answer,
      autoStart: true,
      delay: 1,
      cursor: "",
    });
  }
  
  function generateRecipe(event) {
    event.preventDefault();
    let instructionInput = document.querySelector("#inputvalue");
    let api_Key = API_KEY;
    let prompt = `User instructions: Generate a recipe for ${instructionInput.value}`;
    let context =
      "You are a renowned chef who knows all the recipes around the world. Follow the user instructions clearly to generate a recipe. First, write the 'title' of the recipe inside a <h2> element. Secondly, summarize the 'cooking duration' and 'serving size' inside a standard <p> element. Thirdly, begin with the 'Ingredients' header inside a <h3> element, list the required ingredients in bullet point symbol, and separate each line item with a <br/>. Next, begin with the 'Instructions' header inside a <h3> element, list the recipe step-by-step in numbered list format, and separate each step with a <br/>. Lastly, sign off the recipe with 'SheCodes AI Recipe' inside an <em> element at the end of the recipe after a <br/>.";
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${api_Key}`;
  
    let recipeElement = document.querySelector("#recipe");
    recipeElement.classList.remove("hidden");
    recipeElement.innerHTML = `<div class="blink"> 👨🏻‍🍳 Generating a recipe for ${instructionInput.value}...</div>`;
  
    axios.get(apiUrl).then(displayRecipe);
  }
  
  let recipeForm = document.querySelector("#recipe-form");
  recipeForm.addEventListener("submit", generateRecipe);

  const videoSection = document.querySelector("section")
  const loader = document.querySelector('.container');

  let api;
    document.querySelector('button').addEventListener('click', function(event){
        event.preventDefault();
        let youtube_api_key = YOUTUBE_APIKEY;
        let youtube_uri = `https://youtube.googleapis.com/youtube/v3/search?key=${youtube_api_key}&type=video&part=snippet`
       
        console.log(youtube_uri);

        let text = document.getElementById('inputvalue').value;
        
        api = `${youtube_uri}&q=${encodeURIComponent(text)}`;
        console.log(api);

        loader.style.display = "block";

        setTimeout(getVideos, 3000)
    })

    function getVideos(){
        fetch(api)
        .then((response) => {
          return response.json()

        }).then((data) => {
          console.log(data);
          console.log("data fetched");
            loader.style.display = "none";       
        }).catch((error) => {
            loader.style.display = "none";
            videoSection.innerHTML = '<h3>Sorry Something went wrong!</h3>'
        })
    }