// ---------------- [0] sidebar ----------------------
// --------------- Initialization ------------------
var sidebar = document.getElementById("sidebar");
var sidebarToggleBTN = document.getElementById("sidebar-toggle");
var overlay = document.createElement("div");

// --------------- Event ---------------------------
sidebarToggleBTN.addEventListener("click", () => {
    sidebar.classList.add("sidebar-open");
    overlay.classList.add("sidebar-overlay");
    document.body.appendChild(overlay);
});
overlay.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-open");
    overlay.remove();
});

// ---------------- [1] Today in Space -------------
// --------------- Fallback APOD Data ------------------
const FALLBACK_APODS = [
    {
        url: "./img/001.jpg",
        title: "Cosmic Reef",
        explanation: "A colorful, coral-like structure of gas and dust shaped by powerful stellar winds.",
        copyright: "Unsplash Archive",
        date: "2025-01-01",
        media_type: "image"
    },
    {
        url: "./img/002.jpg",
        title: "Galaxies in the Furnace",
        explanation: "An example of violence on a cosmic scale, enormous elliptical galaxy NGC 1316 lies about 75 million light-years away toward Fornax, the southern constellation of the Furnace. Investigating the startling sight, astronomers suspect the giant galaxy of colliding with smaller neighbor NGC 1317 seen just right of the large galaxy's center, producing far flung star streams in loops and shells.",
        copyright: "Unsplash Archive",
        date: "2025-01-02",
        media_type: "image"
    },
    {
        url: "./img/003.jpg",
        title: "M77: Spiral Galaxy with an Active Center",
        explanation: "What's happening in the center of nearby spiral galaxy M77? The face-on galaxy lies a mere 47 million light-years away toward the constellation of the Sea Monster (Cetus). At that estimated distance, this gorgeous island universe is about 100 thousand light-years across.",
        copyright: "Unsplash Archive",
        date: "2025-01-03",
        media_type: "image"
    },
    {
        url: "./img/004.jpg",
        title: "NGC 6960: The Witch's Broom Nebula",
        explanation: "Ten thousand years ago, before the dawn of recorded human history, a new light would suddenly have appeared in the night sky and faded after a few weeks. Today we know this light was from a supernova, or exploding star, and record the expanding debris cloud as the Veil Nebula.",
        copyright: "Unsplash Archive",
        date: "2025-01-04",
        media_type: "image"
    },
    {
        url: "./img/005.jpg",
        title: "LDN 1235: The Shark Nebula",
        explanation: "There is no sea on Earth large enough to contain the Shark nebula. This predator apparition poses us no danger as it is composed only of interstellar gas and dust.",
        copyright: "Unsplash Archive",
        date: "2025-01-05",
        media_type: "image"
    },
    {
        url: "./img/006.jpg",
        title: "Planetary Nebula Abell 7",
        explanation: "Very faint planetary nebula Abell 7 is about 1,800 light-years distant. It lies just south of Orion in planet Earth's skies toward the constellation Lepus, The Hare.",
        copyright: "Unsplash Archive",
        date: "2025-01-06",
        media_type: "image"
    },
    {
        url: "./img/007.png",
        title: "Tololo Totality",
        explanation: "On March 14 the Moon was Full. In an appropriate celebration of Pi day, that put the Moon 3.14 radians (180 degrees) in ecliptic longitude from the Sun in planet Earth's sky.",
        copyright: "Unsplash Archive",
        date: "2025-01-07",
        media_type: "image"
    },
    {
        url: "./img/008.jpg",
        title: "Venus and the Triply Ultraviolet Sun",
        explanation: "This was a very unusual type of solar eclipse. Typically, it is the Earth's Moon that eclipses the Sun. In 2012, though, the planet Venus took a turn.",
        copyright: "Unsplash Archive",
        date: "2025-01-08",
        media_type: "image"
    },
    {
        url: "./img/009.jpg",
        title: "Moon Pi and Mountain Shadow",
        explanation: "What phase of the Moon is 3.14 radians from the Sun? The Full Moon, of course. Even though the Moon might look full for several days, the Moon is truly at its full phase when it is Pi radians from the Sun.",
        copyright: "Unsplash Archive",
        date: "2025-01-09",
        media_type: "image"
    },
    {
        url: "./img/010.jpg",
        title: "Cosmic Clouds",
        explanation: "Soft-looking interstellar clouds—dusty lanes and faint glow layered across the darkness.",
        copyright: "Unsplash Archive",
        date: "2025-01-10",
        media_type: "image"
    },
    {
        url: "./img/011.jpg",
        title: "Apollo 17's Moonship",
        explanation: "Awkward and angular looking, Apollo 17's lunar module Challenger was designed for flight in the near vacuum of space.",
        copyright: "Unsplash Archive",
        date: "2025-01-11",
        media_type: "image"
    },
    {
        url: "./img/012.jpg",
        title: "Micro Moon vs. Super Moon",
        explanation: "What was so super about Wednesday's supermoon? Last week, a full moon occurred that appeared slightly larger and brighter than usual.",
        copyright: "Unsplash Archive",
        date: "2025-01-12",
        media_type: "image"
    },
    {
        url: "./img/013.jpg",
        title: "Crossing Saturn's Ring Plane",
        explanation: "If this is Saturn, where are the rings? When Saturn's 'appendages' disappeared in 1612, Galileo did not understand why.",
        copyright: "Unsplash Archive",
        date: "2025-01-13",
        media_type: "image"
    },
    {
        url: "./img/014.jpeg",
        title: "Florida Northern Lights",
        explanation: "Northern lights have come to Florida skies. In fact, the brilliant streak of a Northern Taurid meteor flashes through the starry night sky above the beach.",
        copyright: "Unsplash Archive",
        date: "2025-01-14",
        media_type: "image"
    },
    {
        url: "./img/015.jpg",
        title: "50 Light-years to 51 Pegasi",
        explanation: "It's only 50 light-years to 51 Pegasi. That star's position is indicated in this snapshot from August 2025.",
        copyright: "Unsplash Archive",
        date: "2025-01-15",
        media_type: "image"
    },
    {
        url: "./img/016.jpg",
        title: "Manicouagan Impact Crater from Space",
        explanation: "Orbiting 400 kilometers above Quebec, Canada, planet Earth, the International Space Station Expedition 59 crew captured this snapshot of the broad St. Lawrence River.",
        copyright: "Unsplash Archive",
        date: "2025-01-16",
        media_type: "image"
    },
    {
        url: "./img/017.jpg",
        title: "3D Bennu",
        explanation: "Put on your red/blue glasses and float next to asteroid 101955 Bennu. Shaped like a spinning toy top with boulders littering its rough surface.",
        copyright: "Unsplash Archive",
        date: "2025-01-17",
        media_type: "image"
    },
    {
        url: "./img/018.jpg",
        title: "Comet Churyumov-Gerasimenko Creates Its Tails",
        explanation: "Where do comet tails come from? There are usually no obvious places on the nuclei of comets from which the jets that create comet tails emanate.",
        copyright: "Unsplash Archive",
        date: "2025-01-18",
        media_type: "image"
    },
    {
        url: "./img/019.jpg",
        title: "Finding Comet Lemmon",
        explanation: "Tonight, if you can see the stars of the Big Dipper, then you can find comet Lemmon in your evening sky.",
        copyright: "Unsplash Archive",
        date: "2025-01-19",
        media_type: "image"
    },
    {
        url: "./img/020.jpg",
        title: "IC 1805: The Heart Nebula",
        explanation: "What electrifies the Heart Nebula? First, the large emission nebula on the left, catalogued as IC 1805, looks somewhat like a human heart.",
        copyright: "Unsplash Archive",
        date: "2025-01-20",
        media_type: "image"
    }
];

// Get a random fallback APOD
function getRandomFallbackApod() {
    return FALLBACK_APODS[Math.floor(Math.random() * FALLBACK_APODS.length)];
}

// --------------- Date Helper ------------------
function date(apiDate) {
    var myDate = new Date(apiDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return myDate;
}

// --------------- Display APOD Data ------------------
function displayApodData(data) {
    apodImage.src = data.hdurl || data.url;
    apodTitle.innerHTML = data.title;
    apodDate.innerHTML = `<i class="far fa-calendar mr-2"></i>${date(data.date)}`;
    apodExplanation.innerHTML = data.explanation;
    apodCopyright.innerHTML = data.copyright ? `&copy; ${data.copyright}` : "&copy; NASA";
    apodDateInfo.innerHTML = date(data.date);
    apodMediaType.innerHTML = data.media_type || "image";

    var apodSubtitle = document.getElementById("apod-date");
    if (apodSubtitle) {
        apodSubtitle.innerHTML = `Astronomy Picture of the Day - ${date(data.date)}`;
    }
}

// --------------- Initialization ------------------
var todayTAB = document.getElementById("todayTAB");
var todayTabBTN = document.getElementById("todayTabBTN");
var ViewFullResolutionBTN = document.getElementById("ViewFullResolution");
var apodImage = document.getElementById("apod-image");
var apodTitle = document.getElementById("apod-title");
var apodDate = document.getElementById("apod-date-detail");
var apodExplanation = document.getElementById("apod-explanation");
var apodCopyright = document.getElementById("apod-copyright");
var apodDateInfo = document.getElementById("apod-date-info");
var apodMediaType = document.getElementById("apod-media-type");

// --------------- Initial API Load with Fallback ------------------
var todayHTTP = new XMLHttpRequest();
todayHTTP.open(
    "get",
    "https://api.nasa.gov/planetary/apod?api_key=MwgQzjwZ6qIH65h1mXDHhMZNlthavKYRhbpbjD6g"
);
todayHTTP.responseType = "json";
todayHTTP.timeout = 10000; // 10 second timeout
todayHTTP.send();

todayHTTP.addEventListener("readystatechange", () => {
    if (todayHTTP.readyState == 4) {
        if (todayHTTP.status == 200 && todayHTTP.response) {
            var todayArray = todayHTTP.response;
            displayApodData(todayArray);
            console.log("APOD loaded from NASA API");
        } else {
            // Use fallback data
            console.warn("NASA API failed, using fallback APOD data");
            var fallback = getRandomFallbackApod();
            displayApodData(fallback);
        }
    }
});

todayHTTP.addEventListener("timeout", () => {
    console.warn("NASA API timed out, using fallback APOD data");
    var fallback = getRandomFallbackApod();
    displayApodData(fallback);
});

todayHTTP.addEventListener("error", () => {
    console.warn("NASA API error, using fallback APOD data");
    var fallback = getRandomFallbackApod();
    displayApodData(fallback);
});

// --------------- Tab Event ---------------------------
todayTabBTN.addEventListener("click", () => {
    todayTAB.classList.remove("hidden");
    launchesTAB.classList.add("hidden");
    planetsTAB.classList.add("hidden");

    todayTabBTN.classList.add("bg-blue-500/10", "text-blue-400");
    todayTabBTN.classList.remove("text-slate-300", "hover:bg-slate-800");

    launchesTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
    launchesTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

    planetsTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
    planetsTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");
});

ViewFullResolutionBTN.addEventListener("click", () => {
    window.open(apodImage.src, "_blank");
});

// --------------- Date Picker Elements ------------------
var apodDateInput = document.getElementById("apod-date-input");
var loadDateBtn = document.getElementById("load-date-btn");
var todayApodBtn = document.getElementById("today-apod-btn");
var dateInputWrapper = apodDateInput.parentElement;

// --------------- Helper: Format date for display ------------------
function formatDisplayDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

// --------------- Initialize Date Input ------------------
var today = new Date();
var todayStr = today.toISOString().split('T')[0];
apodDateInput.value = todayStr;
apodDateInput.max = todayStr;
dateInputWrapper.querySelector('span').textContent = formatDisplayDate(todayStr);

// --------------- Update date display when input changes ------------------
apodDateInput.addEventListener("change", () => {
    dateInputWrapper.querySelector('span').textContent = formatDisplayDate(apodDateInput.value);
});

// --------------- Function to load APOD by date with fallback ------------------
function loadApodByDate(dateStr) {
    var apodLoading = document.getElementById("apod-loading");
    if (apodLoading) apodLoading.classList.remove("hidden");
    apodImage.style.opacity = "0.5";

    var apodHTTP = new XMLHttpRequest();
    apodHTTP.open(
        "get",
        `https://api.nasa.gov/planetary/apod?api_key=MwgQzjwZ6qIH65h1mXDHhMZNlthavKYRhbpbjD6g&date=${dateStr}`
    );
    apodHTTP.responseType = "json";
    apodHTTP.timeout = 10000;
    apodHTTP.send();

    apodHTTP.addEventListener("readystatechange", () => {
        if (apodHTTP.readyState == 4) {
            if (apodLoading) apodLoading.classList.add("hidden");
            apodImage.style.opacity = "1";

            if (apodHTTP.status == 200 && apodHTTP.response) {
                var response = apodHTTP.response;
                if (response.media_type === "video") {
                    response.url = response.thumbnail_url || "./assets/images/placeholder.webp";
                }
                displayApodData(response);
                console.log("APOD loaded from NASA API for date:", dateStr);
            } else {
                console.warn("NASA API failed for date, using fallback");
                var fallback = getRandomFallbackApod();
                displayApodData(fallback);
            }
        }
    });

    apodHTTP.addEventListener("timeout", () => {
        if (apodLoading) apodLoading.classList.add("hidden");
        apodImage.style.opacity = "1";
        console.warn("NASA API timed out, using fallback");
        var fallback = getRandomFallbackApod();
        displayApodData(fallback);
    });

    apodHTTP.addEventListener("error", () => {
        if (apodLoading) apodLoading.classList.add("hidden");
        apodImage.style.opacity = "1";
        console.warn("NASA API error, using fallback");
        var fallback = getRandomFallbackApod();
        displayApodData(fallback);
    });
}

// --------------- Load Button Event ------------------
loadDateBtn.addEventListener("click", () => {
    var selectedDate = apodDateInput.value;
    if (selectedDate) {
        loadApodByDate(selectedDate);
    }
});

// --------------- Today Button Event ------------------
todayApodBtn.addEventListener("click", () => {
    var today = new Date();
    var todayStr = today.toISOString().split('T')[0];
    apodDateInput.value = todayStr;
    dateInputWrapper.querySelector('span').textContent = formatDisplayDate(todayStr);

    var apodLoading = document.getElementById("apod-loading");
    if (apodLoading) apodLoading.classList.remove("hidden");
    apodImage.style.opacity = "0.5";

    var apodHTTP = new XMLHttpRequest();
    apodHTTP.open(
        "get",
        "https://api.nasa.gov/planetary/apod?api_key=MwgQzjwZ6qIH65h1mXDHhMZNlthavKYRhbpbjD6g"
    );
    apodHTTP.responseType = "json";
    apodHTTP.timeout = 10000;
    apodHTTP.send();

    apodHTTP.addEventListener("readystatechange", () => {
        if (apodHTTP.readyState == 4) {
            if (apodLoading) apodLoading.classList.add("hidden");
            apodImage.style.opacity = "1";

            if (apodHTTP.status == 200 && apodHTTP.response) {
                var response = apodHTTP.response;
                if (response.media_type === "video") {
                    response.url = response.thumbnail_url || "./assets/images/placeholder.webp";
                }
                displayApodData(response);
            } else {
                console.warn("NASA API failed, using fallback");
                var fallback = getRandomFallbackApod();
                displayApodData(fallback);
            }
        }
    });

    apodHTTP.addEventListener("timeout", () => {
        if (apodLoading) apodLoading.classList.add("hidden");
        apodImage.style.opacity = "1";
        var fallback = getRandomFallbackApod();
        displayApodData(fallback);
    });

    apodHTTP.addEventListener("error", () => {
        if (apodLoading) apodLoading.classList.add("hidden");
        apodImage.style.opacity = "1";
        var fallback = getRandomFallbackApod();
        displayApodData(fallback);
    });
});
// ---------------- [2] Launches -------------------
function weekdayDate(apiDate) {
    var myDate = new Date(apiDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return myDate;
}
function time(apiTime) {
    var myTime = new Date(apiTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    return myTime;
}
function allUpcomingLaunches() {
    var AllUpcomingLaunches = ``;
    for (let i = 1; i < launchesArray.results.length; i++) {
        // Get image with fallback options
        var launchImageUrl = null;
        var launch = launchesArray.results[i];

        // Try different image sources in order of preference
        if (launch.image?.image_url) {
            launchImageUrl = launch.image.image_url;
        } else if (launch.pad?.location?.image?.image_url) {
            launchImageUrl = launch.pad.location.image.image_url;
        } else if (launch.rocket?.configuration?.image?.image_url) {
            launchImageUrl = launch.rocket.configuration.image.image_url;
        } else if (launch.launch_service_provider?.logo?.image_url) {
            launchImageUrl = launch.launch_service_provider.logo.image_url;
        }

        // Create image HTML - use fallback placeholder if no image
        var imageHTML = launchImageUrl
            ? `<img src="${launchImageUrl}" alt="${launch.name}" class="w-full h-full object-cover" onerror="this.src='./assets/images/launch-placeholder.png';">`
            : `<img src="./assets/images/launch-placeholder.png" alt="Launch Placeholder" class="w-full h-full object-cover">`;

        AllUpcomingLaunches += `<!-- STATIC LAUNCH CARD ${i} -->
          <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
              ${imageHTML}
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                  ${launch.status?.abbrev || 'TBD'}
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-3">
                <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  ${launch.name || 'Unknown Launch'}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                  <i class="fas fa-building text-xs"></i>
                  ${launch.launch_service_provider?.name || 'Unknown Provider'}
                </p>
              </div>
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-calendar text-slate-500 w-4"></i>
                  <span class="text-slate-300">${launch.net ? date(launch.net) : 'TBD'}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${launch.net ? time(launch.net) + ' UTC' : 'TBD'}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${launch.rocket?.configuration?.name || 'Unknown Rocket'}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${launch.pad?.location?.name || 'Unknown Location'}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                  Details
                </button>
                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>`;
    }
    launchesGrid.innerHTML = AllUpcomingLaunches;
}
// --------------- Initialization ------------------
var launchesTAB = document.getElementById("launchesTAB");
var launchesTabBTN = document.getElementById("launchesTabBTN");
var launchesStatusAbbrev = document.getElementById("launchesStatusAbbrev");
var launchesName = document.getElementById("launchesName");
var launchServiceProviderName = document.getElementById(
    "launchServiceProviderName"
);
var rocketConfigurationName = document.getElementById(
    "rocketConfigurationName"
);
var launchDate = document.getElementById("launchDate");
var launchTime = document.getElementById("launchTime");
var launchLocation = document.getElementById("launchLocation");
var launchCountry = document.getElementById("launchCountry");
var launchMissionDescription = document.getElementById(
    "launchMissionDescription"
);
var launchImg = document.getElementById("launchImg");
var launchesGrid = document.getElementById("launches-grid");
// --------------- API by ajax load ---------------------
var launchesHTTP = new XMLHttpRequest();
launchesHTTP.open(
    "get",
    "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10"
);
launchesHTTP.send();
var launchesArray = [];
launchesHTTP.responseType = "json";
launchesHTTP.addEventListener("load", () => {
    launchesArray = launchesHTTP.response;
    var featured = launchesArray.results[0];

    launchesStatusAbbrev.innerHTML = featured.status?.abbrev || 'TBD';
    launchesName.innerHTML = featured.name || 'Unknown Launch';
    launchServiceProviderName.innerHTML = featured.launch_service_provider?.name || 'Unknown Provider';
    rocketConfigurationName.innerHTML = featured.rocket?.configuration?.name || 'Unknown Rocket';
    launchDate.innerHTML = featured.net ? weekdayDate(featured.net) : 'TBD';
    launchTime.innerHTML = featured.net ? `${time(featured.net)} UTC` : 'TBD';
    launchLocation.innerHTML = featured.pad?.location?.name || 'Unknown Location';
    launchCountry.innerHTML = featured.pad?.country?.name || 'Unknown Country';
    launchMissionDescription.innerHTML = featured.mission?.description || 'No mission description available.';

    // Get featured image with fallbacks
    var featuredImageUrl = null;
    if (featured.image?.image_url) {
        featuredImageUrl = featured.image.image_url;
    } else if (featured.pad?.location?.image?.image_url) {
        featuredImageUrl = featured.pad.location.image.image_url;
    } else if (featured.rocket?.configuration?.image?.image_url) {
        featuredImageUrl = featured.rocket.configuration.image.image_url;
    }

    if (featuredImageUrl) {
        launchImg.innerHTML = `<img src="${featuredImageUrl}" alt="${featured.name}" class="w-full h-full object-cover" onerror="this.src='./assets/images/launch-placeholder.png';">`;
    } else {
        launchImg.innerHTML = `<img src="./assets/images/launch-placeholder.png" alt="Launch Placeholder" class="w-full h-full object-cover">`;
    }

    allUpcomingLaunches();
});

// --------------- Event ---------------------------
launchesTabBTN.addEventListener("click", () => {
    todayTAB.classList.add("hidden");
    launchesTAB.classList.remove("hidden");
    planetsTAB.classList.add("hidden");

    todayTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
    todayTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

    launchesTabBTN.classList.add("bg-blue-500/10", "text-blue-400");
    launchesTabBTN.classList.remove("text-slate-300", "hover:bg-slate-800");

    planetsTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
    planetsTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");
});
// ---------------- [3] Planets --------------------
// --------------- Fallback Data ------------------
const FALLBACK_PLANETS = [
    {
        id: "mercury",
        name: "Mercury",
        englishName: "Mercury",
        image: "./assets/images/mercury.png",
        color: "#9ca3af",
        distance: "0.39 AU",
        semimajorAxis: 57909050,
        meanRadius: 2439,
        mass: { massValue: 3.3011, massExponent: 23 },
        density: 5.427,
        sideralOrbit: 87.969,
        sideralRotation: 1407.6,
        gravity: 3.7,
        bodyType: "Terrestrial",
        vol: { volValue: 6.083, volExponent: 10 },
        moons: null,
        discoveredBy: "",
        discoveryDate: "",
        perihelion: 46001200,
        aphelion: 69816900,
        eccentricity: 0.2056,
        inclination: 7,
        axialTilt: 0.034,
        avgTemp: 167,
        escape: 4.25,
        description: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days."
    },
    {
        id: "venus",
        name: "Venus",
        englishName: "Venus",
        image: "./assets/images/venus.png",
        color: "#f59e0b",
        distance: "0.72 AU",
        semimajorAxis: 108208000,
        meanRadius: 6051,
        mass: { massValue: 4.8675, massExponent: 24 },
        density: 5.243,
        sideralOrbit: 224.701,
        sideralRotation: -5832.5,
        gravity: 8.87,
        bodyType: "Terrestrial",
        vol: { volValue: 9.2843, volExponent: 11 },
        moons: null,
        discoveredBy: "",
        discoveryDate: "",
        perihelion: 107477000,
        aphelion: 108939000,
        eccentricity: 0.0067,
        inclination: 3.39,
        axialTilt: 177.36,
        avgTemp: 464,
        escape: 10.36,
        description: "Spinning in the opposite direction to most planets, Venus is the hottest planet in our solar system. Its thick atmosphere traps heat in a runaway greenhouse effect."
    },
    {
        id: "terre",
        name: "Earth",
        englishName: "Earth",
        image: "./assets/images/earth.png",
        color: "#3b82f6",
        distance: "1.00 AU",
        semimajorAxis: 149598023,
        meanRadius: 6371,
        mass: { massValue: 5.97237, massExponent: 24 },
        density: 5.514,
        sideralOrbit: 365.256,
        sideralRotation: 23.9345,
        gravity: 9.8,
        bodyType: "Terrestrial",
        vol: { volValue: 1.08321, volExponent: 12 },
        moons: [{ moon: "Moon" }],
        discoveredBy: "",
        discoveryDate: "",
        perihelion: 147092000,
        aphelion: 152100000,
        eccentricity: 0.0167,
        inclination: 0,
        axialTilt: 23.4393,
        avgTemp: 15,
        escape: 11.186,
        description: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things. It's the only world in our solar system with liquid water on the surface."
    },
    {
        id: "mars",
        name: "Mars",
        englishName: "Mars",
        image: "./assets/images/mars.png",
        color: "#ef4444",
        distance: "1.52 AU",
        semimajorAxis: 227939200,
        meanRadius: 3389,
        mass: { massValue: 6.4171, massExponent: 23 },
        density: 3.9335,
        sideralOrbit: 686.98,
        sideralRotation: 24.6229,
        gravity: 3.71,
        bodyType: "Terrestrial",
        vol: { volValue: 1.6318, volExponent: 11 },
        moons: [{ moon: "Phobos" }, { moon: "Deimos" }],
        discoveredBy: "",
        discoveryDate: "",
        perihelion: 206700000,
        aphelion: 249200000,
        eccentricity: 0.0935,
        inclination: 1.85,
        axialTilt: 25.19,
        avgTemp: -65,
        escape: 5.027,
        description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was—billions of years ago—wetter and warmer, with a thick atmosphere."
    },
    {
        id: "jupiter",
        name: "Jupiter",
        englishName: "Jupiter",
        image: "./assets/images/jupiter.png",
        color: "#d97706",
        distance: "5.20 AU",
        semimajorAxis: 778570000,
        meanRadius: 69911,
        mass: { massValue: 1.8982, massExponent: 27 },
        density: 1.326,
        sideralOrbit: 4332.59,
        sideralRotation: 9.925,
        gravity: 24.79,
        bodyType: "Gas Giant",
        vol: { volValue: 1.4313, volExponent: 15 },
        moons: Array(95).fill({ moon: "moon" }),
        discoveredBy: "",
        discoveryDate: "",
        perihelion: 740520000,
        aphelion: 816620000,
        eccentricity: 0.0489,
        inclination: 1.303,
        axialTilt: 3.13,
        avgTemp: -110,
        escape: 59.5,
        description: "Jupiter has more than twice the mass of all the other planets combined. The Great Red Spot is a giant storm that has raged for hundreds of years."
    },
    {
        id: "saturn",
        name: "Saturn",
        englishName: "Saturn",
        image: "./assets/images/saturn.png",
        color: "#eab308",
        distance: "9.58 AU",
        semimajorAxis: 1433530000,
        meanRadius: 58232,
        mass: { massValue: 5.6834, massExponent: 26 },
        density: 0.687,
        sideralOrbit: 10759.22,
        sideralRotation: 10.656,
        gravity: 10.44,
        bodyType: "Gas Giant",
        vol: { volValue: 8.2713, volExponent: 14 },
        moons: Array(146).fill({ moon: "moon" }),
        discoveredBy: "",
        discoveryDate: "",
        perihelion: 1352550000,
        aphelion: 1514500000,
        eccentricity: 0.0565,
        inclination: 2.485,
        axialTilt: 26.73,
        avgTemp: -140,
        escape: 35.5,
        description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's."
    },
    {
        id: "uranus",
        name: "Uranus",
        englishName: "Uranus",
        image: "./assets/images/uranus.png",
        color: "#06b6d4",
        distance: "19.2 AU",
        semimajorAxis: 2872460000,
        meanRadius: 25362,
        mass: { massValue: 8.6810, massExponent: 25 },
        density: 1.271,
        sideralOrbit: 30688.5,
        sideralRotation: -17.24,
        gravity: 8.69,
        bodyType: "Ice Giant",
        vol: { volValue: 6.833, volExponent: 13 },
        moons: Array(27).fill({ moon: "moon" }),
        discoveredBy: "William Herschel",
        discoveryDate: "1781",
        perihelion: 2741300000,
        aphelion: 3003620000,
        eccentricity: 0.0457,
        inclination: 0.772,
        axialTilt: 97.77,
        avgTemp: -195,
        escape: 21.3,
        description: "Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side."
    },
    {
        id: "neptune",
        name: "Neptune",
        englishName: "Neptune",
        image: "./assets/images/neptune.png",
        color: "#2563eb",
        distance: "30.1 AU",
        semimajorAxis: 4495060000,
        meanRadius: 24622,
        mass: { massValue: 1.02413, massExponent: 26 },
        density: 1.638,
        sideralOrbit: 60182,
        sideralRotation: 16.11,
        gravity: 11.15,
        bodyType: "Ice Giant",
        vol: { volValue: 6.254, volExponent: 13 },
        moons: Array(14).fill({ moon: "moon" }),
        discoveredBy: "Johann Galle",
        discoveryDate: "1846",
        perihelion: 4444450000,
        aphelion: 4545670000,
        eccentricity: 0.0113,
        inclination: 1.77,
        axialTilt: 28.32,
        avgTemp: -200,
        escape: 23.5,
        description: "Neptune is the only planet in our solar system not visible to the naked eye. In 2011 Neptune completed its first 165-year orbit since its discovery in 1846."
    }
];

// --------------- Helper Functions ------------------
function displayPlanetDetails(planet, index) {
    planetDetailImage.src = planet.image;
    planetDetailName.innerHTML = planet.englishName;
    planetDetailDescription.innerHTML = planet.description;
    planetDistance.innerHTML = `${(planet.semimajorAxis / 1000000).toFixed(1)}M km`;
    planetRadius.innerHTML = `${Math.round(planet.meanRadius)} km`;
    planetMass.innerHTML = `${planet.mass.massValue} × 10^${planet.mass.massExponent} kg`;
    planetDensity.innerHTML = `${planet.density.toFixed(2)} g/cm³`;
    planetOrbitalPeriod.innerHTML = `${planet.sideralOrbit.toFixed(2)} days`;
    planetRotation.innerHTML = `${Math.abs(planet.sideralRotation).toFixed(2)} hours`;
    planetGravity.innerHTML = `${planet.gravity} m/s²`;
    planetBodyType.innerHTML = planet.bodyType;
    planetVolume.innerHTML = `${planet.vol.volValue} × 10^${planet.vol.volExponent} km³`;

    // Moons
    if (planet.moons == null) {
        planetMoons.innerHTML = 0;
    } else {
        planetMoons.innerHTML = planet.moons.length;
    }

    // Discovery info
    planetDiscoverer.innerHTML = planet.discoveredBy || "Known since antiquity";
    planetDiscoveryDate.innerHTML = planet.discoveryDate || "Ancient";

    // Quick Facts
    planetFacts.innerHTML = `
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Mass: ${planet.mass.massValue} × 10^${planet.mass.massExponent} kg</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Surface gravity: ${planet.gravity} m/s²</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Density: ${planet.density.toFixed(2)} g/cm³</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Axial tilt: ${planet.axialTilt}°</span>
      </li>
    `;

    // Orbital Characteristics
    OrbitalCharacteristics.innerHTML = `
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Perihelion</span>
        <span class="font-semibold">${(planet.perihelion / 1000000).toFixed(1)}M km</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Aphelion</span>
        <span class="font-semibold">${(planet.aphelion / 1000000).toFixed(1)}M km</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Eccentricity</span>
        <span class="font-semibold">${planet.eccentricity}</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Inclination</span>
        <span class="font-semibold">${planet.inclination}°</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Axial Tilt</span>
        <span class="font-semibold">${planet.axialTilt}°</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Avg Temperature</span>
        <span class="font-semibold">${planet.avgTemp}°C</span>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-slate-400">Escape Velocity</span>
        <span class="font-semibold">${planet.escape} km/s</span>
      </div>
    `;
}

function renderPlanetsGrid(planets) {
    var AllPlanetsGrid = ``;
    for (let i = 0; i < planets.length; i++) {
        var planet = planets[i];
        AllPlanetsGrid += `
    <!-- ${planet.englishName} -->
          <div
            class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
            data-planet-id="${planet.id}" style="--planet-color: ${planet.color || '#3b82f6'}" 
            onmouseover="this.style.borderColor='${planet.color || '#3b82f6'}80'"
            onmouseout="this.style.borderColor='#334155'">
            <div class="relative mb-3 h-24 flex items-center justify-center">
              <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                src="${planet.image}" alt="${planet.englishName}" />
            </div>
            <h4 class="font-semibold text-center text-sm">${planet.englishName}</h4>
            <p class="text-xs text-slate-400 text-center">${(planet.semimajorAxis / 149598023).toFixed(2)} AU</p>
          </div>
    `;
    }
    planetsGrid.innerHTML = AllPlanetsGrid;

    // Add click event listeners
    var planetCardArray = [...planetCard];
    planetCardArray.forEach((card, i) => {
        card.addEventListener("click", () => {
            displayPlanetDetails(planets[i], i);
        });
    });

    // Display Earth by default
    var earthIndex = planets.findIndex(p => p.id === "terre" || p.id === "earth");
    if (earthIndex !== -1) {
        displayPlanetDetails(planets[earthIndex], earthIndex);
    } else if (planets.length > 0) {
        displayPlanetDetails(planets[0], 0);
    }
}

// --------------- Initialization ------------------
var planetsTAB = document.getElementById("planetsTAB");
var planetsTabBTN = document.getElementById("planetsTabBTN");
var planetsGrid = document.getElementById("planets-grid");
var planetCard = document.getElementsByClassName("planet-card");
var planetDetailImage = document.getElementById("planet-detail-image");
var planetDetailName = document.getElementById("planet-detail-name");
var planetDetailDescription = document.getElementById("planet-detail-description");
var planetDistance = document.getElementById("planet-distance");
var planetRadius = document.getElementById("planet-radius");
var planetMass = document.getElementById("planet-mass");
var planetDensity = document.getElementById("planet-density");
var planetOrbitalPeriod = document.getElementById("planet-orbital-period");
var planetRotation = document.getElementById("planet-rotation");
var planetMoons = document.getElementById("planet-moons");
var planetGravity = document.getElementById("planet-gravity");
var planetDiscoverer = document.getElementById("planet-discoverer");
var planetDiscoveryDate = document.getElementById("planet-discovery-date");
var planetBodyType = document.getElementById("planet-body-type");
var planetVolume = document.getElementById("planet-volume");
var planetFacts = document.getElementById("planet-facts");
var OrbitalCharacteristics = document.getElementById("OrbitalCharacteristics");

// --------------- API by fetch with fallback -----------------------------
var PlanetArray;

async function fetchPlanets() {
    try {
        var PlanetsHTTP = await fetch(
            "https://solar-system-opendata-proxy.vercel.app/api/planets"
        );
        if (!PlanetsHTTP.ok) {
            throw new Error('API request failed');
        }
        var PlanetsHttpResponse = await PlanetsHTTP.json();
        return PlanetsHttpResponse.bodies;
    } catch (error) {
        console.warn("Planets API failed, using fallback data:", error);
        return null;
    }
}

// Initialize planets - try API first, then fallback
fetchPlanets().then((apiData) => {
    if (apiData && apiData.length > 0) {
        // Use API data - add local images and colors
        PlanetArray = apiData.map(planet => {
            var fallbackPlanet = FALLBACK_PLANETS.find(fp =>
                fp.id === planet.id || fp.englishName.toLowerCase() === planet.englishName?.toLowerCase()
            );
            return {
                ...planet,
                image: fallbackPlanet?.image || planet.image || `./assets/images/${planet.englishName?.toLowerCase()}.png`,
                color: fallbackPlanet?.color || '#3b82f6',
                description: planet.description || fallbackPlanet?.description || 'No description available.'
            };
        });
        console.log("Planets loaded from API");
    } else {
        // Use fallback data
        PlanetArray = FALLBACK_PLANETS;
        console.log("Planets loaded from fallback data");
    }
    renderPlanetsGrid(PlanetArray);
});
// --------------- Event ---------------------------
planetsTabBTN.addEventListener("click", () => {
    todayTAB.classList.add("hidden");
    launchesTAB.classList.add("hidden");
    planetsTAB.classList.remove("hidden");

    todayTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
    todayTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

    launchesTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
    launchesTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

    planetsTabBTN.classList.add("bg-blue-500/10", "text-blue-400");
    planetsTabBTN.classList.remove("text-slate-300", "hover:bg-slate-800");
});

/*
mercury
data-planet-id="mercury"
style="--planet-color: #eab308"
onmouseover="this.style.borderColor='#eab30880'"
---------------------------------------------------------------------------------------------------------------
venus
data-planet-id="venus"
style="--planet-color: #f97316"
onmouseover="this.style.borderColor='#f9731680'"
---------------------------------------------------------------------------------------------------------------
earth
data-planet-id="earth"
style="--planet-color: #3b82f6"
onmouseover="this.style.borderColor='#3b82f680'"
*/