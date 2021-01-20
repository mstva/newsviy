export type StackNavigatorParamlist = {
    FeedList: undefined;
};

export type NewsData = {
    publishedAt: string,
    urlToImage: string,
    source: { name: string }
    title: string
    author: string,
    description: string,
    url: string,
    content: string
}

export type newsDataProps = { newsData: NewsData }
