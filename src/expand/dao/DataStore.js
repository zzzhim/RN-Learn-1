import { AsyncStorage } from 'react-native'
import Trending from 'GitHubTrending'

export const FLAG_STORAGE = { flag_popular: 'popular', flag_trending: 'trending' }
export default class DataStore {
    
    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback 
     */ 
    saveData(url, data, callback) {
        if(!data || !url) return
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }

    _wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        }
    }

    /**
     * 获取本地数据
     * @param url
     * @return { Promise } 
     */ 
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if(!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                        console.error(e)
                    }
                }else {
                    reject(e)
                    console.error(e)
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param url
     * @param flag
     * @return { Promise } 
     */ 
    fetchNetData(url, flag) {
        return new Promise((resolve, reject) => {
            if(flag !== FLAG_STORAGE.flag_trending) {
                fetch(url)
                    .then((res => {
                        if(res.ok) {
                            return res.json()
                        }
                        throw new Error('Network response was not ok')
                    }))
                    .then(res => {
                        // 获取到数据之后先保存到本地
                        this.saveData(url, res)
                        resolve(res)
                    })
                    .catch(err => reject(err))
            }else {
                new Trending().fetchTrending(url)
                    .then(items => {
                        if(!items) {
                            throw new Error('responseData is null')
                        }
                        this.saveData(url, items)
                        resolve(items)
                    })
                    .catch(err => reject(err))
            }
        })
    }

    /**
     * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
     * @param url
     * @param flag
     * @return { Promise } 
     */ 
    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then(wrapData => {
                    if(wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) { // 当本地数据存在并且本地数据没有过期的时候返回本地数据
                        resolve(wrapData)
                    }else { // 当本地数据过期的时候请求网络数据
                        this.fetchNetData(url, flag)
                            .then(data => {
                                resolve(this._wrapData(data))
                            })
                            .catch(err => reject(err))
                    }
                })
                .catch(error => { // 当本地数据不存在的时候请求网络数据
                    this.fetchNetData(url, flag)
                            .then(data => {
                                resolve(this._wrapData(data))
                            })
                            .catch(err => reject(err))
                })
        })
    }

    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return { boolean } true 不需要更新，false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date()
        const tagetDate = new Date()
        tagetDate.setTime(timestamp)
        if(currentDate.getMonth() !== tagetDate.getMonth()) return false
        if(currentDate.getDate() !== tagetDate.getDate()) return false
        if(currentDate.getHours() - tagetDate.getHours() > 4) return false // 有效期4个小时
        return true
    }
}