import {
    HTTP
} from '../util/http-p.js'

class LikeModel extends HTTP {
    like(article_id){
        return this.request({
            url: 'favor/like',
            method: 'POST',
            data: {
                article_id
            }
        })
    }

    dislike(article_id){
        return this.request({
            url: 'favor/dislike',
            method: 'POST',
            data: {
                article_id
            }
        })
    }

    collect(article_id){
        return this.request({
            url: 'favor/collect',
            method: 'POST',
            data: {
                article_id
            }
        })
    }

    list(page_no){
        return this.request({
            url: 'favor/list',
            method: 'POST',
            data: {
                page_no
            }
        })
    }
}

export {
    LikeModel
}