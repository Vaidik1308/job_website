import React, { InputHTMLAttributes, forwardRef, useState, useMemo } from 'react'
import { Input } from './ui/input';
import citiesList from '@/lib/cities-list'
interface LocationInputProps extends InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected : (location:string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>( function LocationInput({onLocationSelected, ...props},ref){

    const [locationSearchInput,setLocationSearchInput] = useState("")
    const [hasFocus,setHasFocus] = useState(true)

    const cities = useMemo(() => {
        if (!locationSearchInput.trim()) return [];
        const searchWords = locationSearchInput.split(" ")

        return citiesList.map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(city => city.toLowerCase().startsWith(searchWords[0].toLowerCase()) && searchWords.every(word => city.toLowerCase().includes(word.toLowerCase()))
        )
        .slice(0,5)
    },[locationSearchInput])



    return (
        <div className='relative'>
            <Input
                type='search'
                {...props}
                ref={ref}
                value={locationSearchInput}
                onChange={(e) => setLocationSearchInput(e.target.value)}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
            />
            {
                locationSearchInput.trim() && hasFocus && (
                    <div className='absolute bg-background shadow-xl border-x border-b rounded-b-lg w-full divide-y flex flex-col items-start p-1 z-20'>
                        {!cities.length && (
                            <p>No results found</p>
                        )}
                        {cities.map((city) => (
                            <button className='block w-full text-start' onMouseDown={(e) => {
                                e.preventDefault();
                                onLocationSelected(city)
                                setLocationSearchInput("")
                            }} key={city}>
                                {city}
                            </button>
                        ))}
                    </div>
                )
            }
        </div>
    )
})