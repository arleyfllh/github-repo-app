import { useAppDispatch, useAppSelector } from "../redux/hooks";
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import debounce from "lodash/debounce";
import { fetchRepos, setQuery, setSortOrder } from "../redux/repo/actions";

import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { RepoItem } from "../redux/repo/types";
import { JSX } from "react/jsx-runtime";
import FilterBottomSheet from "../components/FilterBottomSheet";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useAppDispatch();
    const { data, loading, error, page, hasMore, query, sortOrder } =
        useAppSelector((state) => state.repo);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isFilterVisible, setFilterVisible] = useState(false);

    const fetchSuggestions = useCallback(
        debounce((text: string) => {
            if (text.trim().length === 0) {
                setSuggestions([]);
                return;
            }

            const matched = data
                .filter((repo) =>
                    repo.name.toLowerCase().includes(text.toLowerCase())
                )
                .map((repo) => repo.name)
                .slice(0, 5);
            setSuggestions(matched);
        }, 2000),
        [data]
    );

    const onSearchChange = (text: string) => {
        dispatch(setQuery(text));
        fetchSuggestions(text);
    };

    useEffect(() => {
        dispatch(fetchRepos(1));
    }, [dispatch, query, sortOrder]);

    const loadMore = () => {
        if (!loading && hasMore) {
            dispatch(fetchRepos(page));
        }
    };

    const renderItem = ({ item }: { item: RepoItem }): JSX.Element => (
        <View style={styles.repoItem}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("UserProfile", {
                        username: item.owner.login,
                    })
                }
            >
                <Text style={styles.repoName}>{item.full_name}</Text>
                <Text style={styles.owner}>Owner: {item.owner.login}</Text>
            </TouchableOpacity>
            <Text>{item.description}</Text>
        </View>
    );

    const handleSortChange = (order: "asc" | "desc") => {
        dispatch(setSortOrder(order));
        dispatch(fetchRepos(1));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("SelfProfile")}
                >
                    <Text
                        style={{
                            marginRight: 15,
                            padding: 10,
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                            borderRadius: 5,
                            backgroundColor: "black",
                        }}
                    >
                        My Profile
                    </Text>
                </TouchableOpacity>
            ),
        });
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search repos..."
                value={query}
                onChangeText={onSearchChange}
            ></TextInput>

            {suggestions.length > 0 && (
                <View style={styles.suggestions}>
                    {suggestions.map((sug) => (
                        <TouchableOpacity
                            key={sug}
                            onPress={() => {
                                dispatch(setQuery(sug));
                                setSuggestions([]);
                            }}
                        >
                            <Text style={styles.suggestionsItem}>{sug}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {loading && page === 1 ? (
                <ActivityIndicator size="large" />
            ) : data.length === 0 ? (
                <Text style={styles.noData}>No Data Found.</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? <ActivityIndicator /> : null}
                ></FlatList>
            )}

            <TouchableOpacity
                onPress={() => setFilterVisible(true)}
                style={{
                    marginVertical: 10,
                    padding: 10,
                    borderRadius: 10,
                    alignSelf: "center",
                    backgroundColor: "black",
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    Filter / Urutkan
                </Text>
            </TouchableOpacity>

            <FilterBottomSheet
                isVisible={isFilterVisible}
                onClose={() => setFilterVisible(false)}
                onSelect={handleSortChange}
                currentOrder={sortOrder}
            />

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 50,
        backgroundColor: "#fff",
    },
    searchInput: {
        height: 40,
        borderColor: "#aaa",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    suggestions: {
        backgroundColor: "#eee",
        borderRadius: 5,
        marginTop: 5,
        maxHeight: 120,
    },
    suggestionsItem: {
        padding: 10,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    repoItem: {
        padding: 15,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    repoName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    owner: {
        fontStyle: "italic",
        color: "#555",
    },
    noData: {
        marginTop: 20,
        textAlign: "center",
        fontStyle: "italic",
        fontSize: 16,
    },
    error: {
        color: "red",
        fontStyle: "italic",
        marginTop: 10,
    },
});

export default HomeScreen;
