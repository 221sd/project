<template>
	<view class="search">
		<musichead title="歌单" :icon="true" :iconblack="true"/>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="search-search">
					<text class="iconfont icon-Magnifier"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @confirm="handleToSearch(searchWord)" @input="handleToSuggest"> 
					<text class="iconfont icon-guanbi" v-show="searchType != 1" @tap="handleToClose" ></text>
				</view>
				<block v-if="searchType == 1">
				<view class="search-history">
					<view class="search-history-head">
						<text>历史记录</text>
						<text class="iconfont icon-lajitong" @tap="handleToClear"></text>
					</view>
					<view class="search-history-list" >
						<view v-for="(item,index) in searchHistory" :key="index" @tap="handleToWord(item)" >{{item}}</view>
					</view>
				</view>
				
				<view class="search-hot">
						<view class="search-hot-head">
						热搜榜
						</view>
					<!-- 	<view class="search-hot-item">
							<view class="search-hot-top">1</view>
							<view class="search-hot-word">
								<view>
									少年
									<image src="../../static/6w.jpg" mode="aspectFit"></image>
								</view>
								<view>
									"少年"这个词实在是太美了
								</view>
							</view>
							<view class="search-hot-count">2985495849</view>
						</view> -->
						
						<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index" @tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{index +1}}</view>
							<view class="search-hot-word">
								<view>
									{{item.searchWord}}
									<image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view>
									{{item.content}}
								</view>
							</view>
							<view class="search-hot-count">{{item.score}}</view>
						</view>
						
				</view>
				</block>
				<block v-else-if="searchType == 2">
					<view class="search-result">
						<!-- <view class="search-result-item">
							<view class="search-result-word">
								<view>少年</view>
								<view>许巍-爱如少年</view>
							</view>
							<text class="iconfont icon-bofang_o"></text>
						</view> -->
						
						<view class="search-result-item" v-for="(item,index) in searchList" :key="index" @tap="handleToDetail(item.id)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.ar[0].name}}-{{item.al.name}}</view>
							</view>
							<text class="iconfont icon-bofang_o"></text>
						</view>
						
					</view>
				</block>
				<block v-else-if="searchType == 3">
					<view class="search-suggest">
						<view class="search-suggest-head">搜索“{{searchWord}}”</view>
						<!-- <view class="search-suggest-item">
							<text class="iconfont icon-Magnifier"></text>少年抖音
						</view> -->
						<view class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont icon-Magnifier"></text>{{item.keyword}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import '@/common/iconfont.css'
	import {searchHot,searchWord,searchSuggest} from '../../common/api.js'
	export default {
		data() {
			return {
				searchHot:[],
				searchWord:'',
				searchHistory:[],
				searchType:1,
				searchList:[],
				searchSuggest:[]
			}
		},
		onLoad() {
			searchHot().then((res)=>{
				if(res[1].data.code == '200'){
					this.searchHot=res[1].data.data
				}
			})
			uni.setStorage({
				key: 'asdsa',
				success:(res)=> {
					this.searchHistory=res.data
				}
			});
		},
		components:{
			musichead
		},
		methods: {
			handleToWord(word){
				this.searchWord =word
				this.handleToSearch(word)
			},
			handleToSearch(word){
				this.searchHistory=[...new Set(this.searchHistory)]
				if(this.searchHistory.length  > 10){
					this.searchHistory.length =10
				}
				uni.setStorage({
					key:'asdsa',
					data:this.searchHistory
				})
				this.getSearchList(word)
			},
			handleToClear(){
				uni.removeStorage({
					key: 'asdsa',
					success:  (res)=> {
						this.searchHistory=[]
					}
				});
			},
			getSearchList(word){
				searchWord(word).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchList = res[1].data.result.songs
						this.searchType=2
						
					}
				})
			},
			handleToClose(){
				this.searchWord = ''
				this.searchType =1
			},
			handleToDetail(songId){
				uni.navigateTo({
					url:'/pages/detail/detail?id='+songId
				})
			},
			handleToSuggest(ev){
				let value=ev.detail.value
				if(!value){
					this.searchType =1
					return
				}
				searchSuggest(value).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchSuggest=res[1].data.result.allMatch
						this.searchType=3
					}
				})
			}
		}
	}
</script>

<style scoped>
	.search-search{
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
	}
	.search-search text{
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}
	.search-search input{
		font-size: 28rpx;
		flex: 1;
	}
	
	.search-history{
		margin: 0 30rpx 50rpx 30rpx;
		font-size: 26rpx;
	}
	.search-history-head{
		display: flex;
		justify-content: space-between;
		margin-bottom: 36rpx;
	}
	.search-history-list{
		display: flex;
		flex-wrap: wrap;
	}
	.search-history-list view{
		padding: 16rpx 28rpx;
		border-radius: 40rpx;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		background: #f7f7f7;
	}
	
	.search-hot{
		margin: 0 30rpx;
		font-size: 26rpx; 
	}
	.search-hot-head{
		margin-bottom:36rpx;
	}
	.search-hot-item{
		display: flex;
		align-items: center;
		margin-bottom:58rpx;
	}
	.search-hot-top{
		color: #fb2222;
		width: 60rpx;
		margin-left: 8rpx;
	}
	.search-hot-word{
		flex: 1;
	}
	.search-hot-word view:nth-child(1){
		font-size: 30rpx;
		color: black;
	}
	.search-hot-word view:nth-child(2){
		font-size: 24rpx;
		color: #878787;
	}
	.search-hot-word image{
		width: 48rpx;
		height: 22rpx;
	}
	.search-hot-count{
		color: #878787;
	}
		
	.search-result{
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
	}
	.search-result-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 2rpx #e4e4e4 solid;
	}
	.search-result-word{
		
	}
	.search-result-word view:nth-child(1){
		font-size: 28rpx;
		color: #235790;
		margin-bottom: 12rpx;
	}
	.search-result-word view:nth-child(2){
		font-size: 22rpx;
		color: #898989;
	}
	.search-result-item text{
		font-size: 50rpx;
	}
	
	.search-suggest{
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
		font-size: 26rpx;
	}
	.search-suggest-head{
		color: #4574a5;
		margin-bottom: 74rpx
	}
	.search-suggest-item{
		color: #5d5d5d;
		margin-bottom: 74rpx
	}
	.search-suggest-item text{
		color:#bdbdbd;
		margin-right: 28rpx;
		position: relative;
		top: 2rpx;
	}
</style>
