<template>
    <div class="overhide">
        <swiper :list="arr" auto style="width:100%; margin:0 auto" :aspect-ratio="130/320"></swiper>

    </div>
</template>
<script>
    import swiper from '../../node_modules/vux/src/components/swiper/swiper.vue'
    export default {
        name: 'slider',
        data() {
            return {
                arr:[],
                swiperOption: {
                    direction: 'vertical',
                    autoplay: 3000,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }
        },
        components:{
            swiper
        },
        mounted() {
            let url ='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1523354634318'
            this.$http.jsonp(url,{jsonp:'jsonpCallback'}).then(res =>{
                let slider = res.body.data.slider
                if (slider && slider.length > 0) {
                    this.arr = []
                    let l = slider.length
                    for (let i = 0; i < l; i++) {
                        this.arr.push({
                            url: slider[i].linkUrl,
                            img: slider[i].picUrl,
                            title: ''
                        })
                    }
                }
            })
        },
        methods: {
        }
    }
</script>
<style scoped>
</style>