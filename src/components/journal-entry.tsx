import { JournalEntryItem } from "@/interfaces/journal-entry-item";
import { useState } from "react";
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View,
    VirtualizedList,
} from "react-native";

export function JournalEntry() {
  const [bttnPressed, setBttn] = useState(false);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isIncome, setIsIncome] = useState(false);

  const [list, setList] = useState<Array<JournalEntryItem>>([]);

  const addEntry = () => {
    setBttn(true);
  };

  const conffirmEntry = () => {
    let input: JournalEntryItem = {
      key: list.length + 1,
      value: Number(value),
      description: description,
      isIncome: isIncome,
    };
    setList([...list, input]);
    setBttn(false);
  };

  const toggleIncome = () => {
    setIsIncome(!isIncome);
  };

  const getItem = (_data: unknown, index: number): JournalEntryItem =>
    list[index];

  return (
    <View style={styles.container}>
      <VirtualizedList
        renderItem={({ item }: { item: JournalEntryItem }) => (
          <Text>
            {item.description}
            {item.isIncome ? " Entrada " : " Saída "} {item.value}
          </Text>
        )}
        keyExtractor={(item) => String(item.key)}
        getItemCount={() => list.length}
        getItem={getItem}
      ></VirtualizedList>
      {bttnPressed ? (
        <View style={styles.entry}>
          <TextInput
            onChangeText={setValue}
            value={value}
            keyboardType="numeric"
            placeholder="1000"
          ></TextInput>
          <TextInput
            onChangeText={setDescription}
            value={description}
            placeholder="Compras no mercado"
          ></TextInput>
          <Button
            title={isIncome ? "Entrada" : "Saída"}
            onPress={toggleIncome}
          ></Button>
          <View style={styles.button}>
            <Button title="Adicionar" onPress={conffirmEntry}></Button>
          </View>
        </View>
      ) : (
        <View />
      )}
      <View style={styles.button}>
        <Button title="Adicionar Entrada" onPress={addEntry}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
  },
  button: {
    left: "25%",
    right: "50%",
    width: "50%",
    margin: 3,
  },
  entry: {
    height: Dimensions.get("window").height / 2,
  },
});
