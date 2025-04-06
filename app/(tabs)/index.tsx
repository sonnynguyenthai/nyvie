import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View, Image } from "react-native";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));
  const { data: trendingMovies, loading: trendingMoviesLoading, error: trendingMoviesError } = useFetch(() => getTrendingMovies());

  const renderTrendingMovies = () => (
    trendingMovies && (
      <>
        <View className="mt-10">
          <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
        </View>
        <FlatList
          data={trendingMovies}
          renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
          keyExtractor={(item) => item?.movie_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4"></View>}
          nestedScrollEnabled={true} // ✅ Fix
        />
      </>
    )
  );
  console.log(1);


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      {moviesLoading || trendingMoviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      ) : moviesError || trendingMoviesError ? (
        <Text>Error: {moviesError?.message || trendingMoviesError?.message}</Text>
      ) : (
        <FlatList
          data={movies} // Use movies as the main list
          keyExtractor={(item) => item?.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          ListHeaderComponent={
            <>
              <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
              <SearchBar onPress={() => router.push("/search")} placeholder="Search for movie" />
              {renderTrendingMovies()}
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            </>
          }
          renderItem={({ item }) => <MovieCard {...item} />}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}