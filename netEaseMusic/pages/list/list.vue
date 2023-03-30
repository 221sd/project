<template>
	<view class="list">
		<view class="fixbg" :style="{ backgroundImage:'url('+playlist.coverImgUrl+')' }"></view>
		<musichead title="歌单" :icon="true" color="white"/>
		<view class="container" v-show="! isLoading">
			<scroll-view scroll-y="true" >
				<view class="list-head">
					<view class="list-head-img">
						<image :src="playlist.coverImgUrl" mode=""></image>
						<text class="iconfont icon-yousanjiao">{{playlist.playCount | formatCount}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playlist.name}}</view>
						<view class="">
							<image :src="playlist.creator.avatarUrl" mode="">{{playlist.creator.nickname}}</image>
						</view>
						<view>
							{{playlist.description}}
						</view>
					</view>
				</view>
				<!-- 差异化，只能微信小程序中显示 -->
				<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="list-share">
						<text class="iconfont icon-fenxiang">
						</text>
						分享给微信好友
					</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang1"></text>
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>
					<view class="list-music-item" v-for="(item,index) in playlist.tracks " :key="index" @tap="handleToDetail(item.id)">
						<view class="list-music-top">{{index + 1}}</view>
						<view class="list-music-song">
							<view>
								{{item.name}}
							</view>
							<view>
								<image src="../../static/6w.jpg" mode=""></image>
								{{item.ar[0].name}}-{{item.name}}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import musichead from '../../components/musichead/musichead.vue'
	import {list} from '../../common/api.js'
	export default {
		data() {
			return {
				playlist:{
					coverImgUrl:'',
					creator:{
						avatarUrl:''
					}
				},
				isLoading:true
			}
		},
		components:{
			musichead
		},
		methods: {
			handleToDetail(id){
				uni.navigateTo({
					url:'/pages/detail/detail?id='+id
				})
			}
		},
		onLoad(options){
			// 加载中
			wx.showLoading({
			  title: '加载中',
			})
			
			
			list(options.id).then((res)=>{
				if(res[1].data.code == "200"){
					this.playlist= res[1].data.playlist
					this.$store.commit('INIT_TOPLISTIDS',res[1].data.playlist.trackIds)
					this.isLoading=false
					wx.hideLoading()
				}
			})
			
		}
	}
</script>

<style scoped>
	.list-head{
		display: flex;
		margin: 0 30rpx;
	}
	.list-head-img{
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 42rpx;
	}
	.list-head-img image{
		width: 100%;
		height: 100%;
	}
	.list-head-img text{
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		color: white;
		font-size: 26rpx;
	}
	.list-head-text{
		flex: 1;
		color: #f0f2f7;
	}
	.list-head-text view:nth-child(1){
		color: white;
		font-size: 34rpx;
	}
	.list-head-text view:nth-child(2){
		display: flex;
		margin: 0 20rpx;
		font-size: 24rpx;
		align-items: center;
		margin-left: 0rpx;
	}
	.list-head-text view:nth-child(2) image{
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		margin-right: 14rpx;
	}
	.list-head-text view:nth-child(3){
		line-height: 34rpx;
		font-size: 22rpx;
	}
	.list-share{
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 37rpx;
		text-align: center;
		line-height:74rpx;
		font-size: 28rpx;
		color: white;
	}
	.list-share text{
		margin-right: 16rpx;
	}
	.list-music{
		background: white;
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
	}
	.list-music-head{
		height: 50rpx;
		margin: 30rpx 0 70rpx 22rpx;
	}
	.list-music text:nth-child(1){
		height: 50rpx;
		font-size: 50rpx;
	}
	.list-music text:nth-child(2){
		font-size: 30rpx;
		margin: 0 10rpx 0 26rpx;
	}
	.list-music text:nth-child(3){
		font-size: 26rpx;
		color: #b2b2b2;
	}
	.list-music-item{
		display: flex;
		margin: 0 32rpx 66rpx 46rpx;
		align-items: center;
		color: #959595;
	}
	.list-music-top{
		width: 58rpx;
		font-size: 30rpx;
		line-height: 30rpx;
	}
	.list-music-song{
		flex: 1;
	}
	.list-music-song view:nth-child(1){
		font-size: 28rpx;
		color: black;
		width: 70vw;
		/* 不换行 */
		white-space: nowrap;
		overflow: hidden;
		/* 名字太长加上省略号 */
		text-overflow: ellipsis;
	}
	.list-music-song view:nth-child(2){
		display: flex;
		font-size: 20rpx;
		align-items: center;
		width: 70vw;
			/* 不换行 */
			white-space: nowrap;
			overflow: hidden;
			/* 名字太长加上省略号 */
			text-overflow: ellipsis;
	}
	.list-music-song view:nth-child(2) image{
		width: 32rpx;
		height: 20rpx;
		margin-right: 10rpx;
		/* 空间变窄时，不被压缩 */
		flex-shrink: 0;
	}
	.list-music-song text{
		font-size: 50rpx;
		color: #c7c7c7;
	}

</style>
