import { Avatar, Rate } from 'antd'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom'

import linkedInSVG from '@svgs/in.svg'
import facebookSVG from '@svgs/fb.svg'
import instagramSVG from '@svgs/insta.svg'
import effectPNG from '@assets/imgs/drop_effect.png';
import foldClothPNG from '@assets/imgs/foldclothXL.png';

const Home = () => {
   return (

      <><div className={'flex flex-row flex-wrap md:flex-nowrap justify-between items-center md:items-start md:mt-10 animate-fadeOut'}>
         <div className={'my-4 md:w-[458px] '}>
            <h1 className={'text-[64px] leading-[71px] md:w-[458px] font-black'}><span className={'text-secondary-color'}>Affordable</span> Dry Cleaning for Everyone</h1>
            <p className={'text-[18px] leading-[132.2%] my-2 font-normal'}>At Twice As Clean, we provide top-notch dry cleaning services to help you keep your clothes looking their best.</p>
            <Link to={'/subscribe'} className={'block bg-secondary-color rounded-2xl h-[64px] my-4 py-5 text-center hover:bg-opacity-80'}>
               <span className={'text-white text-[18px] leading-[26px] font-bold'}>Subscribe</span>
            </Link>
            <Link to={'/schedule'} className={'block border border-secondary-color rounded-2xl h-[64px] my-4 py-4 text-center hover:bg-opacity-80'}>
               <span className={'text-secondary-color text-[18px] leading-[26px] font-bold'}>Schedule Pickup Today</span>
            </Link>
         </div>
         {/*  */}
         <div className={'md:flex'}>
            <div className={'relative'}>
               {/* TESTIMONY */}
               <div className={'absolute bg-[#EAF7FF] bg-opacity-90 py-4 px-5 max-h-[140px] w-[252px] rounded-2xl rounded-br-none overflow-hidden'}>
                  {/* TESTIMONY_USER_PROFILE */}
                  <div className={'flex'}>
                     <Avatar size={'large'} />
                     <div className={'mx-1 my-0'}>
                        <div><Rate value={4} disabled /></div>
                        <strong className={'text-xs font-medium'}>Timothy Exodus</strong>
                     </div>
                  </div>
                  {/* TESTOMONY_COMMENT */}
                  <p className='overflow-hidden text-ellipsis text-[13px] my-1 font-normal'>I used their service and it was really good, it was fast and cheaper.</p>
               </div>
               <img src={foldClothPNG} alt={'foldcloth'} />
               <img src={effectPNG} alt={'dropeffect'} className='fixed z-50 bottom-0 right-0 h-[300px] md:h-[550px]' />
            </div>
         </div>
      </div>
         <ul className={'flex justify-between space-x-7 w-14 mb-6'}>
            <li><a href='https://facebook.com/@'><ReactSVG src={facebookSVG} /></a></li>
            <li><a href='https://instagram.com/@'><ReactSVG src={instagramSVG} /></a></li>
            <li><a href='httsp://linkedIn.com/@'><ReactSVG src={linkedInSVG} /></a></li>
         </ul></>
   )
}

export default Home