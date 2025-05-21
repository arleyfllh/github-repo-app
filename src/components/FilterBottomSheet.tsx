import React from "react";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    onSelect: (order: "asc" | "desc") => void;
    currentOrder: "asc" | "desc";
};

const FilterBottomSheet: React.FC<Props> = ({
    isVisible,
    onClose,
    onSelect,
    currentOrder,
}) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Urutkan Berdasarkan Bintang</Text>
                {["asc", "desc"].map((order) => (
                    <TouchableOpacity
                        key={order}
                        onPress={() => {
                            onSelect(order as "asc" | "desc");
                            onClose();
                        }}
                        style={[
                            styles.option,
                            currentOrder === order && styles.selected,
                        ]}
                    >
                        <Text style={styles.optionText}>
                            {order === "asc"
                                ? "Terkecil ke Terbesar"
                                : "Terbesar ke Terkecil"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    container: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    optionText: {
        fontSize: 15,
    },
    selected: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 12,
    },
});

export default FilterBottomSheet;
