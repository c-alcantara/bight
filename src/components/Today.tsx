import axios, { AxiosResponse } from 'axios';
const Today = async (): Promise<any> => {
const today: Date = new Date();
const formattedDate: string = today.toISOString().split('T')[0];
const queryString: string = `${formattedDate}`;
const url = `https://newsapi.org/v2/top-headlines?country=us&from=${queryString}&sortBy=popularity&apiKey=725fd4f9f8124008b8fc5400631717e0`;
    try {
        const response: AxiosResponse<any> = await axios.get(url);
        const descriptions: string = processNews(response.data);
        alert(descriptions);
        return descriptions;
      
    } catch (error) { alert("NEWS ERROR!!! 😡"); throw error; }
};

const processNews = (data: any): string => {
    const descriptions: string[] = data.articles.map((article: any) => article.description);
    const primaryNews: string[] = descriptions.slice(0, 5);
    const result: string = primaryNews.join('\n');
    return result
};

export default Today;



export const newsKeywords: string[] = [
    "News", "Current events", "Today's headlines", "Breaking news", "Latest news",
    "What's happening", "Updates", "Recent events", "Top stories", "News roundup"
];


