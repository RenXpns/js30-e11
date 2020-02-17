// Get our Elements
    const player = document.querySelector(".player")
    const video = player.querySelector(".viewer")
    const progress = player.querySelector(".progress")
    const progressBar = player.querySelector(".progress__filled")
    const toggle = player.querySelector(".toggle")
    const skipButtons = player.querySelectorAll("[data-skip]")
    const ranges = player.querySelectorAll(".player__slider")

// Build Functions 
    function togglePlay(){
        const togglepp = video.paused ? 'play' : 'pause';
        video[togglepp]();
    }
    function updateButton(){
        const icon = this.paused ? '►': '▌▌'
        toggle.textContent = icon;
    }
    function skip(){
        // if(this.dataset.skip > 0){
        //     video.currentTime += parseFloat(this.dataset.skip)
        // } else{
        //     video.currentTime += parseFloat(this.dataset.skip)
        // }
        video.currentTime += parseFloat(this.dataset.skip)
        
    }
    function rangeSlide(){
        video[this.name] = this.value
        // if(this.name == "volume"){
        //     video.volume = parseFloat(this.value)
        // } else{
        //     video.playbackRate = parseFloat(this.value)
        // }
    }
    function progressMovement(){
        const percent = (video.currentTime/video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`
    }
    function scrub(e){
        const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration

        video.currentTime = scrubTime
    }
    
// Hookup eventlisteners
    toggle.addEventListener('click', togglePlay)
    video.addEventListener('play', updateButton)
    video.addEventListener('pause', updateButton)
    video.addEventListener('click', togglePlay)
    video.addEventListener('timeupdate', progressMovement)
    skipButtons.forEach(skipbtns => skipbtns.addEventListener("click", skip))
    ranges.forEach(rangeBtn => rangeBtn.addEventListener("change", rangeSlide))
    ranges.forEach(rangeBtn => rangeBtn.addEventListener("mousemove", rangeSlide))

    let mousedown = false;
    progress.addEventListener('click', scrub)
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e))

    progress.addEventListener('mousedown', () => mousedown = true)
    progress.addEventListener('mouseup', () => mousedown = false)

    // progress.addEventListener("change", progressMovement)
    // progress.addEventListener("mousemove", progressMovement)