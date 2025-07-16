import { Collection } from "typescript"
import { TopicType } from "./topic.types"

export type CategoryType = {
    id: number,
    nameCategory: string,
    topics: Collection<TopicType>
}
