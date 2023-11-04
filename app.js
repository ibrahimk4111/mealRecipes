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
async function newElementCreate(apiUrl) {
  try {
    const mealsData = await fetchedFunc(apiUrl);
    let elements = "";
    // Populate the categories list
    mealsData
      ? mealsData.meals.map((meal) => {
          elements += `
        <div class="relative h-auto w-full flex flex-col justify-start bg-white rounded-md overflow-hidden">
            <div class="group h-full w-full object-center relative cursor-pointer group-hover:overflow-hidden overflow-hidden">
                <div 
                  class="group-hover:bg-black group-hover:bg-opacity-30 w-full h-full absolute top-0 left-0 flex items-center justify-center transition-all duration-500 ease-in" 
                  data-card-id=${meal.idMeal}>
                  <img data-card-id=${meal.idMeal} src="./images/external-link.png" alt="link-icon" class="w-5 h-5 scale-0 group-hover:scale-100 transition-all duration-300 ease-in" >
                </div>
                <img src=${meal.strMealThumb} class="max-h-full max-w-full object-cover" alt="...">
            </div>
            <p class="text-center p-2" data-card-id=${meal.idMeal}>${meal.strMeal}</p>
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
window.addEventListener("onload", newElementCreate(apiUrl));

// fetching data according to inputed text
function inputedText() {
  const apiUrl1 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealInput.value}`;
  newElementCreate(apiUrl1);
}
// fetching data according to selected text
function clearSelection() {
  if (mealInput.value.length == 0) {
    mealSelected.value = "";
  }
}

// fetching data according to selected text
function selectedText() {
  console.log(mealSelected.value);
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
    const cardInfo = await fetchedFunc(apiUrlForSingleData);

    // let elements = "";
    // // Populate the categories list
    // cardInfo
    //   ? cardInfo.meals.map((meal) => {
    //       elements += `
    //     <div class="relative h-auto w-full flex flex-col justify-start bg-white rounded-md overflow-hidden">
    //         <div class="group h-full w-full object-center relative cursor-pointer group-hover:overflow-hidden overflow-hidden">
    //             <li 
    //               class="group-hover:bg-black group-hover:bg-opacity-30 w-full h-full absolute top-0 left-0 flex items-center justify-center transition-all duration-500 ease-in" >
    //               <a href="./singleCard.html">
    //                 <img src="./images/external-link.png" alt="link-icon" class="z-10 w-5 h-5 scale-0 group-hover:scale-100 transition-all duration-300 ease-in" >
    //               </a>
    //             </li>
    //             <img src=${meal.strMealThumb} class="max-h-full max-w-full object-cover" alt="...">
    //         </div>
    //         <p class="text-center p-2">${meal.strMeal}</p>
    //     </div>`;
    //     })
    //   : `<p>Wait</p>`;

    // mealInfoSection.innerHTML = elements;

    console.log(cardId, " : ", cardInfo.meals);
  } catch (error) {
    console.log("error : ", error);
  }
});
