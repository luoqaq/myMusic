<template>
	<div class="lastPlay fullScreen">
        <p @click="back" class="back"><b class="iconfont icon-back"></b>返回</p>
        <h1>最近播放</h1>
		<!-- <group label-width="4.5em" label-margin-right="2em" label-align="right">
    		<cell title="我的收藏" :value="LoveMusic" is-link @click.native="to(1)">
            </cell>
    		<cell title="我的关注" :value="focusPeople" is-link @click.native="to(1)">
            </cell>
    		<cell title="最近播放" :value="lastPlay" is-link @click.native="to(1)">
            </cell>
	    </group> -->
	</div>
</template>
<script>
    import group from '../../../node_modules/vux/src/components/group'
    import cell from '../../../node_modules/vux/src/components/cell'
    export default {
    	name: 'mine',
    	data () {
    		return {
    			LoveMusic: 20,
    			focusPeople: 3,
    			lastPlay: 100
    		}
    	},
    	components: {
    		group, cell
    	},
    	methods: {
            back () {
                this.$router.push('/mine')
            }
    	},
    	mounted () {

    	}
    } 
</script>
<style>

</style>