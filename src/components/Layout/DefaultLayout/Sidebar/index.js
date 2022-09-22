import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return ( <>
        <h2 className={cx('wrapper')}>Sidebar</h2>
    </> );
}

export default Sidebar;