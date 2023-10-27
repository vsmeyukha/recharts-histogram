'use client'

import { useEffect, useState } from 'react';

import Histogram from '@/components/histogram/Histogram';
import Dropdown from '@/components/dropdown/Dropdown';

type Period = 'year' | 'half_year' | 'month';

type DataState = {
  year: any[];
  half_year: any[];
  month: any[];
};

async function getData() {
  const response = await fetch('https://64786558362560649a2dafb1.mockapi.io/test-endpoint');
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const data = await response.json();
  return data;
}

const extractData = (data: any[], period: Period, tick: string = 'month') => {
  if (!data || !data[0]?.finance?.periods[0]?.graph?.[period]) {
    return [];
  } else {
    return Object.entries(data[0].finance.periods[0].graph[period]).map(([tickValue, value]) => ({ [tick]: tickValue, value }));
  }
};

const Home = () => {
  const [data, setData] = useState<DataState>({
    year: [],
    half_year: [],
    month: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        const yearData = extractData(result, 'year');
        const halfYearData = extractData(result, 'half_year');
        const monthData = extractData(result, 'month', 'day');
        setData({
          year: yearData,
          half_year: halfYearData,
          month: monthData
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const [period, setPeriod] = useState('year');

  const currentData = data?.[period];

  return (
    <main className='h-screen bg-white flex flex-col justify-center items-center'>
      <div className='flex flex-col items-center w-2/3'>
        <Dropdown period={period} setPeriod={setPeriod} />
        <Histogram data={currentData} period={period} />
      </div>
    </main>
  )
}

export default Home;