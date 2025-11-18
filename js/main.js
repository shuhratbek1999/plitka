const sliderInner = document.querySelector(".our-works__slider-inner");
const originalSlides = Array.from(
  document.querySelectorAll(".our-works__slide")
);
const reviewsInner = document.querySelector(".clients__slider-inner");
const reviewSlides = document.querySelectorAll(".clients__list");
let currentIndex = 0,
  mobileMode = false,
  reviewIndex = 0,
  reviewMobile = false;
function buildMobileSlides() {
  sliderInner.innerHTML = "";
  mobileMode = true;

  originalSlides.forEach((slide) => {
    const boxes = slide.querySelectorAll(".our-works__box");
    const title = slide.querySelector(".our-works__slide-title").textContent;

    boxes.forEach((box) => {
      const newSlide = document.createElement("div");
      newSlide.classList.add("our-works__slide");
      const clonedBox = box.cloneNode(true);

      const newTitle = document.createElement("h4");
      newTitle.className = "our-works__slide-title";
      newTitle.textContent = title;

      newSlide.appendChild(clonedBox);
      newSlide.appendChild(newTitle);

      sliderInner.appendChild(newSlide);
    });
  });
}

function buildDesktopSlides() {
  sliderInner.innerHTML = "";
  mobileMode = false;

  originalSlides.forEach((slide) => {
    sliderInner.appendChild(slide.cloneNode(true));
  });
}

function rebuildSlides() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile && !mobileMode) {
    buildMobileSlides();
    currentIndex = 0;
    updateSliderPosition();
  } else if (!isMobile && mobileMode) {
    buildDesktopSlides();
    currentIndex = 0;
    updateSliderPosition();
  }
}

function updateSliderPosition() {
  sliderInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// --- NEXT ---
document.querySelector(".our-works__next").addEventListener("click", () => {
  const total = sliderInner.children.length;
  currentIndex = (currentIndex + 1) % total;
  updateSliderPosition();
});

// --- PREV ---
document.querySelector(".our-works__prev").addEventListener("click", () => {
  const total = sliderInner.children.length;
  currentIndex = (currentIndex - 1 + total) % total;
  updateSliderPosition();
});

function updateReviewMode() {
  reviewMobile = window.innerWidth <= 768;

  reviewSlides.forEach((group) => {
    const items = group.querySelectorAll(".clients__item");

    if (reviewMobile) {
      items.forEach((item, i) => {
        item.style.display = i === 0 ? "block" : "none";
      });
    } else {
      items.forEach((item) => {
        item.style.display = "block";
      });
    }
  });

  updateReviewPosition();
}

function updateReviewPosition() {
  reviewsInner.style.transform = `translateX(-${reviewIndex * 100}%)`;
}

document.querySelector(".clients__next").addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % reviewSlides.length;
  updateReviewPosition();
});

document.querySelector(".clients__prev").addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
  updateReviewPosition();
});
window.addEventListener("load", rebuildSlides);
window.addEventListener("resize", rebuildSlides);
window.addEventListener("load", updateReviewMode);
window.addEventListener("resize", updateReviewMode);
