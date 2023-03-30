import { Link } from "react-router-dom"

const Subscribe = () => {
   return (
      <div className="md:w-9/12 m-auto my-11">
         <h1 className={'text-center text-5xl leading-[53.04px] font-black'}>Select a package suites your needs</h1>
         <div className={'flex flex-row flex-wrap justify-start my-6'}>
            <div className={'flex-auto md:w-5/12 my-2 border rounded-3xl p-3 md:border-none'}>
               <h3 className={'text-secondary-color text-xl font-black'}>Package 1</h3>
               <strong className={'text-[32px] font-black'}>N15,000</strong>
               <p className={'text-lg text-primary-color font-normal leading-[132.2%]'}>At Twice As Clean, we provide top-notch dry cleaning</p>
               <Link to={'/subscribe/:type'} className={'block my-2 rounded-2xl text-base p-3 bg-secondary-color text-white text-center font-bold w-full '}>Subscribe</Link>
            </div>
            <div className={'flex-auto md:w-5/12 my-2 border rounded-3xl p-3 md:border-none'}>
               <h3 className={'text-secondary-color text-xl font-black'}>Package 2</h3>
               <strong className={'text-[32px] font-black'}>N15,000</strong>
               <p className={'text-lg text-primary-color font-normal leading-[132.2%]'}>At Twice As Clean, we provide top-notch dry cleaning</p>
               <Link to={'/subscribe/:type'} className={'block my-2 rounded-2xl text-base p-3 bg-secondary-color text-white text-center font-bold w-full '}>Subscribe</Link>
            </div>
            <div className={'flex-auto md:w-5/12 my-2 border rounded-3xl p-3 md:border-none'}>
               <h3 className={'text-secondary-color text-xl font-black'}>Package 3</h3>
               <strong className={'text-[32px] font-black'}>N15,000</strong>
               <p className={'text-lg text-primary-color font-normal leading-[132.2%]'}>At Twice As Clean, we provide top-notch dry cleaning</p>
               <Link to={'/subscribe/:type'} className={'block my-2 rounded-2xl text-base p-3 bg-secondary-color text-white text-center font-bold w-full '}>Subscribe</Link>
            </div>
            <div className={'flex-auto md:w-5/12 my-2 border rounded-3xl p-3 md:border-none'}>
               <h3 className={'text-secondary-color text-xl font-black'}>Package 4</h3>
               <strong className={'text-[32px] font-black'}>N15,000</strong>
               <p className={'text-lg text-primary-color font-normal leading-[132.2%]'}>At Twice As Clean, we provide top-notch dry cleaning</p>
               <Link to={'/subscribe/:type'} className={'block my-2 rounded-2xl text-base p-3 bg-secondary-color text-white text-center font-bold w-full '}>Subscribe</Link>
            </div>
         </div>
      </div>
   )
}

export default Subscribe