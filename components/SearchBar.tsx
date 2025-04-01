import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string
    onPress: () => void
    onChange?: (e: any) => void
    searchParams?: string
}
const SearchBar = ({ placeholder, searchParams, onPress, onChange }: Props) => {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
            <TextInput placeholder={placeholder} value={searchParams} onChangeText={(e) => onChange?.(e)} placeholderTextColor="#a8b5db" className='flex-1 ml-2 text-white'></TextInput>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})