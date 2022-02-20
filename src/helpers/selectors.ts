import { RootState } from '../store/store'

export const selectColumnsOrder = (state: RootState) => {
  const userData = state.firestore.data.userData
  const columnsOrder = userData ? userData.columnsOrder : []
  return columnsOrder
}
