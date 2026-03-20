import { useEffect } from "react";

const DEFAULT_TITLE = "aver";

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${DEFAULT_TITLE} | ${title}` : DEFAULT_TITLE;

    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};
