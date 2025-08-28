import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import Joblistings from '../components/JobListings';
import ViewAllJobs from '../components/ViewAllJobs';

const HomePage = () => {
  return (
    <>
        <Hero/>
        <HomeCards/>
        <Joblistings isHome={true}/>
        <ViewAllJobs/>
    </>
  )
}

export default HomePage