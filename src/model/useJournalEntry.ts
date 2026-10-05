import { useState } from "react";
import { IJournalEntry } from "./interfaces/IJournalEntry";

export function useJournalEntry() {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [account, setAccount] = useState("");
  const [isIncome, setIsIncome] = useState(false);

  const journalEntry: Omit<IJournalEntry, "key"> = {
    date: date,
    description: description,
    value: value,
    tags: tags,
    isIncome: isIncome,
    account: account,
  };

  function clearFields() {
    setDate("");
    setDescription("");
    setValue("");
    setTags([]);
    setAccount("");
    setIsIncome(false);
  }

  return {
    journalEntry,
    setDate,
    setDescription,
    setValue,
    setTags,
    setAccount,
    setIsIncome,
    clearFields,
  };
}
