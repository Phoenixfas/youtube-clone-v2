import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const YOUTUBE_API_KEY = 'AIzaSyDSjpO42J6lBkm_IckY0tO0KXyY26SvTts';

interface Video{
    id: string,
    title: string,
    channel: string,
    timestamp: string,
    image: {
        url: string
    },
    channelImage: {
        url: string
    }
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube.googleapis.com/youtube/v3',
        prepareHeaders(headers) {
            headers.set('Authorization', YOUTUBE_API_KEY);

            return headers;
        }
    }),
    endpoints(builder) {
        return{
            fetchVideos: builder.query<Video[], number|void>({
                query(){
                    return `/search?part=snippet&contentDetails&statistics&channelId=UCydlocDyvRtFmMffKytKqgQ&maxResults=24&type=video&key=${YOUTUBE_API_KEY}`
                }
            })
        }
    },
})

export const { useFetchVideosQuery } = apiSlice