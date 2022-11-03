import './Loading.scss'
import loadingImg from '~/assets/image/Dual Ball-1s-200px.gif'

function Loading() {
    return (<>
        <div className='loading__container'>
            <img className='loading__image' src={loadingImg} alt='loading' />
        </div>
    </>);
}

export default Loading;