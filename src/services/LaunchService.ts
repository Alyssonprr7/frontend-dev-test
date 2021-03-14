import httpUtil from '../util/httpUtil'


export interface Launch {
    id: string;
    name: string;
    image: string;
    date: string;
    success?: Boolean;
    presskit?: string;
    webcast?: string;
    article?:string;
    wikipedia?:string;
    details?: string;
  }
  
  export interface ApiListResponse<T> {
    items: T;
  }

export default class LaunchService {

    

    static formatLaunch(launch:any):Launch{
        return {
            id: launch.id,
            name: launch.name,
            image: launch.links.patch.small,
            date: launch.date_local,
            success: launch.cores.every(core => core.landing_success === true),
            presskit: launch.links.presskit,
            webcast: launch.links.webcast,
            article: launch.links.article,
            wikipedia: launch.links.wikipedia,
            details: launch.details
        }
    }

    static async listLaunches(): Promise<ApiListResponse<Launch[]>> {
        const uri = "https://api.spacexdata.com/v4/launches/past";
        const { data } = await httpUtil.executeGet(uri, null, null);
        return { items: data };
    }
}