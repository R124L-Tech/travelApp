import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Animated } from 'react-native'
import { TextButton } from '../components'
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../constants'

const COUNTRIES_ITEM_SIZE = SIZES.width / 3
const PLACES_ITEM_SIZE = SIZES.width / 1.2
const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2

const Dashboard = ({ navigation }) => {
    const countryScrollX = useRef(new Animated.Value(0)).current
    const placesScrollX = useRef(new Animated.Value(0)).current

    const [countries, setCountries] = useState([{ id: -1 }, ...dummyData.countries, { id: -2 }])
    const [places, setPlaces] = useState([{ id: -1 }, ...dummyData.countries[0].places, { id: -2 }])
    const [placesScrollPosition, setPlacesScrollPosition] = useState(0)

    function renderHeader() {
        return (
            <View
                style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    alignItems: 'center'
                }}
            >
                {/* SIDE DRAWER */}
                <TouchableOpacity
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.side_drawer}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>

                {/* TITLE */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>ASIA</Text>
                </View>

                {/* PROFILE */}
                <TouchableOpacity>
                    <Image
                        source={images.profile_pic}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderCountries() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={COUNTRIES_ITEM_SIZE}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                data={countries}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: countryScrollX } } }
                ], { useNativeDriver: false })}
                onMomentumScrollEnd={(event) => {
                    // Calculate scroll posotion
                    var position = (event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE).toFixed(0)

                    // Set Place
                    setPlaces([
                        { id: -1 },
                        ...dummyData.countries[position].places,
                        { id: -2 },
                    ])
                }}
                renderItem={({ item, index }) => {
                    const opacity = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [.3, 1, .3],
                        extrapolate: 'clamp'
                    })

                    const mapSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [25, 60, 25],
                        extrapolate: 'clamp'
                    })

                    const fontSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [15, 25, 15],
                        extrapolate: 'clamp'
                    })

                    if (index == 0 || index == countries.length - 1) {
                        return (
                            <View
                                style={{
                                    width: COUNTRIES_ITEM_SIZE
                                }}
                            />
                        )
                    }
                    return (
                        <Animated.View
                            opacity={opacity}
                            style={{
                                height: 130,
                                width: COUNTRIES_ITEM_SIZE,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Animated.Image
                                source={item.image}
                                resizeMode="contain"
                                style={{
                                    width: mapSize,
                                    height: mapSize,
                                    tintColor: COLORS.white
                                }}
                            />
                            <Animated.Text
                                style={{
                                    marginTop: 3,
                                    color: COLORS.white,
                                    ...FONTS.h1,
                                    fontSize: fontSize,
                                }}
                            >
                                {item.name}
                            </Animated.Text>
                        </Animated.View>
                    )

                }}
            />
        )
    }

    function exploreButtonHandler() {
        // Get places current index
        const currentIndex = parseInt(placesScrollPosition, 10) + 1

        // Navigate to the next screen
        navigation.navigate("Place", { selectedPlace: places[currentIndex] })
    }

    function renderPlaces() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={places}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                snapToAlignment="center"
                snapToInterval={PLACES_ITEM_SIZE}
                scrollEventThrottle={16}
                decelerationRate={0}
                bounces={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: placesScrollX } } }
                ], { useNativeDriver: false })}
                onMomentumScrollEnd={(event) => {
                    // Calculate position
                    var position = (event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE).toFixed(0)

                    setPlacesScrollPosition(position)
                }}
                renderItem={({ item, index }) => {
                    const opacity = placesScrollX.interpolate({
                        inputRange: [
                            (index - 2) * PLACES_ITEM_SIZE,
                            (index - 1) * PLACES_ITEM_SIZE,
                            index * PLACES_ITEM_SIZE,
                        ],
                        outputRange: [.3, 1, .3],
                        extrapolate: 'clamp'
                    })

                    const height = placesScrollX.interpolate({
                        inputRange: [
                            (index - 2) * PLACES_ITEM_SIZE,
                            (index - 1) * PLACES_ITEM_SIZE,
                            index * PLACES_ITEM_SIZE,
                        ],
                        outputRange: [
                            SIZES.height / 2.25,
                            SIZES.height / 1.65,
                            SIZES.height / 2.25,
                        ],
                        extrapolate: 'clamp'
                    })

                    if (index == 0 || index == countries.length - 1) {
                        return (
                            <View
                                style={{
                                    width: EMPTY_ITEM_SIZE
                                }}
                            />
                        )
                    }

                    return (
                        <Animated.View
                            opacity={opacity}
                            style={{
                                width: PLACES_ITEM_SIZE,
                                height: height,
                                alignItems: 'center',
                                borderRadius: 20,
                                padding: 10
                            }}
                        >
                            <Image
                                source={item.image}
                                resizeMode="cover"
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 20
                                }}
                            />

                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    marginHorizontal: SIZES.padding,
                                    marginBottom: 50
                                }}
                            >
                                {/* Place name */}
                                <Text
                                    style={{
                                        marginBottom: SIZES.radius,
                                        color: COLORS.white,
                                        ...FONTS.h1
                                    }}
                                >
                                    {item.name}
                                </Text>

                                {/* Place description */}
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: COLORS.white,
                                        ...FONTS.body3
                                    }}
                                >
                                    {item.description}
                                </Text>

                                {/* TextButton */}
                                <TextButton
                                    label="Explore"
                                    customContainerStyle={{
                                        marginTop: 10,
                                        width: 150,
                                    }}
                                    onPress={() => exploreButtonHandler()}
                                />
                            </View>
                        </Animated.View>
                    )
                }}
            />
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            {renderHeader()}

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={{ height: SIZES.height / 1.25 }}>
                    {/* Countries */}
                    {renderCountries()}

                    {/* Places */}
                    {renderPlaces()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboard
