// const urlAPI = 'http://localhost:3000/song'
// var output = []
// callAPI = function(){
//     fetch(urlAPI)
//         .then(function(response){
//             return response.json()
//         })
//         .then(function(data){
//             output.push(data)
//         })
//     return output
// }
// callAPI()
const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'TA_player'

const header = $('header h2')
const cdThump = $('.cd-thumb')
const audio = $('#audio')
const btnPlay = $('.control .btn-toggle-play')
const player = $('.player')
const cd = $('.cd')
const progress = $('#progress')
const next =$('.btn.btn-next')
const prev =$('.btn.btn-prev')
const random = $('.btn.btn-random')
const repeat = $('.btn.btn-repeat')
const playlist = $('.playlist')
const timechange = $('.timeChange')
const timeTotal = $('.timeTotal')
const app ={
    currentTotalTime:0,
    currentIndex: 0,
    isPlaying : false,
    isRandom: false,
    isRepeat :false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
        "name": "Baby",
        "singer": "Justin Beiber",
        "path": "./audio/Baby - Justin Bieber_ Ludacris.mp3",
        "image": "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
        "name": "Xin Chao Viet Nam",
        "singer": "Ái Phương",
        "path": "./audio/XinChaoVietNamAiPhuong.mp3",
        "image":
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
        "name": "Đừng Hẹn Kiếp Sau",
        "singer": "Đình Dũng",
        "path":
            "./audio/DungHenKiepSau.mp3",
        "image": "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
        "name": "Hãy Trao Cho Anh",
        "singer":  "Sơn Tùng",
        "path": "./audio/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3",
        "image":
            "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
        "name": "Bình Yên Những Phút Giây",
        "singer": "Sơn Tùng",
        "path": "./audio/BinhYenNhungPhutGiay-SonTungMTP-4915711.mp3",
        "image":
            "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
        "name": "Không Phải Dạng Vừa Đâu",
        "singer":  "Sơn Tùng",
        "path":
            "./audio/KhongPhaiDangVuaDau-SonTungMTP-3753840.mp3",
        "image":
            "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
        },
        {
        "name": "Như Ngày Hôm Qua",
        "singer": "Tùng Núi MTP",
        "path": "./audio/NhuNgayHomQuaUpgrade-SonTungMTP-4282962.mp3",
        "image":
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
    setConfig: function(key,value){
        this.config[key]= value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function(){
        const htmls = this.songs.map((song,index)=>{
            return `<div class="song ${index === this.currentIndex?'active':''}" data-index =${index}>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
            </div>
            <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>`
        })
        playlist.innerHTML = htmls.join('')
    },
    defaultProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function() {
                return this.songs[this.currentIndex]
            } 
        })
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    handleEvent: function(){
        //quay dia
        const rotateCD = cdThump.animate([{
            transform : 'rotate(360deg)'
        }],{
            duration: 10000,
            iterations: Infinity
        })
        rotateCD.pause()
        //xu ly keo scroll
        const cdWidth = cd.offsetWidth
        document.onscroll = function(){
            // console.log(document.documentElement.scrollTop)

            const scrollTop = document.documentElement.scrollTop
            const newcdWidth = (cdWidth-scrollTop)>0?(cdWidth-scrollTop):0

            cd.style.width = newcdWidth + 'px'
            cd.style.opacity = newcdWidth / cdWidth

        }
        // progress.value = 0
        //xu ly btn Play
        var _this = this
        btnPlay.onclick = ()=>{
            if(_this.isPlaying === false){
                audio.play();
            }
            else{
                audio.pause();
            }
        }
        //khi song dduoc play
        audio.onplay =()=>{
            rotateCD.play()
            player.classList.add('playing')
            _this.isPlaying = true
            // timeTotal.innerText = 0
            
            
        }
        audio.onpause =()=>{
            rotateCD.pause()
            player.classList.remove('playing')
            _this.isPlaying = false
            

        }
        //lay thoi gian dang chay
        audio.onloadedmetadata = function () {
            timeTotal.innerText = Math.round((audio.duration / 60)*100)/100
            progress.value = 0;
            timechange.innerText = 0
            
        }
        audio.ontimeupdate =()=>{
            // console.log(audio);
            //xu ly totalTIme
            progress.value = ((audio.currentTime / audio.duration) * 100)
            timechange.innerText = Math.round((audio.currentTime / 60)*100)/100
        }
        //xu ly khi tua song
        progress.onchange = (event)=>{
            audio.currentTime =(audio.duration * event.target.value)/100
            // console.log((audio.duration * event.target.value)/100)
        }

        // xu ly tbn next
        next.onclick = (e)=>{
            if(_this.isRandom){
                _this.loadRandom()
            }
            else{
                _this.currentIndex ++
                if(_this.currentIndex >= _this.songs.length){
                    _this.currentIndex = 0;
                }
                _this.loadFirstMusic()
            }
            audio.play()
            _this.render()
            // keo thanh scroll theo active 
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'nearest'
            })
        }
        //nut prev
        prev.onclick = (e)=>{
            if(_this.isRandom){
                _this.loadRandom()
            }
            else{
                _this.currentIndex --
                if(_this.currentIndex < 0){
                _this.currentIndex = _this.songs.length -1;
                }
                _this.loadFirstMusic()
            }
            audio.play()
            _this.render()
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'nearest'
            })
        }
        //xu ly random
        random.onclick = function(e){
            if(!_this.isRandom){
                random.classList.add('active')
                _this.isRandom = true
                _this.setConfig('isRandom',_this.isRandom)
            }
            else{
                random.classList.remove('active')
                _this.isRandom = false
                _this.setConfig('isRandom',_this.isRandom)
            }
        }
        //xu ly khi audio on end
        audio.onended = function(){
            // cach 1
            // if(_this.isRandom){
            //     _this.loadRandom()
            // }
            // else{
            //     _this.currentIndex ++
            //     if(_this.currentIndex >= _this.songs.length){
            //         _this.currentIndex = 0;
            //     }
            //     _this.loadFirstMusic()
            // }
            // audio.play()

            // cach 2
            if(_this.isRepeat){
                audio.play()
            }
            else{
                next.click() //giong nhu btn nex tu kick hoat
            }

        }
        //xu ly btn repeat
        repeat.onclick = ()=>{
            _this.isRepeat = !_this.isRepeat
            repeat.classList.toggle('active',_this.isRepeat)
            _this.setConfig('isRepeat',_this.isRepeat)
        }
        //xu ly khi click vao playlist
        playlist.onclick = function(e){
            var songNode = e.target.closest('.song:not(.active)') //Lay tu phan tu con ra cha xem cai nao co class song thi lay ra
            if(songNode || e.target.closest('.option')){
                //xu ly songNode
                if(songNode){
                    _this.currentIndex = Number(songNode.getAttribute('data-index'))
                    _this.loadFirstMusic()
                    _this.render()
                    audio.play()
                }
                //xu ly option
                if(e.target.closest('.option')){}
            }
        }
    },
    loadFirstMusic:function(){
        header.innerText = this.currentSong.name
        cdThump.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        // console.log(audio);
        // this.currentTotalTime = audio.duration
    },
    loadRandom:function(){
        var nextRandom;
        do{
            nextRandom = Math.floor(Math.random() * this.songs.length)
        }
        while(nextRandom === this.currentIndex)
        this.currentIndex = nextRandom
        this.loadFirstMusic()
    },
    loadRepeat: function(){

    },
    start: function(){
        //Load config
        this.loadConfig()
        //dinh nghia cac thuoc tinh cho Object. get currentSong
        this.defaultProperties()
        // console.log([audio])
        //xu ly event
        this.handleEvent()
        //load bai hat dau tien
        this.loadFirstMusic()
        //render bai hat
        this.render()
        //hien thi btn
        repeat.classList.toggle('active',this.isRepeat)
        random.classList.toggle('active',this.isRandom)
    }
}
app.start()