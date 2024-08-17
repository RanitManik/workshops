import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";

type Props = {
    name: string;
    isCompleted?: boolean;
    onDelete: () => void;
    onToggleComplete: () => void;
};

export const ShoppingListItem = ({
    name,
    isCompleted,
    onDelete,
    onToggleComplete,
}: Props) => {
    const handleDelete = () => {
        Alert.alert(
            `are you sure you want to delete ${name}?`,
            "it will be gone for good.",
            [
                {
                    text: "yes",
                    onPress: onDelete,
                    style: "destructive",
                },
                {
                    text: "cancel",
                    style: "cancel",
                },
            ],
        );
    };
    return (
        <Pressable
            onPress={onToggleComplete}
            style={[
                styles.itemContainer,
                isCompleted ? styles.completedContainer : null,
            ]}
        >
            <View style={styles.row}>
                <Entypo
                    name={isCompleted ? "check" : "circle"}
                    size={24}
                    color={isCompleted ? theme.colorGray : theme.colorCerulean}
                />
                <Text
                    numberOfLines={1}
                    style={[
                        styles.itemText,
                        isCompleted ? styles.completedText : null,
                    ]}
                >
                    {name}
                </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
                <AntDesign
                    name="closecircle"
                    size={24}
                    color={isCompleted ? theme.colorGray : theme.colorRed}
                />
            </TouchableOpacity>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderBottomWidth: 1,
        backgroundColor: theme.colorWhite,
        borderBottomColor: theme.colorCerulean,
        paddingHorizontal: 18,
        paddingVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    completedContainer: {
        backgroundColor: theme.colorLightGrey,
        borderBottomColor: theme.colorLightGrey,
    },

    itemText: {
        fontSize: 18,
        fontWeight: "200",
        flex: 1,
    },

    completedText: {
        textDecorationLine: "line-through",
        textDecorationColor: theme.colorGray,
        color: theme.colorGray,
    },

    row: {
        flexDirection: "row",
        gap: 18,
        flex: 1,
        marginRight: 18,
    },
});
