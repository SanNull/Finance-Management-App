import { IJournalEntry } from "@/backend/interfaces/IJournalEntry";
import { useDatabaseOperations } from "@/backend/useDatabaseOperations";
import { useEffect, useState } from "react";
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

  const [list, setList] = useState<IJournalEntry[]>([]);

  const updateList = async () => {
    try {
      const newList = await databaseOperations.gatherEntries();
      setList(newList);
      list.forEach((element) => {
        console.log(element.key);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateList();
  }, [bttnPressed]);

  const addEntry = () => {
    setBttn(true);
  };

  const conffirmEntry = async () => {
    let input: Omit<IJournalEntry, "key"> = {
      value: Number(value),
      description: description,
      isIncome: isIncome,
    };
    await databaseOperations.insertEntry(input);
    setBttn(false);
  };

  const toggleIncome = () => {
    setIsIncome(!isIncome);
  };

  const getItem = (_data: unknown, index: number): IJournalEntry => list[index];

  const databaseOperations = useDatabaseOperations();

  return (
    <View style={styles.container}>
      <VirtualizedList
        renderItem={({ item }: { item: IJournalEntry }) => (
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
        <Button
          title="Remover Tabela"
          onPress={() => {
            databaseOperations.deleteEntryDatabase();
          }}
        ></Button>
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
