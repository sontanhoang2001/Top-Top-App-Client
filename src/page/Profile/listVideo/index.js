import { useState } from "react";
import { ImageList, ImageListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import useResponsive from '~/hooks/useResponsive';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

import HoverVideoPlayer from 'react-hover-video-player';
import VideoThumbnail from 'react-video-thumbnail'; // use npm published version

// api
import videoApi from '~/api/video';
import { Link } from "react-router-dom";

// redux
import InfiniteScroll from "react-infinite-scroll-component";

const initialPageSize = 8;

function ListVideo({ index, userAlias, userId }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');

    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [hasMore, setHasMore] = useState(true);
    const [totalElements, setTotalElements] = useState();

    const [imageListCol, setImageListCol] = useState();
    useEffect(() => {
        if (smUp) {
            setImageListCol(4);
        } else {
            setImageListCol(3);
        }
    })

    const [videos, setVideos] = useState();
    // first load video
    useEffect(() => {
        switch (index) {
            case 0: {
                videoApi.findPublicVideoProfile(userId, pageNo, pageSize)
                    .then(res => {
                        setVideos(res.data.data);

                        setPageNo(res.data.pageNo);
                        setTotalElements(res.data.totalElements)
                        setIsLoaded(true);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoaded(false);
                    })
                break;
            }
            case 1: {
                videoApi.findPrivateVideoProfile(userId, pageNo, pageSize)
                    .then(res => {
                        setVideos(res.data.data);

                        setPageNo(res.data.pageNo);
                        setTotalElements(res.data.totalElements)
                        setIsLoaded(true);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                break;
            }
            case 2: {
                videoApi.findFavouriteVideo(userId, pageNo, pageSize)
                    .then(res => {
                        setVideos(res.data.data);

                        setPageNo(res.data.pageNo);
                        setTotalElements(res.data.totalElements)
                        setIsLoaded(true);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                break;
            }
        }
    }, [index])

    // fetch More Video
    const fetchMoreVideo = () => {
        if (videos.length >= totalElements) {
            setHasMore(false);
            return;
        }

        switch (index) {
            case 0: {
                videoApi.findPublicVideoProfile(userId, pageNo + 1, pageSize)
                    .then(res => {
                        setVideos([...videos, ...res.data.data]);

                        setPageNo(res.data.pageNo);
                        setTotalElements(res.data.totalElements)
                        setIsLoaded(true);
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoaded(false);
                    })
                break;
            }
            case 1: {
                videoApi.findPrivateVideoProfile(userId, pageNo + 1, pageSize)
                    .then(res => {
                        setVideos([...videos, ...res.data.data]);

                        setPageNo(res.data.pageNo);
                        setTotalElements(res.data.totalElements)
                        setIsLoaded(true);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                break;
            }
            case 2: {
                videoApi.findFavouriteVideo(userId, pageNo + 1, pageSize)
                    .then(res => {
                        setVideos([...videos, ...res.data.data]);

                        setPageNo(res.data.pageNo);
                        setTotalElements(res.data.totalElements)
                        setIsLoaded(true);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                break;
            }
            default:
        }
    }

    if (isLoaded)
        return (<>
            {videos && (
                <InfiniteScroll
                    dataLength={videos.length}
                    next={fetchMoreVideo}
                    hasMore={hasMore}
                    scrollableTarget='scrollableDiv'
                >
                    {videos.length == 0 ? (
                        <Typography variant="subtitle2">Hiện tại chưa có video trong mục này</Typography>
                    ) : (
                        <ImageList sx={{ width: '100%', minHeight: 350, height: '500px' }} cols={imageListCol} gap={10} component='span' id='scrollableDiv'>
                            {videos.map(({ id, url, view }, index) => (
                                <ImageListItem key={id} sx={{ cursor: 'pointer' }} component='div'>
                                    <Link to={`/@${userAlias}/video/${id}`}>
                                        <HoverVideoPlayer
                                            videoSrc={url}
                                            pausedOverlay={
                                                <VideoThumbnail
                                                    videoUrl={url}
                                                    height={80}
                                                />
                                            }
                                            loadingOverlay={
                                                <div className="loading-overlay">
                                                    <div className="loading-spinner" />
                                                </div>
                                            }
                                        />
                                    </Link>
                                    <div style={{ display: 'flex', position: 'absolute', bottom: '10px', left: '5px', color: '#fff' }}><PlayArrowOutlinedIcon /> {view}</div>

                                </ImageListItem>
                            ))}

                            {/* <Typography variant="h4" gutterBottom>
                Chưa có video nào
                </Typography> */}
                        </ImageList>
                    )}

                </InfiniteScroll>
            )}
        </>);
}

export default ListVideo;