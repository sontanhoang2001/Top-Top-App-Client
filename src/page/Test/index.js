import HoverVideoPlayer from 'react-hover-video-player';
import VideoThumbnail from 'react-video-thumbnail'; // use npm published version

function Test() {
    return (
        <HoverVideoPlayer
            videoSrc="https://drive.google.com/uc?export=view&id=1vAkgnmr5locjRgM53ItyxuWfiH041jyv"
            pausedOverlay={
                <VideoThumbnail
                    videoUrl="https://drive.google.com/uc?export=view&id=1vAkgnmr5locjRgM53ItyxuWfiH041jyv"
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    width={120}
                    height={80}
                />
            }
            loadingOverlay={
                <div className="loading-overlay">
                    <div className="loading-spinner" />
                </div>
            }
        />
    );
}

export default Test;

{/* <img
src="https://drive.google.com/uc?export=view&id=1vAkgnmr5locjRgM53ItyxuWfiH041jyv"
alt=""
style={{
    // Make the image expand to cover the video's dimensions
    width: '100%',
    height: '100%',
    objectFit: 'cover',
}}
/> */}