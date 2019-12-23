import {
    HTTP
} from '../util/http-p.js'

class ArticleModel extends HTTP {
    article(page_no){
        return this.request({
            url: 'article/list',
            method: 'POST',
            data: {
              page_no
            }
        })
    }

    sendListen(data) {
        return this.request({
            url: 'article',
            method: 'POST',
            data: data
        })
    }
}


export {
    ArticleModel
}