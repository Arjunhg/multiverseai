import { genContent } from "@/lib/actions"

const Test = async() => {

    const result = await genContent("react vs nextjs");

  return (
    <div>
      {
        result.content
      }
    </div>
  )
}

export default Test
