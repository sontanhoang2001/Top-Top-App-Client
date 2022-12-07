import './shareSocialNetwork.css'
import { useEffect, useState } from "react";
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    WhatsappShareButton,
    LineShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    EmailShareButton,
    RedditShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    WhatsappIcon,
    TwitterIcon,
    LinkedinIcon,
    LineIcon,
    RedditIcon,
    TelegramIcon,
    EmailIcon,
    PinterestIcon,
    OKShareButton,
    ViberShareButton,
    ViberIcon
} from "react-share";

// mui
import { Button, IconButton, Typography, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { AppsRounded, LinkRounded } from '@mui/icons-material';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from "~/components/customizedSnackbars/snackbarSlice";
import { selectVideoId, closeDialog, dialogReportVideo, selectVideoUrl, selectUserVideo } from '~/components/customizedDialog/dialogSlice'

// provider
import { UserAuth } from '~/context/AuthContext';

// api
import videoApi from '~/api/video';

// helper
import { urlFromDriveUrlConvertDownload } from '~/shared/helper'

// image
import downArrowIcon from '~/assets/image/down-arrow.png';

const hashtag = "#toptopapp #toptopappcusc #cusc #ctu #mangxahoicantho";

function ShareSocialNetwork() {
    const { user } = UserAuth();
    const dispatch = useDispatch();
    const videoId = useSelector(selectVideoId);
    const videoUrl = useSelector(selectVideoUrl);
    const userVideo = useSelector(selectUserVideo);

    const hostName = "localhost:3000";
    const [shareUrl, setShareUrl] = useState();

    // const handleShare = () => {
    //     if (navigator.share) {
    //         navigator.share({
    //             // Title that occurs over
    //             // web share dialog
    //             title: 'GeeksForGeeks',
    //             // URL to share
    //             url: `${hostName}/${videoId}`
    //         }).then(() => {
    //             // console.log('Thanks for sharing!');
    //         }).catch(err => {

    //             // Handle errors, if occured
    //             console.log(
    //                 "Error while using Web share API:");
    //             console.log(err);
    //         });
    //     } else {
    //         // Alerts user if API not available 
    //         alert("Browser doesn't support this API !");
    //     }
    // }

    useEffect(() => {
        setShareUrl(`${hostName}/${videoId}`);
    }, [videoId])

    const handleCopy = () => {
        videoApi.buffShareVideo(videoId)
            .then(() => {
                navigator.clipboard.writeText(shareUrl);
                const payload = { enable: true, type: 'success', message: "Bạn đã sao chép video thành công!", duration: 8000 }
                dispatch(openSnackbar(payload));
            })
            .catch(error => console.log(error))
    }

    const handleOpenDialogReportVideo = () => {
        const payload = { videoId: videoId };
        dispatch(dialogReportVideo(payload));
    }

    const handleDownloadVideo = () => {
        window.open(urlFromDriveUrlConvertDownload(videoUrl));
    }

    return (<>
        <div className="share__container">
            <FacebookShareButton url={shareUrl} hashtag={hashtag}>
                <FacebookIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Facebook
                </Typography>
            </FacebookShareButton>
        </div>
        <div className="share__container">
            <TwitterShareButton url={shareUrl} hashtag={hashtag}>
                <TwitterIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Twitter
                </Typography>
            </TwitterShareButton>
        </div>
        {/* <div className="share__container">
            <FacebookMessengerShareButton appId="" redirectUri={shareUrl}>
                <FacebookMessengerIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Messenger
                </Typography>
            </FacebookMessengerShareButton>
        </div>

        <div className="share__container">
            <WhatsappShareButton separator={`${shareUrl} \nGửi từ TopTop App.`}>
                <WhatsappIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    WhatsApp
                </Typography>
            </WhatsappShareButton>
        </div>

       

        <div className="share__container">
            <LinkedinShareButton title={shareUrl}>
                <LinkedinIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Linkedin
                </Typography>
            </LinkedinShareButton>
        </div>

        <div className="share__container">
            <RedditShareButton title={shareUrl}>
                <RedditIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Reddit
                </Typography>
            </RedditShareButton>
        </div>

        <div className="share__container">
            <TelegramShareButton title={shareUrl}>
                <TelegramIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Telegram
                </Typography>
            </TelegramShareButton>
        </div> */}

        <div className="share__container">
            <EmailShareButton body={`${shareUrl} \nGửi từ TopTop App.`}>
                <EmailIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Email
                </Typography>
            </EmailShareButton>
        </div>

        {/* <div className="share__container">
            <LineShareButton title={shareUrl}>
                <LineIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Line
                </Typography>
            </LineShareButton>
        </div>

        <div className="share__container">
            <ViberShareButton separator={`${shareUrl} \nGửi từ TopTop App.`}>
                <ViberIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Viber
                </Typography>
            </ViberShareButton>
        </div>

        <div className="share__container">
            <PinterestShareButton description={shareUrl}>
                <PinterestIcon size={40} round={true} />
                <Typography variant="caption" display="block" gutterBottom>
                    Pinterest
                </Typography>
            </PinterestShareButton>
        </div> */}

        <div className="share__container">
            <button className='react-share__ShareButton fixShareButton' onClick={handleCopy} >
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FE2C55"></path><path d="M11.3028 15.2151C10.4934 16.0245 9.30444 16.016 8.6442 15.3557C7.98397 14.6955 7.97544 13.5065 8.78485 12.6971C9.06049 12.4215 9.06049 11.9745 8.78485 11.6989C8.5092 11.4232 8.06229 11.4232 7.78665 11.6989C6.49952 12.9861 6.36369 15.0716 7.646 16.354C8.92832 17.6363 11.0138 17.5005 12.301 16.2133L13.3248 15.1895C14.4068 14.1075 14.6713 12.4803 13.9787 11.2183C13.7911 10.8765 13.3621 10.7515 13.0203 10.9391C12.6786 11.1267 12.5536 11.5557 12.7412 11.8975C13.1094 12.5685 12.9986 13.5192 12.3266 14.1913L11.3028 15.2151ZM12.6972 8.7849C13.5066 7.97548 14.6956 7.984 15.3558 8.64425C16.016 9.30451 16.0246 10.4935 15.2152 11.3029C14.9395 11.5785 14.9395 12.0255 15.2152 12.3011C15.4908 12.5768 15.9377 12.5768 16.2134 12.3011C17.5005 11.0139 17.6363 8.92838 16.354 7.64603C15.0717 6.36368 12.9862 6.49951 11.699 7.78668L10.6752 8.8105C9.59325 9.89253 9.3287 11.5197 10.0213 12.7817C10.2089 13.1235 10.6379 13.2485 10.9797 13.0609C11.3214 12.8733 11.4464 12.4442 11.2588 12.1025C10.8906 11.4315 11.0014 10.4808 11.6734 9.80873L12.6972 8.7849ZM13.0336 12.6277C13.0186 12.3531 12.9459 12.0887 12.8178 11.8554C12.7737 11.7749 12.7493 11.6889 12.743 11.6029C12.7493 11.6889 12.7736 11.7749 12.8178 11.8554C12.9459 12.0888 13.0186 12.3531 13.0336 12.6277ZM13.2629 15.1276L12.2391 16.1514C10.9813 17.4093 8.95136 17.5356 7.70785 16.2921C7.11888 15.7031 6.83721 14.9377 6.8375 14.1615C6.8372 14.9377 7.11887 15.7031 7.70785 16.2921C8.95136 17.5357 10.9813 17.4093 12.2391 16.1515L13.2629 15.1277C13.8201 14.5704 14.1544 13.8662 14.2473 13.1452C14.1544 13.8661 13.8201 14.5704 13.2629 15.1276ZM8.90341 12.2276C8.89633 12.3759 8.8362 12.522 8.723 12.6352C8.28443 13.0738 8.07511 13.623 8.07481 14.147C8.07512 13.623 8.28444 13.0739 8.723 12.6353C8.83621 12.5221 8.89635 12.3759 8.90341 12.2276ZM12.6354 8.72306C13.4748 7.88361 14.7193 7.88401 15.4176 8.58241C15.6813 8.84604 15.8454 9.18748 15.9025 9.55557C15.8454 9.18746 15.6813 8.846 15.4176 8.58236C14.7193 7.88396 13.4748 7.88356 12.6354 8.72301L11.6116 9.74684C11.1715 10.1869 10.9613 10.7444 10.9635 11.2737C10.9613 10.7445 11.1715 10.187 11.6116 9.74689L12.6354 8.72306ZM11.2573 12.4817C11.244 12.6856 11.13 12.8786 10.9376 12.9842C10.6382 13.1485 10.2623 13.039 10.098 12.7396C9.88489 12.3514 9.76492 11.927 9.73407 11.4947C9.76493 11.9269 9.8849 12.3513 10.098 12.7396C10.2623 13.039 10.6382 13.1485 10.9376 12.9842C11.13 12.8786 11.244 12.6856 11.2573 12.4817ZM15.1103 11.9351C15.1348 12.0466 15.1903 12.1526 15.277 12.2393C15.5185 12.4808 15.91 12.4808 16.1515 12.2393C16.7 11.6908 17.0333 10.9955 17.1317 10.2827C17.0333 10.9955 16.6999 11.6908 16.1515 12.2392C15.91 12.4807 15.5185 12.4807 15.277 12.2392C15.1903 12.1526 15.1348 12.0466 15.1103 11.9351Z" fill="white"></path></svg>
                <Typography variant="caption" display="block" gutterBottom>
                    Sao chép
                </Typography>
            </button>
        </div>

        {/* <div className="share__container">
            <button className='react-share__ShareButton fixShareButton' onClick={handleShare}>
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23 46C35.7025 46 46 35.7025 46 23C46 10.2975 35.7025 0 23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46Z" fill="#161823" fill-opacity="0.06"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M24.952 13.8561L34.1644 30C34.9806 31.4297 33.9602 33.2176 32.3283 33.2176H13.9036C12.2717 33.2176 11.2513 31.4297 12.0675 30L21.2799 13.8561C22.0961 12.4259 24.1358 12.4259 24.952 13.8561Z" stroke="#161823" stroke-width="1.5"></path><path d="M23.1334 20.2175V25.4897" stroke="#161823" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M23.1161 29.5401C22.6415 29.5401 22.2567 29.1514 22.2567 28.6712C22.2567 28.191 22.6415 27.8022 23.1161 27.8022C23.5902 27.8022 23.975 28.191 23.975 28.6712C23.975 29.1514 23.5902 29.5401 23.1161 29.5401Z" fill="#161823"></path></svg>
                <Typography variant="caption" display="block" gutterBottom>
                    Thêm
                </Typography>
            </button>
        </div> */}

        {user.id != userVideo.id ? (
            <div className="share__container">
                <button className='react-share__ShareButton fixShareButton' onClick={handleOpenDialogReportVideo}>
                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M23 46C35.7025 46 46 35.7025 46 23C46 10.2975 35.7025 0 23 0C10.2975 0 0 10.2975 0 23C0 35.7025 10.2975 46 23 46Z" fill="#161823" fill-opacity="0.06"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M24.952 13.8561L34.1644 30C34.9806 31.4297 33.9602 33.2176 32.3283 33.2176H13.9036C12.2717 33.2176 11.2513 31.4297 12.0675 30L21.2799 13.8561C22.0961 12.4259 24.1358 12.4259 24.952 13.8561Z" stroke="#161823" stroke-width="1.5"></path><path d="M23.1334 20.2175V25.4897" stroke="#161823" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M23.1161 29.5401C22.6415 29.5401 22.2567 29.1514 22.2567 28.6712C22.2567 28.191 22.6415 27.8022 23.1161 27.8022C23.5902 27.8022 23.975 28.191 23.975 28.6712C23.975 29.1514 23.5902 29.5401 23.1161 29.5401Z" fill="#161823"></path></svg>
                    <Typography variant="caption" display="block" gutterBottom>
                        Báo cáo
                    </Typography>
                </button>
            </div>
        ) : (<></>)}

        <div className="share__container">
            <button className='react-share__ShareButton fixShareButton' onClick={handleDownloadVideo}>
                <img src={downArrowIcon} width='43px' height='43px' />
                <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '2px' }}>
                    Tải video
                </Typography>
            </button>
        </div>
    </>);
}

export default ShareSocialNetwork;