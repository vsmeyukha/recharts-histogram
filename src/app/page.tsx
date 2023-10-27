'use client'
import { useEffect, useState, ReactElement } from 'react';

import Histogram from '@/components/histogram/Histogram';
import Dropdown from '@/components/dropdown/Dropdown';

export type Period = 'year' | 'half_year' | 'month';

type GraphData = {
  [key in Period]?: Record<string, number | null>;
}

type InitialData = [{
  nickname: string,
  finance?: {
    total: {
      sum: number,
      donators_count: number,
      regular_donators_count: number
    },
    periods?: [
      {
        "earnings": {
          "year_sum": number,
          "six_month_sum": number,
          "last_month_sum": number
        },
        graph?: GraphData
      }
    ];
  },
  gift_settings: {
    small_gift: string | null,
    medium_gift: string | null,
    big_gift: string | null
  },
  gift_stats: {
    small_gift_count: number,
    small_gift_sum: number,
    small_medium_count: number,
    small_medium_sum: number,
    small_big_count: number,
    small_big_sum: number
  }
}];

type DataEntry = {
  [key: string]: string | number | null;
};

export type DataArray = Array<DataEntry>;

type DataState = {
  year: DataArray;
  half_year: DataArray;
  month: DataArray;
};

async function getData() {
  const response = await fetch('https://64786558362560649a2dafb1.mockapi.io/test-endpoint');
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const data: InitialData = await response.json();
  return data;
}

const extractData = (data: InitialData, period: Period, tick: string = 'month'): DataArray => {
  if (!data.length) {
    return [];
  }

  const finance = data[0]?.finance;
  const periods = finance?.periods;
  const graphData = periods?.[0]?.graph?.[period];

  if (!finance) {
    return [];
  }

  if (!periods) {
    return [];
  }

  if (!graphData) {
    return [];
  }

  return Object.entries(graphData).map(([tickValue, value]) => ({ [tick]: tickValue, value }));
};

const Home: React.FC = (): ReactElement => {
  const [data, setData] = useState<DataState | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        const yearData: DataArray = extractData(result, 'year');
        const halfYearData: DataArray = extractData(result, 'half_year');
        const monthData: DataArray = extractData(result, 'month', 'day');
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

  const [period, setPeriod] = useState<Period>('year');

  const currentData: DataArray = data?.[period] || [];

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