import { useCallback, useState } from "react"

export const useTextContent = (initial) => {
    const [textContent, setTextContent] = useState(initial)
  
  const ref = useCallback(node => {
    if (node !== null) {
      setTextContent(node.textContent);
    }
  }, []);
  
  ref.current = textContent
  return ref
}