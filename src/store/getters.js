export default {
    playBtnClass(state){
        if(state.playState==true){
            return 'iconfont icon-pause'
        }else {
            return 'iconfont icon-play'
        }
    },
    playState (state) {
        return state.playState;
    },
    currentTime(state){
        if (state.musicList.length==0){
            return 0
        }else {
            return state.currentTime
        }
    },
    duration(state){
        if (state.musicList.length==0){
            return 0
        }else {
            return state.duration
        }
    },
    songImg(state){
        if (state.musicList.length==0){
            return require('../assets/img/logo-heart.png')
        }else {
            if (!state.musicList[state.musicPlace].img){
                return require('../assets/img/logo-heart.png')
            }else {
                return  state.musicList[state.musicPlace].img
            }
        }
    },
    songInfo(state){
        if (state.musicList.length==0){
            return {name:'luolol',singer:'懂你的音乐播放器'}
        }else {
            return {name:state.musicList[state.musicPlace].name,singer:state.musicList[state.musicPlace].singer}
        }
    },
    getList(state){
        if (state.musicList.length==0){
            return false
        }else {
            return state.musicList
        }
    },
    getListState(state){
        return state.listState
    },
    getMusicPlace(state){
        return state.musicPlace;
    },
    hotListState(state){
        return state.hotListState;
    },
    isLoadingShow(state){
        return state.isLoadingShow
    },
    isPlayInfoShow(state){
        return state.isShowPlayInfo
    },
    nowSong(state){
        if(state.musicPlace == -1){
            return {songid:-1,name:'音乐播放器',singer:'luo'}
        }else {
            return state.musicList[state.musicPlace]
        }
    },
    // currentTime(state){
    //     return state.currentTime
    // },
    duration(state){
        return state.duration
    },
    getUser (state) {
        if (state.user.tel !== 'empty') {
            if (state.user.name === 'empty') {
                state.user.name = state.user.tel
            }
            return state.user
        } else {
            return false
        }
    }
}