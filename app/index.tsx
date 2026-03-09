import { Redirect } from "expo-router"

const index = () => {
  return (
    <Redirect href="/(root)/(sides)/home" />
  )
}

export default index