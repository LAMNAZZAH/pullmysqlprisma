import Image from 'next/image';
import { useContext } from 'react';
import { Link } from 'tabler-icons-react';
import { authContext } from '../../contexts/auth';

import styles from '../../styles/profile.module.scss';

const profile = () => {

    const { user } = useContext(authContext);
    
  return (
    <div className={styles.profileContainer}>
        <div className={styles.leftBlockContainer}>
            <section className={styles.mainSection}>
                <div className={styles.ImagesContainer}>
                <div className={styles.backgroundImageContainer}>
                    <Image  layout='fill' src='/lmz-01.jpg'/>
                    <div className={styles.profileImageContainer}>
                    <Image width={100} height={100} src='/profile-pic.png'/>
                </div>
                </div>
                
                </div>
            </section>
        </div>
        <div className={styles.rightBlockContainer}>
            <section className={styles.announcementsSection}>
                <Image layout='fill' src='/announcement.png' />
            </section>
        </div>
    </div>
  )
}

/*export function getServerSideProps {
    
}*/

export default profile