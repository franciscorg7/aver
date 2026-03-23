import { useEffect } from 'react'

const DEFAULT_TITLE = 'aver'

/**
 * Sets the document title to the given title, prefixed by the default title.
 *
 * @param title - the current index document title.
 */
export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${DEFAULT_TITLE} | ${title}` : DEFAULT_TITLE

    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
