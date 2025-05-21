import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";

type UserProfileRouteProp = RouteProp<RootStackParamList, "UserProfile">;

export default function UserProfileScreen() {
    const route = useRoute<UserProfileRouteProp>();
    const { username } = route.params;

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(
                    `https://api.github.com/users/${username}`
                );
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username]);

    if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
    if (!user || user.message === "Not Found")
        return <Text style={styles.noData}>No Data Found</Text>;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: user.avatar_url }}
                style={styles.avatar}
            ></Image>
            <Text style={styles.username}>{user.login}</Text>
            <Text>Nama: {user.name || "-"}</Text>
            <Text>Followers: {user.followers}</Text>
            <Text>Following: {user.following}</Text>
            <Text>Repos: {user.public_repos}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    },
    noData: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16,
    },
});
