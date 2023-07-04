import { create } from 'zustand'

export type SelectedNode = {
  id: number
  title: string
  choiceText?: string
}

export type StoreSelectedNodesState = {
  selectedNodes: SelectedNode[]
  setSelectedNodes: (nodes: SelectedNode[]) => void
  addSelectedNode: (node: SelectedNode) => void
  removeSelectedNode: (id: number) => void
  updateChoiceTextForNodeId: (id: number, choiceText: string) => void
  resetSelectedNodes: () => void
}

export const useStoreSelectedNodesWithChoiceText =
  create<StoreSelectedNodesState>((set) => ({
    selectedNodes: [],
    setSelectedNodes: (nodes) => set({ selectedNodes: nodes }),
    addSelectedNode: (node) =>
      set((state) => ({
        ...state,
        selectedNodes: [...state.selectedNodes, node],
      })),
    updateChoiceTextForNodeId: (id, choiceText) =>
      set((state) => ({
        ...state,
        selectedNodes: state.selectedNodes.map((node) =>
          node.id === id ? { ...node, choiceText } : node,
        ),
      })),
    removeSelectedNode: (id) =>
      set((state) => ({
        ...state,
        selectedNodes: state.selectedNodes.filter((node) => node.id !== id),
      })),
    resetSelectedNodes: () => set({ selectedNodes: [] }),
  }))
