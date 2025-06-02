// ✅ fileUploadManagerStore.ts (Array 기반 FileItem 구조)
import { createStore } from 'zustand/vanilla';

export type FileType = 'image' | 'video';

export interface FilePreview {
  name: string;
  url: string;
  type: FileType;
  size?: number;
}

export interface FileItem {
  file?: File; // Optional to support existing files without File instance
  uuid?: string;
  preview?: FilePreview;
}

export interface FileUploadState {
  items: FileItem[];
}

export interface FileUploadActions {
  addFiles: (key: string, files: File[]) => void;
  addServerFiles: (key: string, items: Partial<FileItem>[]) => void;
  updateFile: (key: string, index: number, patch: Partial<FileItem>) => void;
  reorderFiles: (key: string, fromIndex: number, toIndex: number) => void;
  removeFile: (key: string, index: number) => void;
  reset: (key: string) => void;
}

export type FileUploadManagerStore = {
  uploaderMap: Record<string, FileUploadState>;
} & FileUploadActions;

const getDefaultUploaderState = (): FileUploadState => ({
  items: [],
});

export const createFileUploadManagerStore = () => {
  return createStore<FileUploadManagerStore>((set) => ({
    uploaderMap: {},

    addFiles: (key, files) =>
      set((state) => {
        const existing = state.uploaderMap[key] ?? getDefaultUploaderState();
        const newItems = files.map((file) => ({ file }));
        return {
          uploaderMap: {
            ...state.uploaderMap,
            [key]: {
              ...existing,
              items: [...existing.items, ...newItems],
            },
          },
        };
      }),

    // 서버에서 받은 파일 데이터, file 객체는 없이, preview와 uuid만 존재
    addServerFiles: (key, items) =>
      set((state) => {
        const existing = state.uploaderMap[key] ?? getDefaultUploaderState();
        return {
          uploaderMap: {
            ...state.uploaderMap,
            [key]: {
              ...existing,
              // items: [...existing.items, ...items],
              items: [...items],
            },
          },
        };
      }),

    updateFile: (key, index, patch) =>
      set((state) => {
        const existing = state.uploaderMap[key];
        if (!existing || !existing.items[index]) return state;
        const newItems = [...existing.items];
        newItems[index] = {
          ...newItems[index],
          ...patch,
        };
        return {
          uploaderMap: {
            ...state.uploaderMap,
            [key]: {
              ...existing,
              items: newItems,
            },
          },
        };
      }),

    removeFile: (key, index) =>
      set((state) => {
        const existing = state.uploaderMap[key];
        if (!existing) return state;
        const newItems = existing.items.filter((_, i) => i !== index);
        return {
          uploaderMap: {
            ...state.uploaderMap,
            [key]: {
              ...existing,
              items: newItems,
            },
          },
        };
      }),

    reorderFiles: (key, fromIndex, toIndex) =>
      set((state) => {
        const existing = state.uploaderMap[key];
        if (!existing) return state;

        const items = [...existing.items];
        const [movedItem] = items.splice(fromIndex, 1); // 원소 추출
        items.splice(toIndex, 0, movedItem); // 새 위치에 삽입

        return {
          uploaderMap: {
            ...state.uploaderMap,
            [key]: {
              ...existing,
              items,
            },
          },
        };
      }),

    reset: (key) =>
      set((state) => ({
        uploaderMap: {
          ...state.uploaderMap,
          [key]: getDefaultUploaderState(),
        },
      })),
  }));
};

export const sharedFileUploadManagerStore = createFileUploadManagerStore();
