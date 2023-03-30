import {baseUrl} from './config.js'

export function topList(){
	
	let ids=['3','0','2','1']
	
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result=res.data.list
				result.length=4
				for(var i=0;i<ids.length;i++){
					result.id=ids[i]
				}
				reslove(result)
			},
			fail: () => {},
			complete: () => {}
		});
		
	})
	
}


export function list(listId){
	return	uni.request({
			url: `${baseUrl}/top/list?id=${listId}`,
			method: 'GET',
		});
}

// 获取歌曲详情 /song/detail
export function songDetail(songId){
	return	uni.request({
			url: `${baseUrl}/song/detail?ids=${songId}`,
			method: 'GET',
		});
}

// 获取相似音乐 /simi/song
export function songSimi(songId){
	return	uni.request({
			url: `${baseUrl}/simi/song?id=${songId}`,
			method: 'GET',
		});
}

// 歌曲评论 /comment/music
export function songComment(songId){
	return	uni.request({
			url: `${baseUrl}/comment/music?id=${songId}`,
			method: 'GET',
		});
}

// 获取歌词 /lyric
export function songLyric(songId){
	return	uni.request({
			url: `${baseUrl}/lyric?id=${songId}`,
			method: 'GET',
		});
}

// 获取音乐  /song/url
export function songUrl(songId){
	return	uni.request({
			url: `${baseUrl}/song/url?id=${songId}`,
			method: 'GET',
		});
}

// 热搜列表  /search/hot/detail
export function searchHot(){
	return	uni.request({
			url: `${baseUrl}/search/hot/detail`,
			method: 'GET',
		});
}

// 搜索关键词  /search?keywords=海阔天空
export function searchWord(word){
	return	uni.request({
			url: `${baseUrl}/search?keywords=${word}`,
			method: 'GET',
		});
}

// 搜索建议  /search/suggest?keywords=海阔天空&type=mobile
export function searchSuggest(word){
	return	uni.request({
			url: `${baseUrl}/search/suggest?keywords=${word}&type=mobile`,
			method: 'GET',
		});
}

// http://localhost:3000/search/suggest?keywords=海阔天空&type=mobile


