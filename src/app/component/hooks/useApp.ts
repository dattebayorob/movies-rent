import { useContext } from "react"
import { ApplicationContext } from "../../config/context"

export const useApp = () => {
  const app = useContext(ApplicationContext);
  return app;
}