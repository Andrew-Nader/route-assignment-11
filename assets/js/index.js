const PLANETS = {
    mercury: {
        name: "Mercury",
        image: "assets/images/mercury.png",
        color: "#9ca3af",
        distance: "0.39 AU",
        mass: "0.055 M⊕",
        temp: "167°C",
        moons: "0",
        radius: "2,439 km",
        period: "88 days",
        day: "1408 hours",
        gravity: "3.7 m/s²",
        type: "Terrestrial",
        desc: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days."
    },
    venus: {
        name: "Venus",
        image: "assets/images/venus.png",
        color: "#f59e0b",
        distance: "0.72 AU",
        mass: "0.815 M⊕",
        temp: "464°C",
        moons: "0",
        radius: "6,051 km",
        period: "225 days",
        day: "5832 hours",
        gravity: "8.87 m/s²",
        type: "Terrestrial",
        desc: "Spinning in the opposite direction to most planets, Venus is the hottest planet in our solar system. Its thick atmosphere traps heat in a runaway greenhouse effect."
    },
    earth: {
        name: "Earth",
        image: "assets/images/earth.png",
        color: "#3b82f6",
        distance: "1.00 AU",
        mass: "1.00 M⊕",
        temp: "15°C",
        moons: "1",
        radius: "6,371 km",
        period: "365.2 days",
        day: "24 hours",
        gravity: "9.8 m/s²",
        type: "Terrestrial",
        desc: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things. It's the only world in our solar system with liquid water on the surface."
    },
    mars: {
        name: "Mars",
        image: "assets/images/mars.png",
        color: "#ef4444",
        distance: "1.52 AU",
        mass: "0.107 M⊕",
        temp: "-65°C",
        moons: "2",
        radius: "3,389 km",
        period: "687 days",
        day: "24.6 hours",
        gravity: "3.71 m/s²",
        type: "Terrestrial",
        desc: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was—billions of years ago—wetter and warmer, with a thick atmosphere."
    },
    jupiter: {
        name: "Jupiter",
        image: "assets/images/jupiter.png",
        color: "#d97706",
        distance: "5.20 AU",
        mass: "317.8 M⊕",
        temp: "-110°C",
        moons: "95",
        radius: "69,911 km",
        period: "11.8 years",
        day: "9.9 hours",
        gravity: "24.79 m/s²",
        type: "Gas Giant",
        desc: "Jupiter has more than twice the mass of all the other planets combined. The Great Red Spot is a giant storm that has raged for hundreds of years."
    },
    saturn: {
        name: "Saturn",
        image: "assets/images/saturn.png",
        color: "#eab308",
        distance: "9.58 AU",
        mass: "95.2 M⊕",
        temp: "-140°C",
        moons: "146",
        radius: "58,232 km",
        period: "29.4 years",
        day: "10.7 hours",
        gravity: "10.44 m/s²",
        type: "Gas Giant",
        desc: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's."
    },
    uranus: {
        name: "Uranus",
        image: "assets/images/uranus.png",
        color: "#06b6d4",
        distance: "19.2 AU",
        mass: "14.5 M⊕",
        temp: "-195°C",
        moons: "27",
        radius: "25,362 km",
        period: "84 years",
        day: "17.2 hours",
        gravity: "8.69 m/s²",
        type: "Ice Giant",
        desc: "Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side."
    },
    neptune: {
        name: "Neptune",
        image: "assets/images/neptune.png",
        color: "#2563eb",
        distance: "30.1 AU",
        mass: "17.1 M⊕",
        temp: "-200°C",
        moons: "14",
        radius: "24,622 km",
        period: "165 years",
        day: "16.1 hours",
        gravity: "11.15 m/s²",
        type: "Ice Giant",
        desc: "Neptune is the only planet in our solar system not visible to the naked eye. In 2011 Neptune completed its first 165-year orbit since its discovery in 1846."
    }
};

const NASA_API_KEY = "DEMO_KEY"; // In production, use a real key to avoid limits

// --- DOM ELEMENTS ---
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.app-section');

// APOD Elements
const apodDateInput = document.getElementById('apod-date-input');
const loadDateBtn = document.getElementById('load-date-btn');
const todayApodBtn = document.getElementById('today-apod-btn');
const apodImage = document.getElementById('apod-image');
const apodVideo = document.getElementById('apod-video');
const apodTitle = document.getElementById('apod-title');
const apodDateDetail = document.getElementById('apod-date-detail');
const apodExplanation = document.getElementById('apod-explanation');
const apodHdLink = document.getElementById('apod-hd-link');
const apodLoading = document.getElementById('apod-loading');
const apodCopyright = document.getElementById('apod-copyright');

// APOD extra Elements (date texts)
const apodSubtitle = document.getElementById('apod-date');
const apodDateInfo = document.getElementById('apod-date-info');
const apodMediaTypeInfo = document.getElementById('apod-media-type');
const apodDateWrapper = document.getElementById('apod-date-wrapper');

// Planet Elements
const planetsGrid = document.getElementById('planets-grid');

// --- INIT ---
function init() {
    setupNavigation();
    setupPlanets();
    
    // Set date input to today
    const today = new Date().toISOString().split('T')[0];
    if (apodDateInput) {
        apodDateInput.value = today;
        apodDateInput.max = today;
    }
    updateDatePill(today)
    
    // Load APOD
    fetchAPOD(today);

    // Setup Mobile Toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('sidebar-open')) {
                sidebar.classList.remove('sidebar-open');
            }
        }
    });

    // Select Earth by default
    selectPlanet('earth');
}

// --- NAVIGATION ---
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update Active State
            navLinks.forEach(l => {
                l.classList.remove('bg-blue-500/10', 'text-blue-400');
                l.classList.add('text-slate-300', 'hover:bg-slate-800');
            });
            link.classList.remove('text-slate-300', 'hover:bg-slate-800');
            link.classList.add('bg-blue-500/10', 'text-blue-400');

            // Show Section
            const sectionId = link.getAttribute('data-section');
            sections.forEach(section => {
                if (section.id === sectionId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });

            // Close sidebar on mobile after click
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('sidebar-open');
            }
        });
    });
}

// --- APOD LOGIC ---

function formatLongDate(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatShortDate(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function updateDatePill(dateStr) {
    if (!apodDateWrapper) return;
    apodDateWrapper.setAttribute('data-date', formatShortDate(dateStr));
}
async function fetchAPOD(date) {
    if (!apodLoading) return;

    // UI Loading State
    apodLoading.classList.remove('hidden');
    if (apodImage) apodImage.classList.add('hidden');
    if (apodVideo) apodVideo.classList.add('hidden');
    if (apodTitle) apodTitle.textContent = "Loading...";

    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`);

        if (response.status === 429) {
            throw new Error("API Rate Limit Exceeded. Using Demo Data.");
        }

        const data = await response.json();
        renderAPOD(data);
    } catch (error) {
        console.warn("APOD Fetch Failed (likely rate limit or CORS), using fallback data.", error);
        renderAPOD(getFallbackAPOD(date));
    }
}

function renderAPOD(data) {
    if (apodLoading) apodLoading.classList.add('hidden');

    const longDate = formatLongDate(data.date);

    if (apodTitle) apodTitle.textContent = data.title || '';
    if (apodDateDetail) apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i> ${longDate}`;
    if (apodSubtitle) apodSubtitle.textContent = `Astronomy Picture of the Day - ${longDate}`;
    if (apodDateInfo) apodDateInfo.textContent = longDate;
    if (apodMediaTypeInfo) apodMediaTypeInfo.textContent = (data.media_type === "video") ? "Video" : "Image";
    if (apodExplanation) apodExplanation.textContent = data.explanation || '';

    updateDatePill(data.date);

    if (apodCopyright) {
        if (data.copyright) {
            apodCopyright.textContent = `© ${data.copyright}`;
            apodCopyright.classList.remove('hidden');
        } else {
            apodCopyright.classList.add('hidden');
        }
    }

    if (data.media_type === "video") {
        if (apodVideo) {
            apodVideo.src = data.url;
            apodVideo.classList.remove('hidden');
        }
        if (apodImage) apodImage.classList.add('hidden');
        if (apodHdLink) apodHdLink.classList.add('hidden'); // No HD link for videos
    } else {
        if (apodImage) {
            apodImage.src = data.url;
            apodImage.classList.remove('hidden');
        }
        if (apodVideo) {
            apodVideo.classList.add('hidden');
            apodVideo.src = '';
        }
        if (apodHdLink) {
            apodHdLink.href = data.hdurl || data.url;
            apodHdLink.classList.remove('hidden');
        }
    }
}

function getFallbackAPOD(date) {
  const fallbackAPODs = [
    {
      url: "img/001.jpg",
      title: "Cosmic Reef",
      explanation:
        "A colorful, coral-like structure of gas and dust shaped by powerful stellar winds.",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/002.jpg",
      title: "Galaxies in the Furnace",
      explanation:
        "An example of violence on a cosmic scale, enormous elliptical galaxy NGC 1316 lies about 75 million light-years away toward Fornax, the southern constellation of the Furnace. Investigating the startling sight, astronomers suspect the giant galaxy of colliding with smaller neighbor NGC 1317 seen just right of the large galaxy's center, producing far flung star streams in loops and shells. Light from their close encounter would have reached Earth some 100 million years ago. In the sharp telescopic image, the central regions of NGC 1316 and NGC 1317 appear separated by over 100,000 light-years. Complex dust lanes visible within also indicate that NGC 1316 is itself the result of a merger of galaxies in the distant past. Found on the outskirts of the Fornax galaxy cluster, NGC 1316 is known as Fornax A. One of the visually brightest of the Fornax cluster galaxies it is one of the strongest and largest celestial radio sources with radio emission extending well beyond this one degree wide field-of-view..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/003.jpg",
      title: "M77: Spiral Galaxy with an Active Center",
      explanation:
        "What's happening in the center of nearby spiral galaxy M77? The face-on galaxy lies a mere 47 million light-years away toward the constellation of the Sea Monster (Cetus). At that estimated distance, this gorgeous island universe is about 100 thousand light-years across. Also known as NGC 1068, its compact and very bright core is well studied by astronomers exploring the mysteries of supermassive black holes in active Seyfert galaxies. M77's active core glows bright at x-ray, ultraviolet, visible, infrared, and radio wavelengths. The featured sharp image of M77 was taken by the Hubble Space Telescope. The image shows details of the spiral's winding spiral arms as traced by obscuring red dust clouds and blue star clusters, all circling the galaxy's bright white luminous center. Free APOD Lecture in Phoenix: Wednesday, December 10 at 7 pm.",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/004.jpg",
      title: "NGC 6960: The Witch's Broom Nebula",
      explanation:
        "Ten thousand years ago, before the dawn of recorded human history, a new light would suddenly have appeared in the night sky and faded after a few weeks. Today we know this light was from a supernova, or exploding star, and record the expanding debris cloud as the Veil Nebula, a supernova remnant. This sharp telescopic view is centered on a western segment of the Veil Nebula cataloged as NGC 6960 but less formally known as the Witch's Broom Nebula. Blasted out in the cataclysmic explosion, an interstellar shock wave plows through space sweeping up and exciting interstellar material. Imaged with narrow band filters, the glowing filaments are like long ripples in a sheet seen almost edge on, remarkably well separated into atomic hydrogen (red) and oxygen (blue-green) gas. The complete supernova remnant lies about 1400 light-years away towards the constellation Cygnus. This Witch's Broom actually spans about 35 light-years. The bright star in the frame is 52 Cygni, visible with the unaided eye from a dark location but unrelated to the ancient supernova remnant..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/005.jpg",
      title: "LDN 1235: The Shark Nebula",
      explanation:
        "There is no sea on Earth large enough to contain the Shark nebula. This predator apparition poses us no danger as it is composed only of interstellar gas and dust. Dark dust like that featured here is somewhat like cigarette smoke and created in the cool atmospheres of giant stars. After expelling gas and gravitationally recondensing, massive stars may carve intricate structures into their birth cloud using their high energy light and fast stellar winds as sculpting tools. The heat they generate evaporates the murky molecular cloud as well as causing ambient hydrogen gas to disperse and glow red. During disintegration, we humans can enjoy imagining these great clouds as common icons, like we do for water clouds on Earth. Including smaller dust nebulae such as Van den Bergh 149 & 150, the Shark nebula, sometimes cataloged as LDN 1235, spans about 15 light years and lies about 650 light years away toward the constellation of the King of Aethiopia (Cepheus). Explore Your Universe: Random APOD Generator.",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/006.jpg",
      title: "Planetary Nebula Abell 7",
      explanation:
        "Very faint planetary nebula Abell 7 is about 1,800 light-years distant. It lies just south of Orion in planet Earth's skies toward the constellation Lepus, The Hare. Surrounded by Milky Way stars and near the line-of-sight to distant background galaxies its generally simple spherical shape, about 8 light-years in diameter, is revealed in this deep telescopic image. Within the cosmic cloud are beautiful and complex structures though, enhanced by the use of long exposures and narrowband filters that capture emission from hydrogen, sulfur, and oxygen atoms. Otherwise Abell 7 would be much too faint to be appreciated by eye. A planetary nebula represents a very brief final phase in stellar evolution that our own Sun will experience 5 billion years hence, as the nebula's central, once sun-like star shrugs off its outer layers. Abell 7 itself is estimated to be 20,000 years old. But its central star, seen here as a fading white dwarf, is some 10 billion years old..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/007.png",
      title: "Tololo Totality",
      explanation:
        "On March 14 the Moon was Full. In an appropriate celebration of Pi day, that put the Moon 3.14 radians (180 degrees) in ecliptic longitude from the Sun in planet Earth's sky. As a bonus for fans of Pi and the night sky, on that date the Moon also passed directly through Earth's umbral shadow in a total lunar eclipse. In clear skies, the colors of an eclipsed Moon can be vivid. Reflecting the deeply reddened sunlight scattered into Earth's shadow, the darkened lunar disk was recorded in this time series composite image from Cerro Tololo Observatory, Chile. The lunar triptych captures the start, middle, and end of the total eclipse phase that lasted about an hour. A faint bluish tint seen just along the brighter lunar limb at the shadow's edge is due to sunlight filtered through Earth's stratospheric ozone layer. Growing Gallery: Total Lunar Eclipse of 2025 March.",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/008.jpg",
      title: "Venus and the Triply Ultraviolet Sun",
      explanation:
        "This was a very unusual type of solar eclipse. Typically, it is the Earth's Moon that eclipses the Sun. In 2012, though, the planet Venus took a turn. Like a solar eclipse by the Moon, the phase of Venus became a continually thinner crescent as Venus became increasingly better aligned with the Sun. Eventually the alignment became perfect and the phase of Venus dropped to zero. The dark spot of Venus crossed our parent star. The situation could technically be labeled a Venusian annular eclipse with an extraordinarily large ring of fire. Pictured here during the occultation, the Sun was imaged in three colors of ultraviolet light by the Earth-orbiting Solar Dynamics Observatory, with the dark region toward the right corresponding to a coronal hole. Hours later, as Venus continued in its orbit, a slight crescent phase appeared again. The next Venusian transit across the Sun will occur in 2117..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/009.jpg",
      title: "Moon Pi and Mountain Shadow",
      explanation:
        "What phase of the Moon is 3.14 radians from the Sun? The Full Moon, of course. Even though the Moon might look full for several days, the Moon is truly at its full phase when it is Pi radians (aka 180 degrees) from the Sun in ecliptic longitude. That's opposite the Sun in planet Earth's sky. Rising as the Sun set on March 9, 2020, only an hour or so after the moment of its full phase, this orange tinted and slightly flattened Moon still looked full. It was photographed opposite the setting Sun from Teide National Park on the Canary Island of Tenerife. Also opposite the setting Sun, seen from near the Teide volcano peak about 3,500 meters above sea level, is the mountain's rising triangular shadow extending into Earth's dense atmosphere. Below the distant ridge line on the left are the white telescope domes of Teide Observatory. Today, March 14 2025, the moon is Pi radians from the Sun at exactly 06:55 UTC. That's about three minutes before the midpoint of the March Full Moon's total lunar eclipse..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/010.jpg",
      title: "Cosmic Clouds",
      explanation:
        "Soft-looking interstellar clouds—dusty lanes and faint glow layered across the darkness.",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/011.jpg",
      title: "Apollo 17's Moonship",
      explanation:
        "Awkward and angular looking, Apollo 17's lunar module Challenger was designed for flight in the near vacuum of space. Digitally enhanced and reprocessed, this picture taken from Apollo 17's command module America shows Challenger's ascent stage in lunar orbit. Small reaction control thrusters are at the sides of the moonship with the bell of the ascent rocket engine underneath. The hatch that allowed access to the lunar surface is seen at the front, with a round radar antenna at the top. Mission commander Gene Cernan is clearly visible through the triangular window. This spaceship performed gracefully, landing on the Moon and returning the Apollo astronauts to the orbiting command module in December of 1972. So where is Challenger now? While its descent stage remains at the Apollo 17 landing site in the Taurus-Littrow valley, the ascent stage pictured was intentionally crashed nearby after being jettisoned from the command module prior to the astronauts' return to planet Earth..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/012.jpg",
      title: "Micro Moon vs. Super Moon",
      explanation:
        "What was so super about Wednesday's supermoon? Last week, a full moon occurred that appeared slightly larger and brighter than usual. The reason is that the Moon's fully illuminated phase occurred within a short time from perigee - when the Moon was its closest to the Earth in its elliptical orbit. Although the precise conditions that define a supermoon vary, last Wednesday's supermoon was surely the closest, largest, and brightest full moon this year. One reason supermoons are popular is because they are so easy to see -- just go outside at sunset and watch an impressive full moon rise! Pictured here, Wednesday's supermoon is compared to April's micro moon -- when a full Moon occurs near the furthest part of the Moon's orbit -- so that it appears slightly smaller and dimmer than usual. Given many definitions, at least one supermoon occurs each year, with another one coming next month (moon-th)..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/013.jpg",
      title: "Crossing Saturn's Ring Plane",
      explanation:
        "If this is Saturn, where are the rings? When Saturn's\"appendages\"disappeared in 1612, Galileo did not understand why. Later that century, it became understood that Saturn's unusual protrusions were rings and that when the Earth crosses the ring plane, the edge-on rings will appear to disappear. This is because Saturn's rings are confined to a plane many times thinner, in proportion, than a razor blade. In modern times, the robotic Cassini spacecraft that orbited Saturn frequently crossed Saturn's ring plane during its mission to Saturn, from 2004 to 2017. A series of plane crossing images from 2005 February was dug out of the vast online Cassini raw image archive by interested Spanish amateur Fernando Garcia Navarro. Pictured here, digitally cropped and set in representative colors, is the striking result. Saturn's thin ring plane appears in blue, bands and clouds in Saturn's upper atmosphere appear in gold. Details of Saturn's rings can be seen in high dark shadows. The moons Dione and Enceladus appear as bumps in the rings..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/014.jpeg",
      title: "Florida Northern Lights",
      explanation:
        "Northern lights have come to Florida skies. In fact, the brilliant streak of a Northern Taurid meteor flashes through the starry night sky above the beach in this sea and skyscape, captured from Shired Island, Florida on November 11. Meteors from the annual Northern Taurid meteor shower are expected this time of year. But the digital camera exposure also records the shimmering glow of aurora, a phenomenon more often seen from our fair planet's higher geographical latitudes. Also known as aurora borealis, these northern lights are part of recent, wide spread auroral activity caused by strong geomagnetic storms. In the last few days, stormy spaceweather has been triggered by multiple Earth impacting coronal mass ejections and intense solar activity..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/015.jpg",
      title: "50 Light-years to 51 Pegasi",
      explanation:
        "It's only 50 light-years to 51 Pegasi. That star's position is indicated in this snapshot from August 2025, taken on a night with mostly brighter stars visible above the dome at Observatoire de Haute-Provence in France. Thirty years ago, in October of 1995, astronomers Michel Mayor and Didier Queloz announced a profound discovery made at the observatory. Using a precise spectrograph, they had detected a planet orbiting 51 Peg, the first known exoplanet orbiting a sun-like star. Mayor and Queloz had used the spectrograph to measure changes in the star's radial velocity, a regular wobble caused by the gravitational tug of the orbiting planet. Designated 51 Pegasi b, the planet was determined to have a mass at least half of Jupiter's mass and an orbital period of 4.2 days. That made the exoplanet much closer to its parent star than Mercury is to the Sun. Their discovery was quickly confirmed and Mayor and Queloz were ultimately awarded the Nobel Prize in physics in 2019. Now recognized as the prototype for the class of exoplanets fondly known as hot Jupiters, 51 Pegasi b was formally named Dimidium, Latin for half, in 2015. Since its discovery 30 years ago, over 6,000 exoplanets have been found..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/016.jpg",
      title: "Manicouagan Impact Crater from Space",
      explanation:
        "Orbiting 400 kilometers above Quebec, Canada, planet Earth, the International Space Station Expedition 59 crew captured this snapshot of the broad St. Lawrence River and curiously circular Lake Manicouagan on April 11, 2019. Right of center, the ring-shaped lake is a modern reservoir within the eroded remnant of an ancient 100 kilometer diameter impact crater. The ancient crater is very conspicuous from orbit, a visible reminder that Earth is vulnerable to rocks from space. Over 200 million years old, the Manicouagan crater was likely caused by the impact of a rocky body about 5 kilometers in diameter. Currently, there is no known asteroid with a significant probability of impacting Earth in the next century. Each month, NASA’s Planetary Defense Coordination Office releases an update featuring the most recent figures on near-Earth object close approaches, and other facts about comets and asteroids that could pose a potential impact hazard with Earth..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/017.jpg",
      title: "3D Bennu",
      explanation:
        "Put on your red/blue glasses and float next to asteroid 101955 Bennu. Shaped like a spinning toy top with boulders littering its rough surface, the tiny Solar System world is about one Empire State Building (less than 500 meters) across. Frames used to construct this 3D anaglyph were taken by PolyCam on the OSIRIS_REx spacecraft on December 3, 2018 from a distance of about 80 kilometers. With a sample from the asteroid's rocky surface on board, OSIRIS_REx departed Bennu's vicinity in May of 2021. The robotic spacecraft successfully returned the sample to its home world in September of 2023..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/018.jpg",
      title: "Comet Churyumov-Gerasimenko Creates Its Tails",
      explanation:
        "Where do comet tails come from? There are usually no obvious places on the nuclei of comets from which the jets that create comet tails emanate. One of the best images of emerging jets is shown in the featured picture, taken in 2015 by ESA's robotic Rosetta spacecraft that orbited Comet 67P/Churyumov-Gerasimenko (Comet CG) from 2014 to 2016. The picture shows plumes of gas and dust escaping numerous places from Comet CG's nucleus as it neared the Sun and heated up. The comet has two prominent lobes, the larger one spanning about 4 kilometers, and a smaller 2.5-kilometer lobe connected by a narrow neck. Analyses indicate that evaporation must be taking place well inside the comet's surface to create the jets of gas, dust, and ice that we see emitted through the surface. Comet CG (also known as Comet 67P) loses in jets about a meter of surface depth during each of its 6.44-year orbits around the Sun, a rate at which will completely destroy the comet in only thousands of years. In 2016, Rosetta's mission ended with a controlled impact onto Comet CG's surface..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/019.jpg",
      title: "Finding Comet Lemmon",
      explanation:
        "Tonight, if you can see the stars of the Big Dipper, then you can find comet Lemmon in your evening sky. After sunset, look for the faint but extended comet above your northwestern horizon -- but below the handle of the famous celestial kitchen utensil of the north. It might be easier to see this visitor to the inner Solar System through your camera phone, which is better at picking up faint objects. Either way, look for a fuzzy green 'star' with a tail, though probably not so long a tail as in this impressive snapshot taken over Seč Lake in the Czech Republic two nights ago. Recent photographs of C/2025 A6 (Lemmon) often show a detailed and changing ion tail which extends farther than the eye can follow. This Sun-orbiting comet is now near its closest approach to Earth and will pass its closest to the Sun in early November..",
      copyright: "Unsplash Archive"
    },
    {
      url: "img/020.jpg",
      title: "IC 1805: The Heart Nebula",
      explanation:
        "What electrifies the Heart Nebula? First, the large emission nebula on the left, catalogued as IC 1805, looks somewhat like a human heart. The nebula glows brightly in red light emitted by its most prominent element, hydrogen, but this long-exposure image was also blended with light emitted by sulfur (yellow) and oxygen (blue). In the center of the Heart Nebula are young stars from the open star cluster Melotte 15 that are eroding away several picturesque dust pillars with their atom-exciting energetic light and winds. The Heart Nebula is located about 7,500 light years away toward the constellation of Cassiopeia. At the top right of the Heart Nebula is the companion Fishhead Nebula. This wide and deep image clearly shows that glowing gas surrounds the Heart Nebula in all directions..",
      copyright: "Unsplash Archive"
    }
  ];

  // Generate a consistent index based on the date string
  // Same date => same fallback item. Different dates => different item.
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = date.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % fallbackAPODs.length;

  const item = fallbackAPODs[index];

  return {
    title: item.title,
    date: date,
    explanation: item.explanation,
    url: item.url,
    media_type: "image",
    copyright: item.copyright
  };
}

if (loadDateBtn) {
    loadDateBtn.addEventListener('click', () => {
        const date = apodDateInput.value;
        if (date) fetchAPOD(date);
    });
}

if (apodDateInput) {
    // ✅ Change only the date shown inside the pill (NO loading here)
    apodDateInput.addEventListener('change', () => {
        const date = apodDateInput.value;
        if (date) updateDatePill(date);
    });
}

if (todayApodBtn) {
    todayApodBtn.addEventListener('click', () => {
        const today = new Date().toISOString().split('T')[0];
        if (apodDateInput) apodDateInput.value = today;
        updateDatePill(today);
        fetchAPOD(today);
    });
}

// --- PLANETS LOGIC ---
function setupPlanets() {
    if (!planetsGrid) return;

    // 1. Generate Grid
    Object.keys(PLANETS).forEach(key => {
        const p = PLANETS[key];
        const card = document.createElement('div');
        card.className = "planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer hover:bg-slate-800 hover:border-slate-600 group";
        card.dataset.id = key;
        card.innerHTML = `
            <div class="relative mb-3 h-20 flex items-center justify-center">
                    <img src="${p.image}" class="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" alt="${p.name}">
            </div>
            <h4 class="font-semibold text-center text-sm">${p.name}</h4>
            <p class="text-xs text-slate-400 text-center">${p.distance}</p>
        `;
        card.addEventListener('click', () => selectPlanet(key));
        planetsGrid.appendChild(card);
    });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "";
}

function selectPlanet(key) {
  const data = PLANETS[key];
  if (!data) return;

  const color = data.color;

  // Highlight selected card
  document.querySelectorAll('.planet-card').forEach(c => {
    if (c.dataset.id === key) {
      c.classList.add('border-blue-500');
      c.classList.remove('border-slate-700');
    } else {
      c.classList.remove('border-blue-500');
      c.classList.add('border-slate-700');
    }
  });

  // Update Details
  const nameEl = document.getElementById('planet-detail-name');
  if (nameEl) {
    nameEl.textContent = data.name;
    nameEl.style.color = color;
  }

  setText('planet-detail-description', data.desc);

  // These match your HTML
  setText('planet-distance', data.distance);
  setText('planet-radius', data.radius);
  setText('planet-mass', data.mass);
  setText('planet-temp', data.temp);
  setText('planet-moons', data.moons);
  setText('planet-gravity', data.gravity);

  // ✅ Fix the mismatched IDs
  setText('planet-orbital-period', data.period); // was planet-period
  setText('planet-rotation', data.day);          // was planet-day
  setText('planet-body-type', data.type);        // was planet-type

  // Update Large Image (will now run)
  const imgElement = document.getElementById('planet-detail-image');
  if (imgElement) {
    imgElement.alt = `${data.name} planet detailed render`;
    imgElement.src = new URL(data.image, document.baseURI).href; // safest path handling
  }
}


// Run
// Ensure DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
