import { defineStore } from "pinia";

const startDate = new Date()
const endDate = new Date()
endDate.setDate(startDate.getDate() + 1)

const useMainStore = defineStore("main", {
  state: () => ({
    token: "",
    isLoading: false,
    startDate: startDate,
    endDate: endDate
  }),
})

export default useMainStore

