const themeToggle = document.querySelector(".theme-toggle");
const promptForm = document.querySelector(".prompt-form");
const promptInput = document.querySelector(".prompt-input");
const promptBtn = document.querySelector(".prompt-btn");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const examplePrompts = [
  "A futuristic cityscape at sunset, with flying cars and neon lights",
  "A serene mountain landscape with a crystal-clear lake and pine trees",
  "A fantasy scene featuring a dragon flying over a medieval castle",
  "A close-up portrait of a lion with a majestic mane, in black and white",
  "A vibrant underwater scene with colorful coral reefs and exotic fish",
  "A cozy cabin in the woods during autumn, with leaves falling around",
  "A surreal desert landscape with giant cacti and a purple sky",
  "A bustling market street in an ancient Middle Eastern city",
  "A futuristic robot chef preparing a gourmet meal in a high-tech kitchen",
  "A magical forest with glowing plants and mythical creatures",
  "A steampunk airship flying over a Victorian-era city",
  "A peaceful beach at sunrise with palm trees and gentle waves",
  "A dramatic stormy sky over a rugged coastline with crashing waves",
];

// Initialize theme based on saved preference or system setting
(() => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const isDarkTheme =
    savedTheme === "dark" || (!savedTheme && systemPrefersDark);
  document.body.classList.toggle("dark-theme", isDarkTheme);
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
})();

// Toggle between light and dark themes
const toggleTheme = () => {
  const isDarkTheme = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  themeToggle.querySelector("i").className = isDarkTheme
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
};

const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
const MODEL_URL = `https://router.huggingface.co/nscale/v1/images/generations/${selectedModel}`;

try {
const response = await fetch(MODEL_URL, {
    headers: {
				Authorization: `Bearer ${({}).HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
});

const result = await response.blob();

} catch (error) {
  console.error("Error generating images:", error);   
}

// Create placeholder image cards with loading spinners
const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
    gridGallery.innerHTML = ""; // Clear existing images

    for (let i = 0; i < imageCount; i++) {
        gridGallery.innerHTML += `<div class="img-card loading" id = "img-card-${i}" style="aspect-ratio: ${aspectRatio}">
                <div class="spinner"></div>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p class="status-text">Generating...</p>
              </div>
              <img src="test.png" class="result-img" />
            </div>`;
    }

    generateImages(selectedModel, imageCount, aspectRatio, promptText);
};


// Handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  
// Get form values
  const selectedModel = modelSelect.value;
  const imageCount = parseInt(countSelect.value) || 1;
  const aspectRatio = ratioSelect.value || "1/1";
  const promptText = promptInput.value.trim();

  createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};

// fill prompt input with a random example prompt
promptBtn.addEventListener("click", () => {
  const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.value = prompt;
  promptInput.focus();
});

promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);
