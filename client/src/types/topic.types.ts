import { MessageType } from "./message.types"

export type TopicType = {
    id: number,
    categoryId: number,
    // ForeignKey("categoryId")
    title: string,
    listMessages: MessageType
}
