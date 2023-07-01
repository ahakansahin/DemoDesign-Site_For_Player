class MusicPlayer{
    constructor(list){
        this.list=list,
        this.index=0
    }
}

MusicPlayer.prototype.getMusic = function(){
    songName.innerText = this.list[this.index].songName;
    singer.innerText = this.list[this.index].singer;
    songImg.src ="img/" + this.list[this.index].img;
    songFile.src ="mp3/" + this.list[this.index].file;

    audio.addEventListener("loadedmetadata", function(){
        var integerMaxMinute = Math.floor(audio.duration / 60); // Dakikanın tam sayı kısmı
        var decimalMaxMinute = Math.floor((audio.duration % 60)).toString().padStart(2, '0');; // Dakikanın noktadan sonraki kısmı, 2 basamağa yuvarlanmış
        maxTimeSpan.innerText=`${integerMaxMinute}:${decimalMaxMinute}`;
    })

}
MusicPlayer.prototype.nextMusic = function(){
    timeRange.value =0;
    this.index++;
    if(this.index==this.list.length){
        this.index=0;
    }
    songName.innerText = this.list[this.index].songName;
    singer.innerText = this.list[this.index].singer;
    songImg.src ="img/" + this.list[this.index].img;
    songFile.src ="mp3/" + this.list[this.index].file;

    audio.addEventListener("loadedmetadata", function(){
        timeRange.value = 0;
        var integerMaxMinute = Math.floor(audio.duration / 60); // Dakikanın tam sayı kısmı
        var decimalMaxMinute = Math.floor((audio.duration % 60)).toString().padStart(2, '0');; // Dakikanın noktadan sonraki kısmı, 2 basamağa yuvarlanmış
        maxTimeSpan.innerText=`${integerMaxMinute}:${decimalMaxMinute}`;
        audio.play();
        audio.classList.add("playing");
        btnPlayPauseIcon.classList = "fa-solid fa-pause";

    });

    document.querySelector(".list-group-item.active").classList.remove("active");
    musicGroupList.children[this.index].classList.add("active");

}

MusicPlayer.prototype.prevMusic = function(){
    timeRange.value =0;
    this.index--;
    if(this.index<0){
        this.index=this.list.length-1;
    }
    songName.innerText = this.list[this.index].songName;
    singer.innerText = this.list[this.index].singer;
    songImg.src ="img/" + this.list[this.index].img;
    songFile.src ="mp3/" + this.list[this.index].file;

    audio.addEventListener("loadedmetadata", function(){
        timeRange.value = 0;
        var integerMaxMinute = Math.floor(audio.duration / 60); // Dakikanın tam sayı kısmı
        var decimalMaxMinute = Math.floor((audio.duration % 60)).toString().padStart(2, '0');; // Dakikanın noktadan sonraki kısmı, 2 basamağa yuvarlanmış
        maxTimeSpan.innerText=`${integerMaxMinute}:${decimalMaxMinute}`;
        audio.play();
        audio.classList.add("playing");
        btnPlayPauseIcon.classList = "fa-solid fa-pause";

    });

    document.querySelector(".list-group-item.active").classList.remove("active");
    musicGroupList.children[this.index].classList.add("active");
}
