import  * as types from './types';
import Vue from 'vue';

export default {
    [types.NEXTSONG](state){
        if (state.musicPlace + 1 < state.musicList.length) {
            ++state.musicPlace
        }
        state.dom.src=state.musicUrl+state.musicList[state.musicPlace].songmid+state.musicUrlPa
    },
    [types.SENDAUDIO](state,obj){
        state.dom = obj;
    },
    [types.SENDMUSIC](state,obj){
        state.playState=true;
        state.musicList.push(obj);
        state.musicPlace=state.musicList.length-1;
        state.dom.src = state.musicUrl + state.musicList[state.musicPlace].songmid + state.musicUrlPa;
    },
    [types.LOOPPLAYBACK](state){
        if (state.musicPlace>=state.musicList.length-1){
            state.musicPlace=0;
        }else {
            state.musicPlace++;
        }
        state.dom.src = state.musicUrl + state.musicList[state.musicPlace].songmid + state.musicUrlPa
    },
    [types.PREVSONG](state){
        if (state.musicPlace==0){
            state.musicPlace=state.musicList.length-1;
        }else {
            state.musicPlace--;
        }
        state.dom.src=state.musicUrl+state.musicList[state.musicPlace].songmid + state.musicUrlPa
    },
    [types.PAUSE](state){
        state.playState=false;
    },
    [types.PLAY](state){
        state.playState=true;
    },
    [types.CLOSELISTSTATE](state){
        state.listState=false;
    },
    [types.OPENLISTSTATE](state){
        state.listState=true;
    },
    [types.SELECTMUSIC](state,index){
        state.musicPlace=index;
        state.dom.src=state.musicUrl+state.musicList[state.musicPlace].songmid+state.musicUrlPa;
    },
    [types.DELMUSIC](state,index){
        index<=state.musicPlace?state.musicPlace--:false;
        state.musicList.splice(index,1);
        if(index==state.musicList.length&&index==state.musicPlace+1){
            if(index==0){
                state.playState=false;
                state.dom.src="";
            }else {
                state.dom.src=state.musicUrl+state.musicList[state.musicPlace].songmid+state.musicUrlPa;
            }
        }
    },
    [types.SHOWLOADING](state){
        state.isLoadingShow=true;
    },
    [types.HIDLOADING](state){
        state.isLoadingShow=false;
    },
    [types.SHOWPLAYINFO](state){
        state.isShowPlayInfo = true;
    },
    [types.HIDPLAYINFO](state){
        state.isShowPlayInfo = false;
    },
    [types.SETCURRENTTIME](state,time){
        state.dom.currentTime = time;
    },
    ISLOGIN (state, b) {
        state.isLogin = b;
    },
    changeUser (state, obj) {
        for (var k in obj) {
            if (state.user[k]) {
                state.user[k] = obj[k]
            }
        }
    },
    changeLikeSongs (state) {
        var params = `?tel=${state.user.tel}`
        Vue.http.get(state.baseUrl + '/likeSongs' + params).then((res) => {
            if (res.body.code === 0) {
                state.likeSongs = res.body.data
            }
        })
    }
}
