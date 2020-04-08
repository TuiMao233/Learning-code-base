import Swiper from 'swiper';
import 'swiper/css/swiper.css';
export default function createSwiper() {
    setTimeout(() => {
        new Swiper('.swiper-container-msite-navi', {
            pagination: { // 如果需要分页器
                el: '.swiper-pagination'
            },
            // 如果需要滚动条
            scrollbar: {
                el: '.swiper-scrollbar'
            },
            // 当数据改变时初始化swiper
            observer: true,
            grabCursor: true,
        })
    }, 0);
}