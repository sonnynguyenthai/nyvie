import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { fetchMovies } from '@/services/api'
import SearchBar from '@/components/SearchBar'
import MovieCard from '@/components/MovieCard'
import { router } from 'expo-router'
import { icons } from '@/constants/icons'
import useDebounce from '@/hooks/useDebounce'
import { updateSearchCount } from '@/services/appwrite'
const Search = () => {
    const [searchParams, setSearchParams] = useState<string>("");
    const debounceValue = useDebounce(searchParams.trim(), 300);
    const { data: movies, loading: moviesLoading, error: moviesError, refetch: refetchMovies, reset } = useFetch(() => fetchMovies({ query: debounceValue || "" }), false)
    const handleSearch = (e: any) => {
        setSearchParams(e);
    }
    useEffect(() => {

        if (debounceValue === "") {
            reset()
            return
        }
        refetchMovies();
    }, [debounceValue])

    useEffect(() => {
        if (movies && movies?.length > 0) {
            updateSearchCount(debounceValue || "", movies[0]);
        }
    }, [movies])
    return (
        <View className="flex-1 bg-primary"
        >
            <Image source={images.bg} className="absolute w-full z-0"></Image>
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <MovieCard {...item} />
                )}
                keyExtractor={(item) => item?.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                className="px-5"
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className='mt-10 px-5'>
                            <Text className='text-center text-gray-500'>{searchParams.trim() ? 'Movies not found' : 'Search for a movie'}</Text>
                        </View>
                    ) : null

                }
                ListHeaderComponent={
                    <>
                        <View className='w-full flex-row justify-center mt-20'>
                            <Image source={icons.logo} className="w-12 h-10 mb-5 mx-auto"></Image>
                        </View>
                        <View className='my-5'>
                            <SearchBar
                                searchParams={searchParams}
                                onPress={() => { }}
                                onChange={handleSearch}
                                placeholder="Search movie..."
                            />
                        </View>

                        {
                            moviesLoading && (
                                <ActivityIndicator className='my-3' size="large" color="#0000ff" />
                            )
                        }

                        {
                            moviesError && (
                                <Text className='text-red-500 px-5 my-3'>Error: {moviesError?.message}</Text>
                            )
                        }

                        {
                            !moviesLoading && !moviesError && movies && searchParams !== "" && movies?.length > 0 && (
                                <Text className='text-xl text-white font-bold'>Search Results for {' '}
                                    <Text className='text-accent'>{searchParams}</Text>
                                </Text>

                            )
                        }
                    </>
                }
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})