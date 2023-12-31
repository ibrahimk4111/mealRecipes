const mealList = document.getElementById("meal-list");
const mealInfoSection = document.getElementById("meal-info-section");
const mealInput = document.getElementById("meal-inputed");
const mealSelected = document.getElementById("meal-select");
const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealInput.value}`;

// Function for fetching data
async function fetchedFunc(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status code: ${response.status}`);
  }
  const data = await response.json();
  // Extract categories from the response data
  return data;
}

// Function to create new card as per fetched data
async function newElementCreate(x) {
  try {
    const mealsData = await fetchedFunc(x);
    let elements = "";
    // Populate the categories list
    mealsData
      ? mealsData.meals.map((meal) => {
          elements += `
          <div class="relative w-full h-auto flex flex-col justify-between bg-white rounded-md overflow-hidden" data-card-id=${meal.idMeal}>
            <div class="group h-auto w-full object-center relative cursor-pointer group-hover:overflow-hidden overflow-hidden" data-card-id=${meal.idMeal}>
                <div 
                  class="group-hover:bg-black group-hover:bg-opacity-30 w-full h-full absolute top-0 left-0 flex items-center justify-center transition-all duration-500 ease-in" 
                  data-card-id=${meal.idMeal}>
                  <img data-card-id=${meal.idMeal} src="./images/external-link.png" alt="link-icon" class="w-5 h-5 scale-0 group-hover:scale-100 transition-all duration-300 ease-in" >
                </div>
                <img src=${meal.strMealThumb} class="max-h-full max-w-full object-cover" alt="...">
            </div>
            <div class="text-center p-2 bg-white h-auto" data-card-id=${meal.idMeal}>${meal.strMeal}</div>
            </div>`;
        })
      : `<p>Wait</p>`;

    mealList.innerHTML = elements;
  } catch (error) {
    // const errorDiv = document.createElement('div')
    const newElement = `
      <div class="flex flex-col items-center justify-center gap-3 col-span-12">
        <span style='font-size:200px;'>&#128577;</span>
        <p class="w-full text-center text-xl">এই খাবারটি এখন নেই। দয়া করে অন্য একটি খাবার পছন্দ করুন। &#128578;</p>
      </div>
    `;
    mealList.innerHTML = newElement;
    console.error("Error", error);
  }
}

newElementCreate(apiUrl);

// fetching data according to inputed text
function inputedText() {
  const apiUrl1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealInput.value}`;
  newElementCreate(apiUrl1);

  if (mealInput.value.length > 0) {
    mealSelected.value = "";
  } else {
    mealSelected.value = mealSelected.value;
  }
}

// fetching data according to selected text
function selectedText() {
  if (mealSelected.value) {
    mealInput.value = "";
  }
  const apiUrl1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealSelected.value}`;
  newElementCreate(apiUrl1);
}

// category options fetching and creating options
const categoriesUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
async function newOptionCreate(categoriesUrl) {
  try {
    const categoriesData = await fetchedFunc(categoriesUrl);
    let elements = "";
    // console.log(categoriesData.categories)

    categoriesData.categories.map((category) => {
      elements += `
        <option
          class="bg-white px-2"
          value=${category.strCategory}
        >
          ${category.strCategory}
        </option>`;
    });

    mealSelected.innerHTML = elements;
    console.log(mealInput.value);
  } catch (error) {
    console.log("Error:", error);
  }
}
window.addEventListener("onload", newOptionCreate(categoriesUrl));

// getting clicked card information
mealList.addEventListener("click", async (event) => {
  try {
    const target = event.target;
    console.log(target);
    const cardId = target.getAttribute("data-card-id");

    let apiUrlForSingleData = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${cardId}`;
    const mealsData = await fetchedFunc(apiUrlForSingleData);
    let elements = "";
    // Populate the categories list
    mealsData.meals.map((meal) => {
      // md:top-[20vh] top-[2vh] md:left-[12vw] left-[2vw] md:right-[12vw] right-[2vw]
      elements += `
          <div class="fixed bg-white w-full h-full top-0 left-0" id="modalBg"></div>
          <div class="fixed top-0 left-0 p-5" id="modalContent">
            <div class="relative flex justify-center items-center w-auto h-auto md:border-2 rounded-md">
              <div class="absolute top-5 right-5 hover:bg-black w-6 line-h-8 hover:text-white text-center z-100 cursor-pointer rounded-md font-bold" onclick="backFunc()">X</div>
              <div class="grid md:grid-cols-3 grid-cols-1 gap-5">
                <div class="relative w-full h-full overflow-hidden rounded-l-md flex justify-center items-center">
                  <img src=${meal.strMealThumb} class="max-h-full md:w-full w-80 object-cover object-center" alt="...">
                </div>
                <div class=" flex flex-col justify-center items-start w-full h-auto col-span-2 rounded-r-md px-3 py-2 gap-1">
                  <h2 class='text-2xl font-bold'>${meal.strMeal}</h2>
                  <hr class="h-2" />
                  <div class="flex flex-col justify-center items-start gap-3">
                    <p>Region : ${meal.strArea}</p>
                    <p>Category : ${meal.strCategory}</p>
                    <p class="text-justify">${meal.strInstructions}</p>
                    <a href=${meal.strYoutube} target="_blank">
                      <img src="./images/icons8-youtube.gif" alt="...">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

      console.log(meal);
    });

    mealInfoSection.innerHTML = elements;
    mealInfoSection.classList.remove("hidden")
    document.body.style.overflowY = "hidden";
  } catch (error) {
    console.log("error : ", error);
  }
});

function backFunc(){
  mealInfoSection.classList.add("hidden")
}