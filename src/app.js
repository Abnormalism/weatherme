const search = document.getElementById("search");
const city = document.querySelector(".city");
const weather = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const error = document.querySelector(".error");
window.addEventListener("DOMContentLoaded", () => {
  let url = `https://api.openweathermap.org/data/2.5/weather?appid=e0414d6c45f2f06dad2f6f2dad4e167a&q=Philippines&units=metric
`;

  search.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      const searchCity = search.value;
      url = `https://api.openweathermap.org/data/2.5/weather?appid=e0414d6c45f2f06dad2f6f2dad4e167a&q=${searchCity}&units=metric`;
      fetch(url)
        .then((res) => {
          error.classList.contains("hidden")
            ? ""
            : error.classList.add("hidden");
          return res.json();
        })
        .then((data) => {
          city.textContent = `${data.name}, ${data.sys.country}`;
          weather.textContent = data.weather[0].description;
          temp.textContent = data.main.temp;
        })
        .catch(() => {
          error.classList.remove("hidden");
          gsap.fromTo(
            ".error",
            { x: 5 },
            { x: 0, repeat: 6, yoyo: true, duration: 0.1 }
          );
        });
    }
  });

  const TL = gsap.timeline({
    defaults: { ease: Elastic.easeOut.config(1.3, 0.9) },
  });

  gsap.set(".title", { y: 125, color: "white", fontSize: "1rem" });

  TL.to(".title", {
    y: 0,
    duration: 1.5,
    fontSize: "3rem",
    color: "black",
    ease: Power4.easeOut,
  })
    .to("img", { scale: 1 })
    .to(".meter", { scale: 1 })
    .to("input", {
      scale: 1,
      onComplete: () => {
        gsap.to(".cloud-outside1", {
          x: 100,
          duration: 10,
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
        });
        gsap.to(".cloud-outside2", {
          x: -100,
          duration: 10,
          repeat: -1,
          yoyo: true,
          repeatDelay: 1,
        });
      },
    });
});
