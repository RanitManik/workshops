import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Dimensions,
} from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { intervalToDuration, isBefore } from "date-fns";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import { TimeSegment } from "../../components/TimeSegmant";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";

const frequency = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const countdownStorageKey = "taskly-countdown";

export type PersistedCountdownState = {
    currentNotificationId: string | undefined;
    completedAtTimestamps: number[];
};

type CountdownStatus = {
    isOverdue: boolean;
    distance: ReturnType<typeof intervalToDuration>;
};

export default function CounterScreen() {
    const confettiRef = useRef<any>();
    const [loading, setLoading] = useState(true);
    const [countdownState, setCountdownState] =
        useState<PersistedCountdownState>();
    const [status, setStatus] = useState<CountdownStatus>({
        isOverdue: false,
        distance: {},
    });

    useEffect(() => {
        const init = async () => {
            const value = await getFromStorage(countdownStorageKey);
            setCountdownState(value);
        };
        init();
    }, []);

    const lastCompletedTimestamp = countdownState?.completedAtTimestamps?.[0];

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timestamp = lastCompletedTimestamp
                ? lastCompletedTimestamp + frequency
                : Date.now();
            if (lastCompletedTimestamp) {
                setLoading(false);
            }
            const isOverdue = isBefore(timestamp, Date.now());

            const distance = intervalToDuration(
                isOverdue
                    ? { end: Date.now(), start: timestamp }
                    : { start: Date.now(), end: timestamp },
            );

            setStatus({ isOverdue, distance });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [lastCompletedTimestamp]);

    const scheduleNotification = async () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        confettiRef?.current?.start();
        let pushNotificationId;
        const result = await registerForPushNotificationsAsync();
        if (result === "granted") {
            pushNotificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Time to code!",
                },
                trigger: {
                    seconds: frequency / 1000,
                },
            });
        } else {
            Alert.alert(
                "Unable to schedule notification",
                "Please enable notifications permission for Expo Go in settings",
            );
        }

        if (countdownState?.currentNotificationId) {
            await Notifications.cancelScheduledNotificationAsync(
                countdownState.currentNotificationId,
            );
        }

        const newCountdownState: PersistedCountdownState = {
            currentNotificationId: pushNotificationId,
            completedAtTimestamps: countdownState?.completedAtTimestamps
                ? [Date.now(), ...countdownState.completedAtTimestamps]
                : [Date.now()],
        };

        setCountdownState(newCountdownState);

        await saveToStorage(countdownStorageKey, newCountdownState);
    };

    if (loading) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size={60} color={theme.colorCerulean} />
            </View>
        );
    }

    return (
        <View
            style={[
                styles.container,
                status.isOverdue ? styles.containerLate : undefined,
            ]}
        >
            {!status.isOverdue ? (
                <Text style={[styles.heading]}>Time left to code:</Text>
            ) : (
                <Text style={[styles.heading, styles.whiteText]}>
                    Coding time overdue by:
                </Text>
            )}
            <View style={styles.row}>
                <TimeSegment
                    unit="Days"
                    number={status.distance?.days ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Hours"
                    number={status.distance?.hours ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Minutes"
                    number={status.distance?.minutes ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
                <TimeSegment
                    unit="Seconds"
                    number={status.distance?.seconds ?? 0}
                    textStyle={status.isOverdue ? styles.whiteText : undefined}
                />
            </View>
            <TouchableOpacity
                onPress={scheduleNotification}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>
                    Completed 1 hour of coding!
                </Text>
            </TouchableOpacity>
            <ConfettiCannon
                ref={confettiRef}
                count={50}
                origin={{ x: Dimensions.get("window").width / 2, y: -30 }}
                autoStart={false}
                fadeOut={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colorWhite,
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colorWhite,
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 12,
        borderRadius: 6,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    row: {
        flexDirection: "row",
        marginBottom: 24,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: theme.colorBlack,
    },
    containerLate: {
        backgroundColor: theme.colorRed,
    },
    whiteText: {
        color: theme.colorWhite,
    },
});
