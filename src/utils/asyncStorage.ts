import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type StoreKeys = "EMAIL" | "IS_EMAIL_SAVED";

export async function storeData({
  key,
  data,
}: {
  key: StoreKeys;
  data: string;
}) {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    Alert.alert("오류가 발생했습니다.", "저장하는데 실패했습니다.", [
      {
        text: "확인",
      },
    ]);
  }
}

export async function retrieveData(key: StoreKeys) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data !== null ? data : null;
  } catch (error) {
    Alert.alert("오류가 발생했습니다.", "저장하는데 실패했습니다.", [
      {
        text: "확인",
      },
    ]);
    return null;
  }
}
