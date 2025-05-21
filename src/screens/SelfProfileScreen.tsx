import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GITHUB_TOKEN } from "@env";

const SelfProfileScreen = () => {
    const [userData, setUserData] = useState<any>(null);
    const [localImage, setLocalImage] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
            },
        })
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));
    }, []);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission Required", "Akses galeri diperlukan untuk upload foto.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
        })

        if (!result.canceled && result.assets.length > 0) setLocalImage(result.assets[0].uri);
    };

    if (!userData) return <Text>Loading...</Text>

    return (
        <ScrollView 
            contentContainerStyle={{ padding: 20 }}>
            <View style={styles.container}>
                <Image 
                    source={{ uri:localImage || userData.avatar_url }}
                    style={styles.avatar}
                />
                {userData && (
                    <>
                        <Text style={styles.name}>{userData.login}</Text>
                        <Text style={styles.data}>Followers: {userData.followers}</Text>
                        <Text style={styles.data}>Following: {userData.following}</Text>
                        <Text style={styles.data}>Public Repos: {userData.public_repos}</Text>
                    </>
                )}

                <Button 
                    title="Upload Local Image" 
                    onPress={pickImage}
                    color="black"
                />
                {localImage && (
                    <Text style={styles.localImage}>
                        Local Path: {localImage}
                    </Text>
                )}
            </View>
        </ScrollView>
    )
};

export default SelfProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center",
        paddingTop: 50,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
    },
    data: {
        marginVertical: 5,
    },
    localImage: {
        marginTop: 10,
        fontSize: 12,
        color: "gray",
        flexWrap: "wrap",
        width: "100%",
        paddingHorizontal: 20,
    }
})