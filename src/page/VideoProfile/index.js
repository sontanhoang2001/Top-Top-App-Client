import { useEffect, useState } from 'react';
import Video from '~/components/Layout/Video';

// redux
import { setVideoSetting } from "./videoProfileSlice";

// api
import videoApi from '~/api/video';
import { useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '~/page/Home/Home.module.scss';
import NavBar from '~/components/Layout/NavBarHeader'

import { urlFromDriveUrl } from '~/shared/helper';
import Loading from '~/components/Layout/Loading';
import { useDispatch } from 'react-redux';

// auth provider
import { UserAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function VideoProfile() {
    const { user } = UserAuth();
    const dispath = useDispatch();
    const { videoId } = useParams();
    const [videos, setVideo] = useState();
    const [muted, setMuted] = useState(true);

    const onEnableAudio = () => {
        setMuted(false);
    };

    const [isLoaded, setIsLoaded] = useState(false);

    // fetch first page video
    useEffect(() => {
        if (videoId) {
            videoApi.findVideoById(videoId)
                .then(res => {
                    setVideo([res.data]);

                    const payload = {
                        enableComment: res.data.enableComment,
                        professed: res.data.professed,
                    };
                    dispath(setVideoSetting(payload));
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoaded(false);
                })
        }
    }, [videoId])

    if (isLoaded) {
        return (
            <>
                <NavBar back />
                <div className={'video-scrollbar ' + cx('video__container')}>
                    {videos && videos.map((video, index) => (
                        <div key={index}>
                            <Video
                                index={index}
                                id={video.id}
                                avatarUser={video.user.avatar}
                                comments={video.comment}
                                likes={video.heart}
                                shares={video.share}
                                title={video.title}
                                channel={video.user.alias}
                                song={video.musicUrl}
                                url={urlFromDriveUrl(video.url)}
                                muted={muted}
                                onEnableAudio={onEnableAudio}
                                userVideo={video.user}
                                profileVideo={video.user.id == user.id ? true : false}
                                enableComment={video.enableComment}
                            />
                        </div>
                    ))}
                </div>
            </>
        );
    } else {
        return <Loading />
    }
}

export default VideoProfile;