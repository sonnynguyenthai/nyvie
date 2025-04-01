import React from 'react'
import { Link } from 'expo-router'
import { Image, TouchableOpacity, Text, View } from 'react-native'
import { icons } from '@/constants/icons'

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {

    return (
        <Link href={`movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image
                    source={{
                        uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className='w-full h-52 rounded-lg'
                    resizeMode='cover'
                />
                <Text className='text-white' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center'>
                    <Image source={icons.star} className='size-4'></Image>
                    <Text className='text-white text-xs font-bold uppercase'>{Math.round(vote_average / 2)}</Text>
                </View>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-light-300 mt-1 text-xs uppercase'>{release_date.split('-')[0]}</Text>
                    <Text className='text-light-300 mt-1 text-xs uppercase'>MOVIE</Text>
                </View>

            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard