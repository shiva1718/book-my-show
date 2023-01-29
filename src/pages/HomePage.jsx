import React, {useEffect, useState} from 'react';
import axios from "axios";

// Components
import EntertainmentCardSlider from '../components/entertainment/Entertainment'
import HeroCarousel from '../components/heroCarousel/HeroCarousel'
import PosterSlider from '../components/posterSlider/posterSlider'

// Layout Hoc
import DefaultLayoutHoc from '../layout/DefaultLayout'


const HomePage = () => {

    const [recommendedMovies, setRecommendedMovies] = useState([])
    const [premierMovies, setPremierMovies] = useState([])
    const [onlineStreamEvents, setOnlineStreamEvents] = useState([])

    useEffect(()=>{
        const requestPopularMovies = async () =>{
            const getPopularMovies = await axios.get("/movie/popular");
            setRecommendedMovies(getPopularMovies.data.results);
        };
        requestPopularMovies();
    },[]);

    useEffect(()=>{
        const requestTopratedMovies = async () =>{
            const getTopratedMovies = await axios.get("/movie/top_rated");
            setPremierMovies(getTopratedMovies.data.results);
        };
        requestTopratedMovies();
    },[]);

    useEffect(()=>{
        const requestUpcomingMovies = async () =>{
            const getUpcomingMovies = await axios.get("/movie/upcoming");
            setOnlineStreamEvents(getUpcomingMovies.data.results);
        };
        requestUpcomingMovies();
    },[]);

    return (
        <>
            <HeroCarousel/>
            <div className="container mx-auto px-4 md:px-12 my-8">
                <h1 className='text-2xl font-bold text-gray-800 sm:ml-3 ml-0 my-3'>The best of Entertainment</h1>
                <EntertainmentCardSlider/>
            </div>

            <div className='container mx-auto px-4 md:px-12 my-8 '>
                <PosterSlider
                    title="Recommended Movies"
                    subtitle="List of recommended movies"
                    posters={recommendedMovies}
                    isDark={false}/>
            </div>

            <div className='bg-premier-800 py-12'>
                <div className='container mx-auto px-4 md:px-12 my-8 flex flex-col gap-3'>
                    <div className='hidden md:flex'>
                        <img
                            src='https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png'
                            alt="Rupay" className='w-full h-full'/>
                    </div>
                    <div className='container mx-auto px-4 md:px-12 my-8 flex flex-col gap-3'>
                        <PosterSlider
                            title="Premiers"
                            subject="Brand new relases every Friday"
                            posters={premierMovies}
                            isDark={true}/>
                    </div>
                </div>
            </div>
            <div className='container mx-auto px-4 md:px-12 my-8 '>
                <PosterSlider
                    title="Online Streaming Events"
                    subject="{onlineStreamEvents}"
                    posters={onlineStreamEvents}
                    isDark={false}/>
            </div>
        </>
    );
}

export default DefaultLayoutHoc(HomePage);