import styles from '../../styles/PostList.module.css'
import next_test from '../../../public/next_test.png'
import Image from 'next/image'

export default function PostList(){
    return(
        <div className={styles.wrap}>
            <p className={styles.header}>📝All Posts (31)</p>
            <div className={styles.content}>
                <p>2023년 11월 19일 (일요일)</p>
                <p>Next.js 13.4는 어떤 기능이 추가되었을까?</p>
                <p>이전 버전의 Next와 비교하기</p>
                <Image src={next_test} className={styles.image} alt='preview' />
            </div>
        </div>
    )
}