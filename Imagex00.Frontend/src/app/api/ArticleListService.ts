import { ArticleBrief } from './../models/Article';
import { BaseService, NetworkResponse } from "./BaseService";

export class ArticleListService extends BaseService {
    constructor() {
        super("articles"); //设置这个服务的终结点，是articles，不需要带/。作用看下面。
    }

    public async getAllArticles() {
        const res: NetworkResponse = await this.fetch(); 
        // 对APIROOTURL（在webpack配置文件里通过DefinePlugin定义，这里是http://vicblogapi.azurewebsites.net）的articles终结点（构造函数里定义，看上面）发起get请求，
        // 也就是对 http://vicblogapi.azurewebsites.net/articles 发起get请求
        // 结果是一个NetworkResponse，它包含许多例如错误信息啊响应啊，可以直接把response作为结果返回
        // 本来需要进行错误处理（通过NetworkResponse的各个字段来做），但这里就省去了
        return res.response as ArticleBrief[];
    }
}