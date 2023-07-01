// Daha sade bir yazım için gerekli etiketlere ulaşılması
const songName = document.querySelector(".song-name");
const singer = document.querySelector(".singer");
const songImg = document.querySelector(".song-img");
const songFile = document.querySelector(".song-file");
const audio = document.getElementById("myAudio");
const timeRange = document.getElementById("timeRange");
const volumeRange = document.getElementById("volumeRange");
const volumeIcon = document.querySelector(".volume").querySelector("i");
const btnPlayPause = document.querySelector("#btn-play-pause");
const btnPlayPauseIcon = document.querySelector("#btn-play-pause").querySelector("i");
const musicGroupList = document.querySelector(".list-group");
const currentTimeSpan = document.querySelector(".current-time");
const maxTimeSpan = document.querySelector(".max-time");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");


const player = new MusicPlayer(musicList);


// Sayfa Açılınca ilk baştaki Şarkı ismi yazılsın ve şarkıcı yazılsın, liste oluşturulsun
window.addEventListener("load", () => {
    player.index = 0;
    player.getMusic();


    var dosyaYollari = [];
    for (let music of player.list) {
        dosyaYollari.push(`mp3/${music.file}`);
    }

    var songIndex = 0;
    var yuklemeIslemleri = [];

    dosyaYollari.forEach(function (dosyaYolu) {
        var yuklemeIslemi = new Promise(function (resolve) {
            var sesDosyasi = new Audio(dosyaYolu);
            sesDosyasi.addEventListener("loadedmetadata", function () {
                var sure = sesDosyasi.duration;
                var integerMinute = Math.floor(sure / 60); // Dakikanın tam sayı kısmı
                var decimalMinute = Math.floor((sure % 60)).toString().padStart(2, '0');; // Dakikanın noktadan sonraki kısmı, 2 basamağa yuvarlanmış

                resolve({
                    integerMinute: integerMinute,
                    decimalMinute: decimalMinute
                });
            });
        });

        yuklemeIslemleri.push(yuklemeIslemi);
    });

    Promise.all(yuklemeIslemleri)
        .then(function (sureler) {
            sureler.forEach(function (sure) {
                let activeClass = "";
                if (songIndex == player.index) {
                    activeClass = "active";
                }
                let li = `
                        <li class="list-group-item ${activeClass}">
                        <span class="song-name">${player.list[songIndex].songName} - ${player.list[songIndex].singer}</span>
                        <span class="song-duration badge rounded-pill text-bg-primary">${sure.integerMinute}:${sure.decimalMinute}</span>
                        </li>
                    `;

                musicGroupList.insertAdjacentHTML("beforeend", li);

                songIndex++;
            });

            // Listede bir elemana basılınca basılan müziğin çalınması
            for (let i = 0; i < musicGroupList.children.length; i++) {
                musicGroupList.children[i].addEventListener("click", function () {
                    if (!musicGroupList.children[i].classList.contains("active")) {
                        document.querySelector(".list-group-item.active").classList.remove("active");
                        musicGroupList.children[i].classList.add("active");
                        player.index = i;
                        player.getMusic();
                        audio.play();
                        audio.classList.add("playing");
                        btnPlayPauseIcon.classList = "fa-solid fa-pause";
                    }
                })
            }
        });
})

//Current Time değiştikçe İnput value değiştirme 
function updateTimeRange() {

    var duration = audio.duration;
    var currentTime = audio.currentTime;
    var timePercentage = (currentTime / duration) * 100;
    timeRange.value = timePercentage;

    var integerCurrentMinute = Math.floor(currentTime / 60); // Dakikanın tam sayı kısmı
    var decimalCurrentMinute = Math.floor((currentTime % 60)).toString().padStart(2, '0');; // Dakikanın noktadan sonraki kısmı, 2 basamağa yuvarlanmış


    currentTimeSpan.innerText = `${integerCurrentMinute}:${decimalCurrentMinute}`;

    if (currentTime == duration) {
        player.nextMusic();
    }
}

audio.addEventListener("timeupdate", updateTimeRange);

//Time Range ile Current Time değiştirme
timeRange.addEventListener("input", function () {
    var timePercentage = timeRange.value / 100;
    var duration = audio.duration;
    var currentTime = timePercentage * duration;
    if (currentTime !== duration) {
        audio.currentTime = currentTime;
    }
});


//Volume Range ile Ses düzeyini değiştirme
var sonDeger = 50;
volumeIcon.addEventListener("click", function () {
    if (volumeIcon.classList.contains("fa-volume-high")) {
        sonDeger = volumeRange.value;
        volumeIcon.classList = "fa-solid fa-volume-xmark";
        volumeRange.value = 0
        var volume = volumeRange.value / 100; // Ses düzeyini 0-1 aralığına dönüştürme
        audio.volume = volume;

        if (volume == 0) {
            volumeIcon.classList = "fa-solid fa-volume-xmark";
        } else {
            volumeIcon.classList = "fa-solid fa-volume-high";
        }
    } else {
        volumeRange.value = sonDeger;
        volumeIcon.classList = "fa-solid fa-volume-high";
        var volume = volumeRange.value / 100; // Ses düzeyini 0-1 aralığına dönüştürme
        audio.volume = volume;

        if (volume == 0) {
            volumeIcon.classList = "fa-solid fa-volume-xmark";
        } else {
            volumeIcon.classList = "fa-solid fa-volume-high";
        }
    }
});
volumeRange.addEventListener("input", function () {
    var volume = volumeRange.value / 100; // Ses düzeyini 0-1 aralığına dönüştürme
    audio.volume = volume;

    if (volume == 0) {
        volumeIcon.classList = "fa-solid fa-volume-xmark";
        sonDeger = 50;
    } else {
        volumeIcon.classList = "fa-solid fa-volume-high";
    }
});

// Play Butonuna basınca Şarkı çalmaya başlasın

btnPlayPause.addEventListener("click", function () {

    if (audio.classList.contains("playing") == 1) {
        btnPlayPauseIcon.classList = "fa-solid fa-play";
        audio.pause();
        audio.classList.remove("playing");
    } else {
        btnPlayPauseIcon.classList = "fa-solid fa-pause";
        audio.play();
        audio.classList.add("playing");
    }

});

// Next butonuna basınca ilerle

btnNext.addEventListener("click", function () {
    player.nextMusic();
    timeRange.value = 0;
})

// Previous butonuna basınca ilerle

btnPrev.addEventListener("click", function () {
    player.prevMusic();
    timeRange.value = 0;


})

