const mealInput = document.getElementById("meal-input");
const apiUrl =
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealInput.value}`;

async function fetchedFunc(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status code: ${response.status}`);
  }
  const data = await response.json();
  // Extract categories from the response data
  return data;
}

// Function to fetch data and populate the categories list
async function fetchCategories(apiUrl) {
  try {
    const mealsData = await fetchedFunc(apiUrl);

    const mealList = document.getElementById("meal-list");
    let elements = "";

    // Populate the categories list
    mealsData.meals.map((meal) => {
      elements += `
        <div class="relative h-80 w-full flex flex-col justify-start bg-white rounded-md overflow-hidden">
            <div class="group h-60 w-full object-center relative cursor-pointer">
                <p class="group-hover:bg-black group-hover:bg-opacity-30 w-60 h-full absolute top-0 left-0 flex items-center justify-center transition-all duration-500 ease-in">
                    <svg class="scale-0 group-hover:scale-100 transition-all duration-300 ease" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,255.998,255.998">
                    <g fill-opacity="0" fill="#dddddd" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,255.998v-255.998h255.998v255.998z" id="bgRectangle"></path></g><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M33.40625,0c-0.55078,0.05078 -0.95703,0.54297 -0.90625,1.09375c0.05078,0.55078 0.54297,0.95703 1.09375,0.90625h12.96875l-20.875,20.90625c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l20.90625,-20.875v12.96875c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-16.40625h-16.40625c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM2,10c-0.52344,0 -1.05859,0.18359 -1.4375,0.5625c-0.37891,0.37891 -0.5625,0.91406 -0.5625,1.4375v36c0,0.52344 0.18359,1.05859 0.5625,1.4375c0.37891,0.37891 0.91406,0.5625 1.4375,0.5625h36c0.52344,0 1.05859,-0.18359 1.4375,-0.5625c0.37891,-0.37891 0.5625,-0.91406 0.5625,-1.4375v-30c0.00391,-0.35937 -0.18359,-0.69531 -0.49609,-0.87891c-0.3125,-0.17969 -0.69531,-0.17969 -1.00781,0c-0.3125,0.18359 -0.5,0.51953 -0.49609,0.87891v30h-36v-36h30c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609z"></path></g></g>
                    </svg>
                </p>
                <img src=${meal.strMealThumb} class="max-h-full max-w-full object-cover" alt="...">
            </div>
            <p class="text-center p-2 ">${meal.strMeal}</p>
        </div>`;
      console.log(meal.strMeal);
    });

    mealList.innerHTML = elements;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the fetchCategories function to populate the list
fetchCategories(apiUrl);

function inputedText () {
    const apiUrl1 =
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealInput.value}`; 
    fetchCategories(apiUrl1);       
}