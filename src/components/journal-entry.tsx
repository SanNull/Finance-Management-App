import { useDatabaseOperations } from "@/data/useDatabaseOperations";
import { IJournalEntry } from "@/model/interfaces/IJournalEntry";
import { useJournalEntryOpertations } from "@/model/useJournalEntryOperations";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import { JournalForm } from "./journal-form";

export function JournalEntry() {
  const [bttnPressed, setButton] = useState(false);
  const [isIncome, setIncome] = useState(false);
  const [list, setList] = useState<IJournalEntry[]>([]);
  const journalEntryOperations = useJournalEntryOpertations();

  const DEBUGDB = useDatabaseOperations();

  const onConfirm = (entry: Omit<IJournalEntry, "key">) => {
    setButton(false);
    journalEntryOperations.addEntry(entry);
  };

  useEffect(() => {
    getEntries();
  }, [bttnPressed]);

  const getEntries = async () => {
    setList(await journalEntryOperations.getEntryList());
  };

  const getItem = (_data: unknown, index: number): IJournalEntry => list[index];

  return (
    <View style={styles.container}>
      <VirtualizedList
        style={styles.entryList}
        renderItem={({ item }: { item: IJournalEntry }) => (
          <Text>
            {item.date} {item.value} {item.description}{" "}
            {item.isIncome ? " Entrada " : " Saída "}
            {item.account}
            {item.tags}
          </Text>
        )}
        keyExtractor={(item) => String(item.key)}
        getItemCount={() => list.length}
        getItem={getItem}
      ></VirtualizedList>
      <JournalForm
        formVisible={bttnPressed}
        isIncome={isIncome}
        onConfirm={onConfirm}
      />
      <View style={styles.button}>
        <Button
          title="Adicionar Entrada"
          onPress={() => setButton(true)}
        ></Button>
        <Button
          title="Remover Tabela"
          onPress={() => {
            DEBUGDB.deleteEntryDatabase();
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
  entryList: {
    width: "100%",
    //paddingHorizontal: "25%",
    borderRadius: 5,
    paddingVertical: "25%",
  },
});
