import { useJournalEntry } from "@/model/useJournalEntry";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button, Modal, TextInput } from "react-native";

export function JournalForm({
  formVisible,
  isIncome,
  onConfirm,
}: {
  formVisible: boolean;
  isIncome: boolean;
  onConfirm: any;
}) {
  const journalEntryHook = useJournalEntry();
  const [date, setDate] = useState<Date>(new Date());
  const [dateVisible, setDateVisble] = useState(false);

  useEffect(() => {
    journalEntryHook.setDate(format(date, "dd/MM/yyyy"));
  }, [date]);

  return (
    <Modal visible={formVisible}>
      <Button
        title={date.toDateString()}
        onPress={() => setDateVisble(true)}
      ></Button>
      {dateVisible && (
        <DateTimePicker
          mode="date"
          value={date}
          onValueChange={(event, selectedDate) => {
            setDate(selectedDate);

            setDateVisble(false);
          }}
          onDismiss={() => setDateVisble(false)}
        />
      )}
      <TextInput
        onChangeText={journalEntryHook.setValue}
        value={journalEntryHook.journalEntry.value}
        keyboardType="numeric"
        placeholder="1000"
      ></TextInput>
      <TextInput
        onChangeText={journalEntryHook.setDescription}
        value={journalEntryHook.journalEntry.description}
        placeholder="Compras no mercado"
      ></TextInput>
      <Button title="Tags"></Button>
      <Button title="Carteira"></Button>
      <Button
        title="Confirmar"
        onPress={() => {
          journalEntryHook.setAccount("Conta Corrente");
          journalEntryHook.setIsIncome(isIncome);
          journalEntryHook.clearFields();
          onConfirm(journalEntryHook.journalEntry);
        }}
      />
    </Modal>
  );
}
